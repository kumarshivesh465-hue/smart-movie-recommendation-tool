# 🎬 Smart Movie Recommendation Tool

A responsive web application that helps users discover movies by title, actor, or even by describing the kind of movie they want to watch in natural language. Built for the Web Development Challenge.

## Why I built this

Sometimes you know the type of movie you want to watch, but not its name. I wanted to make searching easier by letting users find movies through simple descriptions like *"I want a feel-good sci-fi movie"* instead of only searching by title.

## What it can do

* **Search by Title** — Find movies by name using TMDb.
* **Search by Actor/Actress** — Browse an actor's filmography sorted by popularity.
* **Mood-Based Search** — Describe the kind of movie you want, and Gemini AI converts it into genres and keywords before searching TMDb.
* **Movie Details** — View posters, ratings, genres, cast, plot, and release year.
* **Similar Movies** — Discover related movies from the detail page.
* **Dark & Light Mode** — Switch themes with your preference saved automatically.
* **Responsive Design** — Works smoothly on mobile, tablet, and desktop.
* **Loading States & Error Handling** — Provides a better user experience across all search modes.

## Tech Stack

* **Frontend:** React + Vite, Tailwind CSS
* **Backend:** Node.js + Express (local), Vercel Serverless Functions (production)
* **Movie Data:** TMDb API
* **AI:** Gemini API for mood-based natural language search

## Challenges

The biggest challenge was building the mood-based search. I used Gemini to understand natural language and convert it into search filters that TMDb could use, while keeping the API key secure through a backend proxy.

## Setup Instructions

1. Clone the repository

```bash
git clone https://github.com/your-username/movie-recommender.git
cd movie-recommender
```

2. Install dependencies

```bash
npm install
```

3. Create a `.env` file using `.env.example` and add your TMDb and Gemini API keys.

4. Run the project

```bash
# Terminal 1
node server.js

# Terminal 2
npm run dev
```

Open **http://localhost:5173**

## APIs Used

| API        | Purpose                                                    |
| ---------- | ---------------------------------------------------------- |
| TMDb API   | Movie search, actor search, movie details, recommendations |
| Gemini API | Converts natural language into searchable movie filters    |

## Live Demo

🔗 https://smart-movie-recommendation-tool.vercel.app/

## Author

**Shivesh Kumar**
