# Form Athletics - Workout Generator

A responsive gym workout generator that creates a focused session from a user's training goal, body area, movement complexity, equipment, and available time.

## Features

- 84 saved workouts plus live recommendations across nine body areas.
- Foundational and technical movement filtering.
- Strength, muscle-building, and athletic training goals.
- Exercise cards with sets, reps, difficulty, and relevant exercise imagery.
- Responsive layout for desktop, tablet, and mobile screens.
- Animated session-ready feedback when a workout is generated.
- Optimized local exercise images with lazy loading and Netlify cache headers.

## Run locally

The frontend has no build step. Use the included Node server so online recommendations can use the same-origin API proxy.

1. Run `npm start`.
2. Open the local URL printed in the terminal.
3. Choose a goal, body area, movement complexity, equipment, and session length.
4. Select **Generate workout** to view matching exercises.

## Project structure

```text
.
|-- index.html                  # Page structure and form controls
|-- style.css                   # Responsive visual design and animations
|-- app.js                      # Workout data, filtering, and rendering logic
|-- assets/
|   |-- exercises-web/          # Optimized exercise images used by the site
|   `-- exercise-sprite-web.jpg # Optimized hero artwork
|-- _headers                    # Netlify browser-cache rules
`-- .netlifyignore              # Excludes unused full-size source assets
```

## Deploy with Netlify

Use the following build settings:

| Setting | Value |
| --- | --- |
| Branch to deploy | `main` |
| Base directory | Leave blank |
| Build command | Leave blank |
| Publish directory | `.` |
| Functions directory | Leave blank |

Netlify deploys the project root directly. The `_headers` file applies long-term caching to assets, while `.netlifyignore` avoids deploying unused full-size image files.

## Exercise imagery

Most exercise references use the public-domain [Free Exercise DB](https://github.com/yuhonas/free-exercise-db). Three unavailable movement variants use locally generated reference images so the displayed equipment and movement match the workout name.
