import { app, BrowserWindow, ipcMain } from 'electron'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { getAppDataPath } from '../packages/fs'
import { getVersionManifest, getVersionDetails, resolveResources, downloadResources } from '../packages/minecraft-version-resolver'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.mjs
// │
process.env.APP_ROOT = path.join(__dirname, '..')

// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron')
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist')

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, 'public') : RENDERER_DIST

let win: BrowserWindow | null

function createWindow() {
  win = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, 'electron-vite.svg'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.mjs'),
    },
  })

  // Test active push message to Renderer-process.
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', (new Date).toLocaleString())
  })

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL)
  } else {
    // win.loadFile('dist/index.html')
    win.loadFile(path.join(RENDERER_DIST, 'index.html'))
  }
  
  // Dev Tool: Trigger Version Download
  ipcMain.handle('dev:download-version', async (_event, versionId: string) => {
    try {
      console.log(`[Dev] Fetching manifest to find version: ${versionId}`)
      const manifest = await getVersionManifest()
      const versionInfo = manifest.versions.find((v: any) => v.id === versionId)
      
      if (!versionInfo) {
        throw new Error(`Version ${versionId} not found in manifest.`)
      }

      console.log(`[Dev] Fetching metadata for ${versionId}...`)
      const details = await getVersionDetails(versionInfo)
      
      console.log(`[Dev] Resolving required resources for ${process.platform}...`)
      const resources = await resolveResources(details)
      
      const targetDir = path.join(getAppDataPath(), 'versions', versionId)
      console.log(`[Dev] Starting download of ${resources.length} objects to ${targetDir}...`)

      await downloadResources(resources, targetDir, {
        concurrency: 10,
        onProgress: (done: number, total: number) => {
          if (done % 50 === 0 || done === total) {
            console.log(`[Dev] Download progress: ${done}/${total} (${Math.round((done/total)*100)}%)`)
          }
        }
      })
      
      console.log(`[Dev] Successfully downloaded version ${versionId}!`)
      return { success: true, count: resources.length, path: targetDir }
    } catch (err: any) {
      console.error(`[Dev] Failed to download version ${versionId}:`, err)
      return { success: false, error: err.message }
    }
  })
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
    win = null
  }
})

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

app.whenReady().then(createWindow)
