# Less Launcher

A lightweight, cross-platform Minecraft launcher built with **Electron + React + Vite**.

Less Launcher resolves Minecraft versions, downloads game resources, provisions a matching Java runtime, and launches the game — all from a modern desktop UI.

> This project is under active development. APIs, file layout, and behavior may change between releases.

> **Disclaimer:** Less Launcher is an unofficial, community-made project. It is **not** affiliated with, endorsed by, or associated with Mojang Studios, Microsoft, or the game **Minecraft**. "Minecraft" and related marks are trademarks of Mojang AB/Microsoft. All game assets and content remain the property of their respective owners.

## Features

- Browse and resolve Minecraft versions from the official Mojang manifest.
- Download and verify client resources and libraries.
- Automatic Java (JRE) provisioning via the Adoptium API.
- Offline-mode launching with username support.
- Modern UI built on Mantine v8 and Tailwind CSS v4.
- Typed IPC bridge between the Electron main process and the React renderer.
- Storybook component explorer with Vitest browser tests.

## Tech Stack

| Layer      | Technology                                                        |
| ---------- | ----------------------------------------------------------------- |
| Desktop    | Electron 30                                                       |
| Frontend   | React 18, React Router 7 (memory router), Zustand                |
| UI         | Mantine v8, Tailwind CSS v4, PostCSS (Mantine preset)            |
| Build      | Vite 5, `vite-plugin-electron`, TypeScript 5 project references  |
| Packaging  | electron-builder (NSIS / DMG / AppImage)                          |
| Testing    | Vitest 4 + Playwright (Chromium), Storybook 10 test integration  |
| Quality    | Biome 2 (lint + format), Storybook a11y addon, TypeScript strict mode |

## Prerequisites

- **Node.js 20.x** (matches CI)
- **npm** (uses `package-lock.json`)
- **Playwright Chromium** for browser-based tests: `npx playwright install chromium`

## Getting Started

```bash
# 1. Clone
git clone https://github.com/PlayerNguyen/less-launcher.git
cd less-launcher

# 2. Install dependencies
npm install

# 3. Start the dev server (Vite + Electron)
npm run dev
```

## Available Scripts

| Script                    | Description                                                            |
| ------------------------- | ---------------------------------------------------------------------- |
| `npm run dev`             | Start Vite and launch the Electron app with HMR.                       |
| `npm run build:packages`  | Compile the local TypeScript packages (`tsc -b packages`).             |
| `npm run build`           | Build packages, typecheck, bundle, and package with electron-builder.  |
| `npm run lint`            | Run Biome (lint, format, and import order checks).                     |
| `npm run lint:fix`        | Apply Biome's safe fixes and formatting.                              |
| `npm run format`          | Format the codebase with Biome.                                       |
| `npm run test`            | Run the Vitest suite.                                                  |
| `npm run storybook`       | Run Storybook on port 6006.                                            |
| `npm run build-storybook` | Build a static Storybook.                                              |
| `npm run preview`         | Preview a production Vite build.                                       |

> Always run `npm run build:packages` before `npm run build`. The app depends on the compiled package output.

## Project Structure

```text
less-launcher/
├── electron/                 # Electron main + preload processes
│   ├── configs/              # Launcher metadata & runtime config
│   ├── ipc-handler/          # IPC handlers (versions, run game, downloads)
│   ├── menu/                 # Application menus (debugger, files)
│   ├── main.ts               # Main process entry
│   └── preload.ts            # contextBridge API exposed to the renderer
├── packages/                 # Local TypeScript packages (project references)
│   ├── config/               # Typed configuration context
│   ├── fs/                   # OS-aware paths and file utilities
│   ├── ipc/                  # IPC handler registration system
│   ├── minecraft-manifest-rules/   # Manifest rule evaluation
│   ├── minecraft-runner/     # Argument building + game process spawn
│   ├── minecraft-version-resolver/ # Manifest parsing, resolution, downloads
│   └── runtime/              # Java runtime provisioning (Adoptium)
├── src/                      # React renderer
│   ├── components/           # Layout + UI components (with stories)
│   ├── pages/                # Route pages
│   ├── stores/               # Zustand stores (persisted to localStorage)
│   ├── themes/               # Custom Mantine component themes
│   ├── router.tsx            # createMemoryRouter routes
│   └── App.tsx               # MantineProvider + RouterProvider
├── public/                   # Static assets
├── .storybook/               # Storybook configuration
├── .github/workflows/        # CI (`pr-check.yml`) and release (`release.yml`)
├── electron-builder.json5    # Packaging configuration
└── vite.config.ts            # Vite, Electron plugin, Vitest projects
```

