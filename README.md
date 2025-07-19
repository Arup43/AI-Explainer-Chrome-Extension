# AI Explainer Chrome Extension

A powerful Chrome extension that provides AI-powered explanations for any selected text on web pages. Built with React and Vite, this extension offers customizable explanations in multiple languages and explanation modes.

## 🚀 Features

- **Smart Text Selection**: Right-click on any selected text to get instant AI explanations
- **Multiple Languages**: Support for English and Bengali explanations
- **Customizable Explanation Modes**:
  - **Simple**: Easy-to-understand explanations
  - **Detailed**: Comprehensive explanations with more context
  - **Technical**: Advanced explanations for technical content
- **Adjustable Length**: Control explanation length (100-2000 characters)
- **Theme Support**: Light and dark themes for better user experience
- **Markdown Rendering**: Rich text formatting for explanations
- **Context Menu Integration**: Seamless integration with browser context menus

## 🛠️ Technology Stack

- **Frontend**: React 19, Vite
- **Styling**: CSS with theme support
- **Markdown**: React Markdown with sanitization
- **Chrome APIs**:
  - **Manifest V3**: Modern extension manifest format
  - **Context Menus API**: For right-click context menu integration
  - **Storage API**: For saving user settings and selected text
  - **Active Tab API**: For accessing current tab content
  - **Service Worker**: Background script for extension functionality
- **Build Tool**: Vite for development and production builds

## 📦 Installation

### For Users

1. **Download the Extension**:

   - Clone this repository or download the source code
   - Run `npm install` to install dependencies
   - Run `npm run build` to build the extension
   - The built extension will be in the `dist/` folder

2. **Install in Chrome**:
   - Open Chrome and go to `chrome://extensions/`
   - Enable "Developer mode" in the top right
   - Click "Load unpacked" and select the `dist/` folder
   - The AI Explainer extension will appear in your extensions list

### For Developers

1. **Clone the Repository**:

   ```bash
   git clone <repository-url>
   cd AI-Explainer-Chrome-Extension
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Development Mode**:

   ```bash
   npm run dev
   ```

4. **Build for Production**:
   ```bash
   npm run build
   ```

## 🎯 How to Use

1. **Select Text**: Highlight any text on any webpage
2. **Right-Click**: Right-click on the selected text
3. **Choose "Explain Selected Text"**: Click this option from the context menu
4. **View Explanation**: The extension popup will open with the AI-generated explanation
5. **Customize Settings**: Click the "Settings" link in the popup to customize your experience

## ⚙️ Configuration

Access the settings page to customize your experience:

- **Language**: Choose between English and Bengali
- **Explanation Length**: Set maximum explanation length (100-2000 characters)
- **Explanation Mode**: Select Simple, Detailed, or Technical explanations
- **Theme**: Choose between Light and Dark themes

## 🔧 Development

### Project Structure

```
AI-Explainer-Chrome-Extension/
├── public/                 # Static assets and manifest
│   ├── manifest.json      # Chrome extension manifest
│   └── icons/            # Extension icons
├── src/                   # Source code
│   ├── Popup.jsx         # Main popup component
│   ├── Options.jsx       # Settings page component
│   ├── background.js     # Background service worker
│   ├── services/         # Service layer
│   └── context/          # React context providers
├── package.json          # Dependencies and scripts
└── vite.config.js        # Vite configuration
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_BACKEND_URL=your_backend_api_url
```

## 🔒 Permissions

This extension requires the following permissions:

- **activeTab**: To access the current tab's content
- **contextMenus**: To create right-click context menu items
- **storage**: To save user settings and selected text

## 🐛 Troubleshooting

### Common Issues

1. **Extension not loading**: Make sure you're using Chrome and have Developer mode enabled
2. **Context menu not appearing**: Check that the extension is properly installed and enabled
3. **Explanations not loading**: Verify your backend API is running and accessible

### Support

If you encounter any issues, please:

1. Check the browser console for error messages
2. Verify your backend API configuration
3. Ensure all permissions are granted

## 🔄 Updates

To update the extension:

1. Pull the latest changes from the repository
2. Run `npm install` to update dependencies
3. Run `npm run build` to rebuild the extension
4. Reload the extension in Chrome's extension manager

---

**Note**: This extension requires a backend API service to provide AI explanations. Make sure to configure the `VITE_BACKEND_URL` environment variable with your API endpoint.
