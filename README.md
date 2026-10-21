# Smart Travel Planner

A full-stack web application that generates personalized city itineraries with AI. Enter a city and what you're in the mood for (e.g. "romantic evening with local food"), and the app uses Google Gemini to suggest real places, geocodes them with OpenStreetMap, and shows the route on an interactive map. Users can save and track their trips and leave reviews.

## Features

- **AI-generated routes** – Google Gemini (`gemini-2.5-flash`) suggests 3 real locations (restaurants, museums, parks, monuments, cafés, promenades) based on your city and preferences.
- **Automatic geocoding** – Each suggested place is resolved to coordinates through the OpenStreetMap Nominatim API.
- **Interactive map** – Routes are displayed with Leaflet / React-Leaflet.
- **User accounts** – Registration and login with input validation (minimum 8 characters, at least one uppercase letter and one digit, valid email).
- **Trip tracking** – Start a trip and mark it as finished (`IN_PROGRESS` / `COMPLETED`), with a completion splash screen.
- **Reviews** – Users can rate (1–5) and comment on their trips.
- **Admin panel** – Admin users can view reviews and reply to them.
- **Account settings** – Update your username or delete your account.

## Tech Stack

| Layer    | Technology                                                       |
|----------|------------------------------------------------------------------|
| Frontend | React 19, Vite, React Router, Tailwind CSS, Leaflet / React-Leaflet |
| Backend  | Node.js, Express 5, Sequelize ORM                                |
| Database | SQLite                                                           |
| AI       | Google Gemini API (`@google/generative-ai`)                      |
| Maps     | OpenStreetMap Nominatim + Leaflet                                |

## Project Structure

```
Smart-Travel-Planner/
├── backend/
│   └── src/
│       ├── app.js              # Express entry point (port 3000)
│       ├── config/             # Sequelize / SQLite configuration
│       ├── models/             # User, Route, UserRoute, Review
│       ├── repositories/       # Data access layer
│       ├── services/           # Business logic (incl. AiService for Gemini)
│       ├── controllers/        # Request handlers
│       └── routes/             # API route definitions
└── frontend/
    └── src/
        ├── App.jsx             # Routing and landing page
        └── components/         # Dashboard, Map, Login, Register, Review,
                                # AdminPanel, SettingsModal, Navbar, ...
```

The backend follows a layered architecture: **routes → controllers → services → repositories → models**.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18 or newer (the backend uses the built-in `fetch`)
- npm
- A [Google Gemini API key](https://aistudio.google.com/apikey)

### 1. Clone the repository

```bash
git clone https://github.com/stefanrosu12/Smart-Travel-Planner.git
cd Smart-Travel-Planner
```

### 2. Set up the backend

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` folder:

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

Start the server:

```bash
npm run dev     # with auto-reload (nodemon)
# or
npm start
```

The API runs on `http://localhost:3000`. The SQLite database file (`database.sqlite`) is created automatically on first start.

### 3. Set up the frontend

In a new terminal:

```bash
cd frontend
npm install
npm run dev
```

Open the URL printed by Vite (usually `http://localhost:5173`).

> The frontend calls the backend at `http://localhost:3000`, so make sure the backend is running first.

## API Overview

| Method | Endpoint                    | Description                      |
|--------|-----------------------------|----------------------------------|
| POST   | `/api/users/register`       | Create a new account             |
| POST   | `/api/users/login`          | Log in                           |
| POST   | `/api/users/logout`         | Log out                          |
| PUT    | `/api/users/update/:id`     | Update username                  |
| DELETE | `/api/users/delete/:id`     | Delete account                   |
| POST   | `/api/routes/create`        | Generate an AI route for a city  |
| GET    | `/api/routes/all`           | List all routes                  |
| POST   | `/api/trips/start`          | Start a trip                     |
| POST   | `/api/trips/finish`         | Finish a trip                    |
| POST   | `/api/reviews/add`          | Add a review                     |
| GET    | `/api/reviews`              | List all reviews                 |

## Frontend Pages

| Path         | Page                                   |
|--------------|----------------------------------------|
| `/`          | Landing page                           |
| `/login`     | Login                                  |
| `/register`  | Registration                           |
| `/dashboard` | Route generator, map and trip tracking |
| `/admin`     | Admin panel (admin role only)          |

## Scripts

**Backend** (`/backend`)

| Command       | Description                     |
|---------------|---------------------------------|
| `npm start`   | Run the server                  |
| `npm run dev` | Run with nodemon (auto-reload)  |

**Frontend** (`/frontend`)

| Command           | Description                  |
|-------------------|------------------------------|
| `npm run dev`     | Start the Vite dev server    |
| `npm run build`   | Build for production         |
| `npm run preview` | Preview the production build |
| `npm run lint`    | Run ESLint                   |

## Known Limitations / Future Improvements

- Passwords are currently stored and compared in plain text; they should be hashed (e.g. with `bcrypt`).
- Authentication is not token-based yet (e.g. JWT), and the admin role is checked on the client side only.
- The backend port and API URL are hard-coded; moving them to environment variables would ease deployment.
- Nominatim's usage policy limits request rates, so route generation includes a 1-second delay between geocoding calls.
