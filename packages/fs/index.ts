import os from 'node:os'
import path from 'node:path'
import fs from 'node:fs'

/**
 * Returns the application data directory based on the user's OS.
 * - Windows: `%APPDATA%/less-launcher`
 * - macOS: `~/Library/Application Support/less-launcher`
 * - Linux: `~/.config/less-launcher`
 */
export function getAppDataPath(): string {
  const appName = 'less-launcher'
  const homedir = os.homedir()

  switch (process.platform) {
    case 'win32': {
      // Use localized AppData if available, otherwise fallback to Roaming profile
      const appData = process.env.APPDATA || path.join(homedir, 'AppData', 'Roaming')
      return path.join(appData, appName)
    }
    case 'darwin': {
      return path.join(homedir, 'Library', 'Application Support', appName)
    }
    case 'linux': {
      const xdgConfig = process.env.XDG_CONFIG_HOME || path.join(homedir, '.config')
      return path.join(xdgConfig, appName)
    }
    default: {
      // Fallback for unsupported platforms
      return path.join(homedir, `.${appName}`)
    }
  }
}

/**
 * Ensures the given directory path exists.
 */
export async function ensureDir(dirPath: string): Promise<void> {
  if (!fs.existsSync(dirPath)) {
    await fs.promises.mkdir(dirPath, { recursive: true })
  }
}
