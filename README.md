# EdgeSandbox 
### Code Anywhere. Even Offline.

**EdgeSandbox** is a browser-based coding environment designed to make programming more accessible to students, especially those working with limited connectivity or computing resources.

It provides an integrated workspace to write, execute, save and manage Python projects directly in the browser, with local project persistence and version snapshots.

---

## Problem Statement

Students in areas with unreliable internet connectivity often face difficulties accessing cloud-based coding platforms. Continuous internet dependency can interrupt coding sessions, limit access to development tools and make project work challenging.

##  Our Solution

EdgeSandbox follows a **local-first development approach**, allowing users to write and execute Python code in the browser and save their projects locally.

The goal is to reduce dependency on continuous internet connectivity while providing an accessible and lightweight coding workspace.

## Key Features

- **Browser-Based Code Editor:** Write Python code using the Monaco Editor.
- **Python Code Execution:** Execute Python directly in the browser using Pyodide and WebAssembly.
- **Local Project Storage:** Save and reopen projects using IndexedDB.
- **Project Management:** Create and switch between multiple coding projects.
- **Version Snapshots:** Save previous versions of code and restore them when needed.
- **Progressive Web App Foundation:** Service worker integration for application caching.

## Technology Stack

| Technology | Purpose |
|---|---|
| React.js | Frontend development |
| JavaScript | Application logic |
| Monaco Editor | Code editing interface |
| Pyodide | Browser-based Python execution |
| WebAssembly | Runtime support |
| Web Workers | Background code execution |
| IndexedDB | Local project and snapshot storage |
| Vite | Development and build tooling |
| PWA / Service Worker | Offline application foundation |

## How It Works

1. Open EdgeSandbox in the browser.
2. Create or select a coding project.
3. Write Python code in the editor.
4. Execute code using the Pyodide runtime.
5. View output in the terminal panel.
6. Save projects locally in IndexedDB.
7. Create version snapshots to preserve earlier code.

## Project Structure

```text
Edge-Sandbox/
│
├── public/
│   ├── manifest.webmanifest
│   └── sw.js
│
├── src/
│   ├── App.jsx
│   ├── main.jsx
│   ├── style.css
│   ├── db.js
│   └── python.worker.js
│
├── index.html
├── package.json
└── vite.config.js
```

## Getting Started

### Prerequisites

- Node.js
- npm
- A modern web browser

### Installation

Clone the repository:

```bash
git clone https://github.com/khushi2709/Edge-Sandbox.git
```

Navigate to the project directory:

```bash
cd Edge-Sandbox
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local URL displayed in your terminal, usually:

```text
http://localhost:5173
```

**Note:** The initial Pyodide runtime download requires an internet connection.

## Future Scope

- Complete offline application and runtime caching.
- Automatic synchronization when internet connectivity is restored.
- FastAPI backend integration.
- PostgreSQL cloud storage.
- Conflict detection and resolution during synchronization.
- Enhanced project and file management.
- Integrated offline learning resources.

## Team

**Team TRISHUL**

- Khushi Sharma
- Kunal Vats

J.C. Bose University of Science and Technology, YMCA, Faridabad.

---

*EdgeSandbox – Making coding more accessible, one project at a time.*