## Architecture

- **Main process** (`electron/main.ts`) creates the window, initializes logging and config, and registers IPC handlers.
- **Preload** (`electron/preload.ts`) exposes a typed `window.ipcRenderer` API via `contextBridge`.
- **Renderer** (`src/main.tsx` → `src/App.tsx`) renders the React app and calls the main process through `window.ipcRenderer.invoke(...)`.
- **Packages** (`packages/`) contain pure, reusable logic. They must **never** import from `src/` or `electron/` (enforced by Biome's `noRestrictedImports`).
- **IPC handlers** implement the `IpcHandler` interface and are registered through `getIpcHandlerContext()` in `packages/ipc`.

### Path Aliases

| Alias          | Target        | Defined in          |
| -------------- | ------------- | ------------------- |
| `@packages/*`  | `./packages/*/src` | Vite, tsconfig, pkg |
| `@src/*`       | `./src/*`     | Vite, tsconfig      |
| `@electron/*`  | `./electron/*`| Vite, tsconfig      |
| `@components/*`| `./src/components/*` | Vite          |

## Testing

- **Unit / integration**: Vitest (`npm run test`). Test files live next to the code as `*.test.ts` / `*.spec.ts`.
- **Component**: Storybook stories (`src/**/*.stories.tsx`) are executed as Vitest browser tests via `@storybook/addon-vitest` using headless Chromium.
- **CI order**: `lint` → `build:packages` → `test --run` → `tsc` → `build`.

## Contributing

Thanks for contributing! Please follow the workflow below.

### 1. Branch Naming

Use a short, descriptive prefix:

```text
feat/<short-description>
fix/<short-description>
docs/<short-description>
refactor/<short-description>
chore/<short-description>
```

### 2. Commit Message Convention

This project follows [Conventional Commits](https://www.conventionalcommits.org/). Commits **must** be formatted as:

```text
<type>(<scope>): <short, imperative summary>
```

Allowed `type` values:

| Type       | Use for                                             |
| ---------- | --------------------------------------------------- |
| `feat`     | A new feature                                       |
| `fix`      | A bug fix                                           |
| `docs`     | Documentation-only changes                          |
| `refactor` | Code change that neither fixes a bug nor adds a feature |
| `test`     | Adding or updating tests                            |
| `chore`    | Build tooling, dependencies, config                 |
| `style`    | Formatting-only changes                             |
| `perf`     | Performance improvements                            |

- `scope` is optional but encouraged (e.g. `home`, `runtime`, `ipc`, `sidebar`).
- Use the imperative mood: "add", "fix", "update" — not "added" or "fixes".
- Keep the subject line under ~72 characters.

Examples:

```text
feat(runtime): add fallback Java runtime resolution
fix(home): prevent launch when username is empty
docs(agent): add agent instructions
test(minecraft-manifest-rules): cover system criteria
```

### 3. Before Opening a Pull Request

Run the same checks as CI and make sure they pass:

```bash
npm run lint
npm run build:packages
npm run test -- --run
npx tsc
```

### 4. Pull Requests

- Target the `main` branch.
- Fill in the [Pull Request template](.github/PULL_REQUEST_TEMPLATE.md).
- Keep PRs focused; one logical change per PR.
- Reference related issues (e.g. `Closes #12`).
- Wait for the **PR Check** workflow to pass before requesting review.

## License

Released under the [MIT License](./LICENSE.md).
