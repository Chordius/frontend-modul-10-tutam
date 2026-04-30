# SBD Store Frontend

React + Vite frontend for the SBD Module 6 project.

## Setup

1. Install dependencies:
	- `npm install`
2. Copy `.env.example` to `.env`.
3. Adjust environment variables as needed.
4. Run development server:
	- `npm run dev`

## Environment Variables

- `VITE_DEV_PORT`: Vite development server port (default in example: `5050`)
- `VITE_API_BASE_URL`: Backend base URL used by API actions (example: `http://localhost:3000` or your deployed API URL)

The frontend reads these values from:

- `src/config/env.js`
