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

A real-time chat interface built with React, TypeScript, Apollo Client, and GraphQL.

## 📸 Demo Screenshot

![Chat UI Demo](./src/assets/screenshot.png)

---

## 🚀 Features

- 🔘 User selection: Joyse, Russell, Sam
- 🗂️ Channel switch between General, Technology, LGTM
- 📨 Send messages with optimistic UI
- 🔁 Retry failed messages
- ⬇️ Pagination via “Read More” (older messages)
- 🧠 Persist message input
- ⚛️ Type-safe with TypeScript
- 🎨 Styled using Tailwind CSS
- 🧩 Apollo Client with GraphQL backend
- 📦 No Redux; state managed via Context API

---

## 🧪 Tech Stack

- React + Vite
- TypeScript
- Apollo Client (GraphQL)
- Tailwind CSS
- Context API
- Git + GitHub

---

## 🔧 How to Run

```bash
# Clone the repo
git clone https://github.com/prem-singh/chat-app-react-graphql.git
cd chat-app-react-graphql

# Install deps
npm install

# Start dev server
npm run dev

