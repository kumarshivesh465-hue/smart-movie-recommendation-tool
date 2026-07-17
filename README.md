# 🎬 Smart Movie Recommendation Tool

A responsive web application that helps users discover movies through title search, actor search, and mood-based natural language search powered by an LLM. Built for the Web Development Challenge.

## Features Implemented

- **Search by Title** — find movies by name using TMDb
- **Search by Actor/Actress** — see a filmography sorted by popularity
- **Mood/Natural Language Search** — describe what you want (e.g. *"I want a feel-good sci-fi movie"*) and Gemini AI interprets it into genre + keyword filters, which are then matched against TMDb
- **Movie Detail View** — poster, rating, genre tags, cast, plot synopsis, release year
- **Similar Movies** — recommendations shown inside the detail view, clickable to explore further
- **Dark / Light Mode** — toggle with persistent theming across the whole app
- **Responsive Design** — works across mobile, tablet, and desktop
- **Loading states & error handling** across all search modes

## Tech Stack

- **Frontend:** React + Vite, Tailwind CSS
- **Backend:** Node/Express (local) — a lightweight proxy for the LLM key; deployed as Vercel Serverless Functions in production
- **Movie Data:** [TMDb API](https://www.themoviedb.org/documentation/api)
- **AI/LLM:** [Gemini API](https://ai.google.dev/) for mood-based natural language interpretation

## Setup Instructions

1. **Clone the repository**
```bash
   git clone https://github.com/your-username/movie-recommender.git
   cd movie-recommender
```

2. **Install dependencies**
```bash
   npm install
```

3. **Environment variables** — create a `.env` file in the root (see `.env.example`):
- Get a TMDb token at [themoviedb.org/settings/api](https://www.themoviedb.org/settings/api) (free, no billing required)
   - Get a Gemini key at [aistudio.google.com/apikey](https://aistudio.google.com/apikey) (free tier)

4. **Run locally** (two terminals):
```bash
   # Terminal 1 — API server (handles mood search)
   node server.js

   # Terminal 2 — frontend dev server
   npm run dev
```
   Open `http://localhost:5173`

## APIs Used

| API | Purpose |
|---|---|
| TMDb (`/search/movie`, `/search/person`, `/movie/{id}`, `/discover/movie`) | Movie search, cast/crew, details, filtered discovery |
| Gemini (`gemini-flash-latest`) | Natural language mood interpretation → structured search parameters |

## Live Deployment

🔗 [https://smart-movie-recommendation-tool.vercel.app/]

## Author

Shivesh Kumar
