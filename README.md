# 🎬 Smart Movie Recommendation Tool

A modern, AI-powered movie discovery platform that helps users find movies by title, actor, or natural language descriptions. Instead of searching only by exact movie names, users can simply describe what they want to watch (e.g., *"a feel-good sci-fi adventure"*), and the application intelligently recommends matching movies.

Built as part of the **Web Development Challenge**.

---

# ✨ Overview

Finding the perfect movie isn't always easy—sometimes you know the mood you're in but not the movie's title.

This project combines the **TMDb API** with **Google Gemini AI** to create a smarter search experience. Gemini interprets natural language prompts into structured movie genres and keywords, allowing TMDb to return highly relevant recommendations.

The result is a faster, more intuitive way to discover movies.

---

# 🚀 Features

### 🔍 Multiple Search Methods
- Search movies by **title**
- Search movies by **actor or actress**
- Search using **natural language** (AI-powered mood search)

### 🤖 AI-Powered Mood Search
Describe the type of movie you want, for example:

> *"A motivational sports movie based on a true story"*

Gemini AI analyzes the prompt, extracts genres and relevant keywords, and converts it into optimized search parameters before querying TMDb.

---

### 📈 Trending Movies
- View the latest trending movies immediately on the home page
- Updated using TMDb's weekly trending endpoint

---

### ⚡ Live Search
- Instant search results while typing
- Debounced requests to reduce unnecessary API calls
- No need to press Enter

---

### 🎭 Genre Filters
Quickly narrow results using interactive genre chips.

Examples:
- Action
- Comedy
- Thriller
- Horror
- Romance
- Science Fiction

---

### 🎬 Detailed Movie Information

Each movie page displays:

- Poster
- Rating
- Runtime
- Genres
- Release Date
- Overview
- Cast
- Production information

---

### 🎥 Similar Movie Recommendations

After opening a movie, users automatically receive recommendations for similar movies.

---

### ❤️ Favorites

Save favorite movies locally and access them anytime.

Features include:

- Persistent storage
- One-click add/remove
- Automatically restored on future visits

---

### 🕒 Search History

Recent searches are stored locally, allowing users to quickly revisit previous searches.

---

### 🌙 Dark & Light Theme

- Toggle between dark and light mode
- Theme preference is saved automatically

---

### 📱 Fully Responsive Design

Optimized for:

- Desktop
- Laptop
- Tablet
- Mobile devices

---

### 🎨 Better User Experience

Includes several UI improvements such as:

- Skeleton loading cards
- Empty-state illustrations
- Error handling
- Smooth transitions
- Responsive layouts

---

# 🛠 Tech Stack

### Frontend
- React
- Vite
- Tailwind CSS

### Backend
- Node.js
- Express.js (Development)
- Vercel Serverless Functions (Production)

### APIs
- TMDb API
- Google Gemini API

## Screenshots
<img width="1896" height="927" alt="image" src="https://github.com/user-attachments/assets/e7028173-c4cd-45ce-ae77-96c7218abe27" />

<img width="1897" height="928" alt="image" src="https://github.com/user-attachments/assets/b6f17a73-9773-4879-9b0d-b1d3acf9164c" />

<img width="1900" height="923" alt="image" src="https://github.com/user-attachments/assets/6781fe56-b7b3-42f0-b580-6cdd50140a80" />

<img width="1897" height="925" alt="image" src="https://github.com/user-attachments/assets/3a97bf28-6cda-4df2-8694-dfc705c86784" />

<img width="1918" height="932" alt="image" src="https://github.com/user-attachments/assets/279b03af-d563-46e6-992e-c8930365884c" />

---

# 🧠 How AI Search Works

The mood-based recommendation system follows this workflow:

```
User Prompt
      ↓
Gemini AI
      ↓
Extract Genres + Keywords
      ↓
Backend Validation
      ↓
TMDb API Search
      ↓
Relevant Movie Recommendations
```

For example:

```
Input:
"I want a funny action movie with superheroes."

Gemini Output:
Genres:
- Action
- Comedy

Keywords:
- Superhero
- Adventure

TMDb Search
↓

Recommended Movies
```

This allows users to search naturally instead of remembering exact movie titles.

---

# ⚙ Challenges

One of the biggest challenges was implementing the AI-powered mood search.

Natural language is often ambiguous, so the application needed to reliably convert user descriptions into structured movie genres and searchable keywords before querying TMDb.

Another challenge involved managing changes to Google's Gemini models during development:

- `gemini-2.0-flash` eventually hit quota limitations.
- `gemini-2.5-flash` was later deprecated.
- The project was migrated to `gemini-flash-latest`, an auto-updating alias that automatically points to Google's newest supported Flash model, reducing future maintenance.

Security was also an important consideration. API keys are never exposed to the client; all AI requests are routed through a secure backend proxy.

---

# 📦 Installation

### 1. Clone the repository

```bash
git clone https://github.com/kumarshivesh465-hue/smart-movie-recommendation-tool.git

cd smart-movie-recommendation-tool
```

---

### 2. Install dependencies

```bash
npm install
```

---

### 3. Configure Environment Variables

Create a `.env` file using the provided `.env.example`.

Add:

```env
TMDB_API_KEY=your_tmdb_key
GEMINI_API_KEY=your_gemini_key
```

---

### 4. Run the Backend

```bash
node server.js
```

---

### 5. Start the Frontend

```bash
npm run dev
```

---

Open:

```
http://localhost:5173
```

---

# 🌐 APIs Used

| API | Purpose |
|------|---------|
| **TMDb API** | Movie search, actor search, trending movies, recommendations, movie details |
| **Google Gemini API** | Converts natural language into structured movie genres and keywords for intelligent search |

---

# 🚀 Live Demo

**https://smart-movie-recommendation-tool.vercel.app/**

---

# 💡 Future Improvements

- User authentication
- Cloud-synced favorites
- Watchlist support
- Streaming platform availability
- Voice-based movie search
- Advanced recommendation engine using user preferences
- Personalized AI recommendations based on viewing history

---

# 👨‍💻 Author

**Shivesh Kumar**
