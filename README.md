# Andre Dwi Cahyono Portfolio

A static, modular portfolio for a junior full-stack developer. The project stays dependency-free so it can be opened locally or deployed to any static host.

## Structure

```text
index.html              Page shell and semantic content
style.css               Core visual system
styles/app-shell.css    Application-like controls and overlays
src/main.js             Feature entry point
src/data.js             Portfolio and code showcase data
src/navigation.js       Menu, command palette, and scroll spy
src/motion.js           Reveal, progress, and parallax motion
assets/                 CV and profile image
```

## Features

- Responsive portfolio layout for desktop and mobile
- Command palette with `Ctrl/Cmd + K`
- Full-stack code showcase with Frontend, Backend, and Data tabs
- Project filtering by engineering layer
- Scroll reveal, progress indicator, and reduced-motion support
- No build step or external runtime dependencies

## Run locally

Open `index.html` in a browser, or serve the folder with any static server. For example:

```bash
npx serve .
```

The project uses native ES modules, so a local static server is recommended when developing new modules.
