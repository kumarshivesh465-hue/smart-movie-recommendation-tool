export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  try {
    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `You are a movie search assistant. Given a user's mood or natural language movie request, extract TMDb-compatible search parameters.

User request: "${prompt}"

Respond ONLY with valid JSON (no markdown, no code fences, no explanation) in this exact format:
{
  "genres": ["Genre1", "Genre2"],
  "keywords": ["keyword1", "keyword2"],
  "minRating": 6.0
}

Use TMDb official genre names only from this list: Action, Adventure, Animation, Comedy, Crime, Documentary, Drama, Family, Fantasy, History, Horror, Music, Mystery, Romance, Science Fiction, TV Movie, Thriller, War, Western.
Pick 1-3 genres and 2-4 descriptive keywords that best match the request's mood and theme.`
            }]
          }]
        })
      }
    );

    const geminiData = await geminiResponse.json();
    const rawText = geminiData.candidates?.[0]?.content?.parts?.[0]?.text || '{}';
    const cleanText = rawText.replace(/```json|```/g, '').trim();
    const parsed = JSON.parse(cleanText);

    const genreMap = {
      Action: 28, Adventure: 12, Animation: 16, Comedy: 35, Crime: 80,
      Documentary: 99, Drama: 18, Family: 10751, Fantasy: 14, History: 36,
      Horror: 27, Music: 10402, Mystery: 9648, Romance: 10749,
      'Science Fiction': 878, 'TV Movie': 10770, Thriller: 53, War: 10752, Western: 37
    };

    const genreIds = (parsed.genres || [])
      .map((g) => genreMap[g])
      .filter(Boolean)
      .join(',');

    const tmdbUrl = new URL('https://api.themoviedb.org/3/discover/movie');
    tmdbUrl.searchParams.set('with_genres', genreIds);
    tmdbUrl.searchParams.set('sort_by', 'popularity.desc');
    tmdbUrl.searchParams.set('vote_average.gte', parsed.minRating || 5);
    tmdbUrl.searchParams.set('vote_count.gte', 50);

    const tmdbResponse = await fetch(tmdbUrl, {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.VITE_TMDB_TOKEN}`
      }
    });
    const tmdbData = await tmdbResponse.json();

    return res.status(200).json({
      movies: tmdbData.results || [],
      interpretation: parsed
    });
  } catch (error) {
    console.error('Mood search error:', error);
    return res.status(500).json({ error: 'Failed to process mood search' });
  }
}