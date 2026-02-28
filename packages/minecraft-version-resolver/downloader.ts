import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'
import { ResolvedResource } from './types'
import { ensureDir } from '../fs'

export interface DownloadOptions {
  /** Maximum number of concurrent downloads. Default is 10. */
  concurrency?: number
  /** Callback emitted after every successful partial or full file download completion. */
  onProgress?: (downloaded: number, total: number) => void
}

async function verifyFile(filePath: string, expectedSha1: string): Promise<boolean> {
  if (!fs.existsSync(filePath)) return false
  
  return new Promise((resolve) => {
    const hash = crypto.createHash('sha1')
    const stream = fs.createReadStream(filePath)
    stream.on('data', (data) => hash.update(data))
    stream.on('end', () => {
      resolve(hash.digest('hex') === expectedSha1)
    })
    stream.on('error', () => resolve(false))
  })
}

async function downloadFile(resource: ResolvedResource, targetDir: string): Promise<void> {
  const fullPath = path.join(targetDir, resource.path)
  
  if (await verifyFile(fullPath, resource.sha1)) {
    return
  }
  
  await ensureDir(path.dirname(fullPath))
  
  const response = await fetch(resource.url)
  if (!response.ok) {
    throw new Error(`Failed to download ${resource.url}: ${response.statusText}`)
  }
  
  const arrayBuffer = await response.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)
  
  const hash = crypto.createHash('sha1')
  hash.update(buffer)
  const actualSha1 = hash.digest('hex')
  
  if (actualSha1 !== resource.sha1) {
    throw new Error(`Checksum mismatch for ${resource.url}. Expected ${resource.sha1}, got ${actualSha1}`)
  }
  
  await fs.promises.writeFile(fullPath, buffer)
}

/**
 * Downloads a list of resources concurrently to the specified directory.
 */
export async function downloadResources(
  resources: ResolvedResource[],
  targetDir: string,
  options: DownloadOptions = {}
): Promise<void> {
  const concurrency = Math.min(options.concurrency || 10, resources.length);
  let completed = 0;
  let index = 0;

  // This worker pulls the next available task from the list
  const worker = async () => {
    while (index < resources.length) {
      const resource = resources[index++]; // Get the next resource and move the pointer

      try {
        await downloadFile(resource, targetDir);
      } catch (error) {
        // Log error but allow other downloads to continue
        console.error(`Failed to download ${resource.url}:`, error);
      } finally {
        completed++;
        options.onProgress?.(completed, resources.length);
      }
    }
  };

  // Create a pool of workers running at the same time
  const workers = Array(concurrency).fill(null).map(worker);

  // Wait for all workers to finish their queues
  await Promise.all(workers);
}