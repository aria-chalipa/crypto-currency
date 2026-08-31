# Crypto Currency

A Vue 3 web app for tracking and managing cryptocurrency data, including authentication (login/signup), a dashboard, and currency views — built with Vite, Pinia, Vue Router, Axios, and Tailwind CSS.

## Tech Stack

- **Vue 3** — core framework
- **Vite** — build tool and dev server
- **Vue Router** — client-side routing
- **Pinia** — state management
- **Axios** — HTTP client for API requests
- **Tailwind CSS** (via `@tailwindcss/vite`) — utility-first styling
- **json-server** — mock REST API for local development
- **Prettier** — code formatting

## Project Structure

```
src/
├── assets/           # Static assets
├── axios/            # Axios instance/config
├── components/       # Reusable Vue components
│   ├── CurrencyCom.vue
│   ├── DashboardCom.vue
│   ├── LoginCom.vue
│   ├── ModalCom.vue
│   ├── SigninCom.vue
│   └── dashboard/    # Dashboard-specific sub-components
├── compositions/      # Composable functions
├── data/
│   └── data.json      # Mock data served via json-server
├── router/            # Vue Router configuration
├── stores/
│   └── user.js         # Pinia store for user state
├── views/             # Page-level views
│   ├── CurrencyView.vue
│   ├── DashboardView.vue
│   ├── HomeView.vue
│   ├── LoginView.vue
│   └── SignupView.vue
├── App.vue
└── main.js
```

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Project Setup

Install dependencies:

```sh
npm install
```

Tailwind CSS is included through the Vite plugin. Add utility classes directly in Vue templates; no additional Tailwind configuration is required.

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Run the Mock API (json-server)

The app's mock data lives in `src/data/data.json` and is served with `json-server`.

```sh
npm run api
```

To run the mock API on port 3001 instead:

```sh
npm run api:3001
```

### Compile and Minify for Production

```sh
npm run build
```

### Preview Production Build

```sh
npm run preview
```

### Format Code

```sh
npm run format
```

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Customize Configuration

See the [Vite Configuration Reference](https://vite.dev/config/).
