/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { setupJavaRuntime } from './downloader'
import fs from 'node:fs'
import path from 'node:path'
import extractZip from 'extract-zip'

// Mock the underlying filesystem tools so we don't actually download 40MB files during tests
vi.mock('@packages/fs', () => ({
  ensureDir: vi.fn(),
  getAppDataPath: vi.fn(() => '/mocked/appdata/less-launcher'),
}))

vi.mock('./adoptium', () => ({
  getLatestJREAsset: vi.fn(async (version: string | number) => {
    return {
      version: `${version}.0.2+13`,
      name: `mock-jre-${version}.zip`,
      size: 40000000,
      url: `https://mock-url.com/jre-${version}.zip`,
      architecture: 'x64',
      os: 'windows'
    }
  })
}))

// Mock https downloads
vi.mock('node:https', () => {
  return {
    default: {
      get: vi.fn((_url: string, callback: any) => {
        // Mock a streaming request success
        const mockResponse = {
          statusCode: 200,
          pipe: vi.fn((fileWriteStream: any) => {
             // Simulate finishing
             setTimeout(() => {
                fileWriteStream.emit('finish')
             }, 10)
          }),
          headers: {}
        }
        callback(mockResponse)
        return { on: vi.fn() }
      })
    }
  }
})

// Mock file system writing and zip/tar extraction
vi.mock('node:fs', async (importOriginal) => {
  const actualFs = await importOriginal<typeof import('node:fs')>()
  return {
    default: {
      ...actualFs,
      createWriteStream: vi.fn(() => {
        return {
           on: vi.fn(),
           close: vi.fn(),
           emit: function(event: string) {
             const listeners = (this as any)[`_on_${event}`]
             if (listeners) listeners()
           },
           // Help bridge our mock emit
           addEventListener: function(event: string, cb: any) {
             (this as any)[`_on_${event}`] = cb
           }
        }
      }),
      existsSync: vi.fn((_pathStr: string) => {
         // Pretend nothing exists to force fresh extraction logic
         return false
      }),
      readdirSync: vi.fn((pathStr: string) => {
         // Simulate Adoptium folder structure inner root
         if (pathStr.includes('runtime')) {
            return ['jdk-17.0.2-jre']
         }
         return []
      }),
      unlinkSync: vi.fn(),
      rmSync: vi.fn(),
    }
  }
})

vi.mock('extract-zip', () => ({
   default: vi.fn(async () => {})
}))

vi.mock('tar', () => ({
  x: vi.fn(async () => {})
}))

describe('Java Runtime Downloader', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    
    // We specifically setup the mock event listening for the createWriteStream finish event
    const mockFs = vi.mocked(fs)
    mockFs.createWriteStream.mockImplementation(() => {
       const mockStream: any = {
           on: function(event: string, cb: any) {
              if (event === 'finish') mockStream._onFinish = cb;
              else if (event === 'error') mockStream._onError = cb;
              return mockStream;
           },
           close: vi.fn()
       }
       
       // Expose trigger for our mocked https pipe to call
       mockStream.emit = function(event: string) {
          if (event === 'finish' && mockStream._onFinish) mockStream._onFinish();
       }
       return mockStream as any
    })
  })

  it('downloads and extracts a .zip payload', async () => {
    const onProgress = vi.fn()
    const resultPath = await setupJavaRuntime(17, onProgress)

    const expectedPath = path.join('/mocked/appdata/less-launcher', 'runtime', '17')

    expect(resultPath).toBe(expectedPath)
    expect(onProgress).toHaveBeenCalledWith('Resolving latest JRE 17 details via API...')
    expect(onProgress).toHaveBeenCalledWith('Extracting mock-jre-17.zip...')
    expect(onProgress).toHaveBeenCalledWith(`Java Runtime successfully installed at ${expectedPath}`)
    
    // Assert extract-zip was called
    expect(extractZip).toHaveBeenCalledOnce()
  })
})
