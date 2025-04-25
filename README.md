# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# AI Explainer Chrome Extension

This Chrome extension allows you to select text on any webpage and get an AI-powered explanation for the selected text.

## Features

- Select text on any webpage and get an explanation
- Right-click context menu integration
- Customizable backend API URL
- Clean and intuitive user interface

## Installation

1. Clone this repository
2. Install dependencies:
   ```
   npm install
   ```
3. Build the extension:
   ```
   npm run build
   ```
4. Load the extension in Chrome:
   - Open Chrome and go to `chrome://extensions/`
   - Enable "Developer mode" in the top right
   - Click "Load unpacked" and select the `dist` directory

## Usage

1. Select text on any webpage
2. Right-click and select "Explain Selected Text" from the context menu
3. The extension popup will appear with the explanation

## Configuration

You can configure the backend API URL in the extension popup. By default, it points to `https://your-backend-service.com`, but you can change it to your own backend service.

## Development

To start development server:

```
npm run dev
```

To build the extension:

```
npm run build
```

## Backend API

The extension expects a backend API endpoint at `{base_url}/api/explain` that accepts POST requests with the following body:

```json
{
  "text": "selected text"
}
```

The API should return a response in this format:

```json
{
  "success": true,
  "content": {
    "explanation": "explanation of the selected text"
  }
}
```
