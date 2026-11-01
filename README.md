# EdgeSandbox starter (MVP)

A Python-first browser coding workspace demonstrating the first EdgeSandbox milestone:
- React + Monaco code editor
- Pyodide Python execution in a Web Worker
- IndexedDB local project storage
- Manual version snapshots
- Basic PWA manifest and service-worker app-shell caching

## Run locally

1. Install Node.js (LTS).
2. Extract this folder and open a terminal inside it.
3. Run:

   ```bash
   npm install
   npm run dev
   ```

4. Open the local URL printed by Vite (usually http://localhost:5173).

## Important MVP limitations

- The first visit and first Python runtime load require internet. The service worker currently caches the app shell; it does not yet precache the Pyodide runtime and all Monaco assets for a guaranteed first-class offline experience.
- Python runs in a browser Web Worker using Pyodide. This is not arbitrary native-code execution and is not a complete security sandbox. Add execution time/memory limits and a stricter worker lifecycle before production use.
- Projects and snapshots stay in this browser profile. Clearing browser site data can delete them. Add export/backup before relying on this for important work.
- No login, FastAPI backend, PostgreSQL database, cross-device sync, or automatic conflict resolution is included yet.

## Suggested next milestones

1. Cache Pyodide and required app assets for offline reloads after the first online visit.
2. Add project export/import and storage quota handling.
3. Add snapshot diff and restore confirmation.
4. Build FastAPI endpoints and PostgreSQL persistence.
5. Add a queued sync protocol with revision numbers and conflict preservation.
