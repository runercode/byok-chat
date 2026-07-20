# 💬 BYOK Chat

**Bring Your Own Key** — A private desktop chat app powered by DeepSeek. Use your own API key, chat on your machine, with zero data collection.

[![License: MIT](https://img.shields.io/badge/License-MIT-e94560.svg)](LICENSE)
[![Electron](https://img.shields.io/badge/Electron-31.x-47848f)](https://electronjs.org/)
[![React](https://img.shields.io/badge/React-18.x-61dafb)](https://react.dev/)

---

## ✨ Features

- 🔑 **BYOK** — Use your own DeepSeek API key, pay only for what you use
- 🔒 **Private** — Your key stays in `localStorage`, never sent anywhere but DeepSeek's API
- ⚡ **Streaming** — Real-time token-by-token responses
- 🎨 **Dark UI** — Sleek dark theme with Markdown rendering & syntax-highlighted code blocks
- 💻 **Native Desktop** — Built with Electron for Windows
- 🆓 **Open Source** — MIT licensed

## 🚀 Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) 18+
- [npm](https://www.npmjs.com/)
- A [DeepSeek API key](https://platform.deepseek.com/api_keys)

### Install & Run

```bash
git clone https://github.com/runercode/byok-chat.git
cd byok-chat
npm install
npm run electron:dev
```

### Build Windows Installer

```bash
npm run electron:build
```

The installer will be in `dist-electron/`.

## 📖 Usage

1. Launch the app
2. Paste your DeepSeek API key (starts with `sk-`)
3. Start chatting!

Your key is only stored locally and used directly to call the DeepSeek API from the Electron main process — no middleman, no tracking.

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Desktop Shell | Electron 31 |
| Frontend | React 18 + Vite 5 |
| AI Provider | DeepSeek (deepseek-chat model) |
| Streaming | Fetch API with SSE parsing |
| Security | contextBridge + contextIsolation |

## 📁 Project Structure

```
byok-chat/
├── electron/
│   ├── main.js          # Electron main process + API calls
│   └── preload.js       # Secure IPC bridge
├── src/
│   ├── main.jsx         # React entry
│   ├── App.jsx          # Root component
│   ├── App.css          # Styling
│   └── components/
│       ├── ApiKeySetup.jsx
│       ├── Chat.jsx
│       └── MessageList.jsx
├── index.html
├── vite.config.js
└── package.json
```

## 📄 License

MIT © [runercode](https://github.com/runercode)
