# Sweet Shop - Indian Sweets E-commerce

A modern React-based frontend for an Indian sweets e-commerce website.

## Prerequisites

- Node.js (version 14 or higher)
- npm (comes with Node.js)

## Installation

1. Open a terminal in the project directory
2. Install dependencies:
   ```bash
   npm install
   ```

## Running the Development Server

1. Start the development server:
   ```bash
   npm run dev
   ```

2. The terminal will display a local URL (usually `http://localhost:5173`)
3. Open that URL in your web browser to view the website

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the project for production
- `npm run preview` - Preview the production build locally

## Project Structure

```
sweet-shop/
├── src/
│   ├── components/
│   │   ├── Header.jsx          # Header with logo and navigation
│   │   ├── SearchBar.jsx       # Search bar and filters button
│   │   ├── SweetGrid.jsx       # Grid container for sweet cards
│   │   ├── SweetCard.jsx       # Individual sweet card component
│   │   ├── HelpButton.jsx      # Fixed help button
│   │   └── Footer.jsx          # Footer component
│   ├── App.jsx                 # Main app component
│   ├── App.css                 # App styles
│   ├── main.jsx                # React entry point
│   └── index.css               # Global styles
├── index.html                  # HTML template
├── package.json                # Project dependencies
└── vite.config.js             # Vite configuration
```

## Features

- ✅ Responsive design for mobile and desktop
- ✅ Modern UI matching the Sweet Shop design
- ✅ All interactive functions are stubbed with `// functionality here` comments
- ✅ Ready for backend integration

## Notes

- All button click handlers and interactive functions are currently empty with placeholder comments
- Sweet images use placeholder URLs - replace them in `src/components/SweetGrid.jsx` with your actual images
- The project uses Vite for fast development and building

## Troubleshooting

If you encounter any issues:

1. Make sure Node.js is installed: `node --version`
2. Delete `node_modules` folder and `package-lock.json`, then run `npm install` again
3. Check that port 5173 is not already in use

