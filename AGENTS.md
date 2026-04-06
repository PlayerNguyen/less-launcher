# AGENTS.md

Agent instructions for the Less Launcher project (a Minecraft Launcher built with Electron + React + Vite).

## Architecture

**Electron + React + Vite** application with a local monorepo of shared packages in `/packages/`.

### Entry Points
- **Main process**: `electron/main.ts` (creates BrowserWindow, sets up IPC handlers)
- **Preload**: `electron/preload.ts` (contextBridge setup)
- **Renderer**: `src/main.tsx` → `src/App.tsx` (React app with MantineProvider + RouterProvider)
- **Router**: `src/router.tsx` uses `createMemoryRouter` (Electron-safe)

### Package Structure
Local packages in `/packages/` (TypeScript project references):
- `config` - Configuration management
- `fs` - File system utilities
- `ipc` - IPC handler registration system
- `profile` - Minecraft profile management
- `runtime` - Java runtime download/setup (Adoptium API)
- `minecraft-version-resolver` - Version manifest parsing & resolution
- `minecraft-manifest-rules` - Manifest rule evaluation
- `minecraft-runner` - Minecraft launch logic
- `theme` - Theme/styling utilities

## Development Commands

```bash
# Start dev server (Vite + Electron)
npm run dev

# Build packages (must run before full build)
npm run build:packages

# Full production build (packages → tsc → vite → electron-builder)
npm run build

# Lint (ESLint with strict import rules)
npm run lint

# Tests (Vitest + Storybook integration)
npm run test

# Storybook
npm run storybook
npm run build-storybook
```

## Critical Rules

### Package Isolation
Packages in `/packages/` **cannot import from `src/` or `electron/`**. ESLint enforces this:
```js
// ❌ Forbidden in packages
import { something } from "src/..."
import { something } from "electron/..."
```
This ensures packages remain pure and reusable. App code (`src/`, `electron/`) can import packages freely.

### Build Order
Always `npm run build:packages` before `npm run build`. Packages must be compiled first as the app depends on their `.d.ts` types.

### Path Aliases
Use these consistently:
- `@src/*` → `./src/*`
- `@electron/*` → `./electron/*`
- `@packages/*` → `./packages/*`
- `@public/*` → `./public/*`

## Testing

- **Framework**: Vitest with Playwright browser provider
- **Storybook**: Component stories in `src/**/*.stories.tsx`
- **Config**: `vite.config.ts` has separate test project for Storybook with headless Chromium

## Styling

- **Mantine v8** + **TailwindCSS v4** + custom themes in `src/themes.css`
- **PostCSS**: `postcss-preset-mantine` + `postcss-simple-vars` for breakpoint variables
- Uses Mantine's dark mode by default

## Electron Configuration

- **Window**: Frameless with custom title bar overlay (`titleBarStyle: "hidden"`)
- **State**: `partition: "persist:main"` for persistent sessions
- **IPC**: Handlers registered in `electron/ipc-handler/`, auto-loaded via `packages/ipc`
- **Menu**: Custom menu with Edit + Debug options

## CI/CD

- **PR Check**: `lint` → `build:packages` → `test --run` → `tsc` → `build`
- **Release**: Triggered on `v*` tags, builds for Windows (NSIS), macOS (DMG), Linux (AppImage)
- **Requires** `GH_TOKEN` env var for electron-builder GitHub publishing

## Common Pitfalls

1. **Import restrictions**: Don't try to import app code into packages - it'll fail ESLint
2. **Memory router**: The app uses `createMemoryRouter`, not browser router (Electron constraint)
3. **Type references**: `packages/` uses composite TypeScript projects; references are in root `tsconfig.json`
4. **Public assets**: In dev, `process.env.VITE_PUBLIC` points to `/public`; in production, to `/dist`

