# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```


# 💬 React Chat App - AnyMind Group Assignment

A single-page chat application built with **React**, **TypeScript**, **Apollo Client**, and **Tailwind CSS** as part of a technical assignment for AnyMind Group. The app allows users to communicate in real-time across different channels with features like message persistence, retry on error, and message pagination.

---

## 🚀 Live Demo

🌐 [View on GitHub Pages](https://hunny345686.github.io/chat-app-anymind-assignment/)

---

## 📸 Preview

![Chat UI Preview](./preview.png)

---

## 🛠️ Tech Stack

- ⚛️ **React 18** + **TypeScript**
- 🎨 **Tailwind CSS** for UI styling
- 🚀 **Apollo Client** for GraphQL integration
- 📡 **GraphQL** backend from AnyMind
- 🧠 **Context API** for global state
- ⚙️ **Vite** for fast bundling and dev server

---

## ✨ Features

- 🔁 Selectable users (`Joyse`, `Russell`, `Sam`)
- 🧵 Channel-based chat (`General`, `Technology`, `LGTM`)
- 📨 Fetch latest messages from GraphQL API
- 📥 "Read More" to load older messages (pagination)
- 🔁 Retry failed messages (with retry icon)
- 🧠 Message input persists on reload (localStorage)
- 📱 Responsive, mobile-friendly design
- 💡 Clean and extendable code structure

---

## 📦 Installation

```bash
# Clone the repo
git clone https://github.com/hunny345686/chat-app-anymind-assignment.git
cd chat-app-anymind-assignment

# Install deps
npm install

# Start dev server
npm run dev

