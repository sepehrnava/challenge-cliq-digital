# Frontend Weather App Submission

## Overview
This weather application fetches and displays weather information based on the user's city or current location using the AccuWeather API. The app is designed to detect and use the user's location either via geolocation or IP address. It includes a detailed view of the current weather and forecasts up to five days in advance. The daily temperature evolution is also depicted through a custom SVG chart, rendered server-side for performance optimization.

## Implemented Features

### Location Detection
- The application successfully detects the user's location using two methods:
  1. **Geolocation**: When the user clicks the "Get Location" icon and grants access, the weather for their current location is displayed.
  2. **IP Address**: If geolocation is denied, the application uses the IP address to fetch and display weather for the nearest city.

### Weather Display
- Displays current weather conditions, including temperature, a brief description (e.g., sunny, cloudy), and forecasts weather conditions and temperatures for the next five days.

### Daily Evolution Chart
- The application features a Daily Evolution chart that shows temperature changes over the current day. This chart is:
  - Rendered as an SVG.
  - Generated server-side (SSR) to minimize client-side load.

### Technologies Used
- The app was built using the Next.js framework, styled with Tailwind CSS, and includes state management via Zustand.

### API Integration
- Weather data is fetched using the AccuWeather API, with secure management of API keys and other sensitive details.

### Version Control
- Development followed best practices using Git, with commits formatted.

## Demo and Test Reports
- **Live Demo**: [View the live application here](https://challenge-cliq-digital-sepehr.vercel.app/)

## Running the project


### Prerequisites

To run the project, you will need:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/sepehrnava/challenge-cliq-digital
cd challenge-cliq-digital
npm install # yarn install
```

### Starts the app in development mode

```bash
npm run dev # yarn dev
```


### Serves the production build locally

```bash
npm run preview # yarn preview
```

### Start the production server

```bash
npm start # yarn start
```

### Executes the unit using Jest

```bash
npm test # yarn test
```

### Executes the E2E using Playwrite

```bash
npm test:e2e # yarn test:e2e
```
    
    
### Using Storybook
- To run Storybook locally for component development:

    ```bash
    npm run storybook # yarn storybook
    ```
- To build Storybook for static serving:

    ```bash
    npm run storybook:build # yarn storybook:build
    ```
- To serve the built Storybook statically:

    ```bash
    npm run storybook:serve # yarn storybook:serve
    ```
