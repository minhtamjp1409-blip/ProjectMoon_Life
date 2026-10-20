# ProjectMoon_Life

A rich life-simulation roguelike set in the Project Moon universe (The City, Districts, Wings, Fixers, Syndicates, Distortions, and E.G.O).

## Repository Architecture
- **`PM/`**: Frontend application (React 18, Vite, Ant Design, Lucide icons, custom game loop & year planner).
- **`PM_BE/`**: Backend service (.NET 8 Minimal API, high-performance write-behind JSON archive store, Brotli/Gzip compression, Weaver AI engine).

## Getting Started

### 1. Frontend
```bash
cd PM
npm install
npm run dev
```

### 2. Backend
```bash
cd PM_BE
dotnet run
```
Default API port: `http://localhost:5080`.
