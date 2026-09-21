# AGENTS.md

Agent instructions for the **Less Launcher** project — a Minecraft launcher built with **Electron + React + Vite**.

This file tells automated agents (and new developers) how to build, test, and contribute without breaking the project's conventions.

## Setup

```bash
npm install
npx playwright install chromium   # required for Vitest browser tests
npm run dev                       # Vite + Electron with HMR
```

Requires **Node.js 20.x**.

## Commands

```bash
npm run dev              # Start Vite + Electron (dev)
npm run build:packages   # Compile local packages (tsc -b packages) — run BEFORE build
npm run build            # packages → tsc → vite build → electron-builder
npm run lint             # ESLint, --max-warnings 0
npm run test             # Vitest (browser via Playwright/Chromium)
npm run storybook        # Storybook on :6006
npm run build-storybook  # Static Storybook
```

Always run `npm run lint` and `npm run test` after making changes. Before a full build, run it in order: `lint` → `build:packages` → `test` → `tsc` → `build`.

## Architecture

### Entry Points

- **Main process**: `electron/main.ts` — creates the `BrowserWindow`, initializes logging/config, registers IPC handlers, builds the app menu.
- **Preload**: `electron/preload.ts` — exposes `window.ipcRenderer` via `contextBridge`.
- **Renderer**: `src/main.tsx` → `src/App.tsx` — React app wrapped in `MantineProvider` + `RouterProvider`.
- **Router**: `src/router.tsx` uses `createMemoryRouter` (required for Electron, **not** a browser router).

### Local Packages (`packages/`)

TypeScript project references — pure, reusable logic:

- `config` — typed configuration context.
- `fs` — OS-aware paths (`getMinecraftDirectory`, app data, resources).
- `ipc` — `IpcHandler` interface and `IpcHandlerContext` registration.
- `minecraft-manifest-rules` — manifest rule evaluation (`getSystemCriteria`).
- `minecraft-runner` — argument building and spawning the game process.
- `minecraft-version-resolver` — manifest parsing, version resolution, downloads.
- `runtime` — Java runtime download/setup via the Adoptium API.

## Critical Rules

### 1. Package Isolation

Packages in `packages/` **must not** import from `src/` or `electron/` (nor use `../*` escapes). ESLint's `no-restricted-imports` enforces this; app code may import packages freely.

```ts
// ❌ Forbidden inside packages/
import { something } from "@src/...";
import { something } from "@electron/...";
```

### 2. Build Order

Packages compile to `dist-electron-packages/` and the app consumes their `.d.ts` types. **Run `npm run build:packages` before `npm run build` / `npx tsc`.**

### 3. Path Aliases

Use these consistently — do not introduce relative `../../` imports across boundaries:

- `@packages/*` → `./packages/*`
- `@src/*` → `./src/*`
- `@electron/*` → `./electron/*`
- `@components/*` → `./src/components/*` (Vite alias)

### 4. Memory Router

The renderer runs in Electron; keep `createMemoryRouter`. Do not switch to `createBrowserRouter`.

## Conventions

### Commit Messages — Conventional Commits (required)

```text
<type>(<scope>): <imperative summary>
```

Types: `feat`, `fix`, `docs`, `refactor`, `test`, `chore`, `style`, `perf`. Scope is optional but encouraged (e.g. `home`, `runtime`, `ipc`).

```text
feat(runtime): add fallback Java runtime resolution
fix(home): prevent launch when username is empty
docs(agent): add agent instructions
```

- Imperative mood ("add", not "added").
- Subject ≤ ~72 chars.

### Branches

`feat/<desc>`, `fix/<desc>`, `docs/<desc>`, `refactor/<desc>`, `chore/<desc>`.

### Pull Requests

- Target `main`; fill in `.github/PULL_REQUEST_TEMPLATE.md`; reference issues (`Closes #N`).
- Keep one logical change per PR and ensure the **PR Check** workflow passes.

## Testing

- **Unit/integration**: Vitest files next to source (`*.test.ts`, `*.spec.ts`). Run `npm run test`.
- **Component**: Stories in `src/**/*.stories.tsx`, executed as Vitest browser tests via `@storybook/addon-vitest` (headless Chromium).
- Do not assume a test framework other than Vitest. Add tests for new package logic.

## Styling

- **Mantine v8** components + custom themes in `src/themes/`.
- **Tailwind CSS v4** via `@tailwindcss/vite`.
- **PostCSS** uses `postcss-preset-mantine` + `postcss-simple-vars` for breakpoint variables.
- Dark mode is the default scheme.

## CI/CD

- **PR Check** (`.github/workflows/pr-check.yml`): `lint` → `build:packages` → `test --run` → `tsc` → `build`.
- **Release** (`.github/workflows/release.yml`): triggered by `v*` tags or manual dispatch; builds Windows (NSIS), macOS (DMG), Linux (AppImage); publishes to GitHub via `GH_TOKEN`.
- Do not commit secrets. `GH_TOKEN` is provided by CI.

## Common Pitfalls

1. Importing app code inside `packages/` fails ESLint — keep packages isolated.
2. Forgetting `npm run build:packages` causes stale/missing type errors.
3. `window.ipcRenderer` is only available in the renderer; guard main-process code accordingly.
4. New IPC handlers must be registered in `electron/main.ts` via `getIpcHandlerContext().registerHandler(...)`.
5. `npm run lint` fails on **any** warning (`--max-warnings 0`).

## Pull Request Checklist (for agents)

- [ ] `npm run lint` passes with zero warnings.
- [ ] `npm run test -- --run` passes.
- [ ] `npx tsc` passes (after `npm run build:packages`).
- [ ] Commit messages follow Conventional Commits.
- [ ] New package logic has tests; new UI has a Storybook story when relevant.
- [ ] No secrets or credentials added.
