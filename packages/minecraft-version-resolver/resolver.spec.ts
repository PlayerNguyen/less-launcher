/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { getTargetOS, isLibraryAllowed, resolveResources } from './resolver'
import { Library, Version } from './types'

describe('resolver.ts', () => {
  describe('getTargetOS', () => {
    const originalPlatform = process.platform

    afterEach(() => {
      Object.defineProperty(process, 'platform', {
        value: originalPlatform
      })
    })

    const setPlatform = (platform: string) => {
      Object.defineProperty(process, 'platform', {
        value: platform
      })
    }

    it('returns windows for win32', () => {
      setPlatform('win32')
      expect(getTargetOS()).toBe('windows')
    })

    it('returns osx for darwin', () => {
      setPlatform('darwin')
      expect(getTargetOS()).toBe('osx')
    })

    it('returns linux for linux', () => {
      setPlatform('linux')
      expect(getTargetOS()).toBe('linux')
    })
  })

  describe('isLibraryAllowed', () => {
    it('allows library with no rules', () => {
      const lib: Library = { name: 'test', downloads: {} }
      expect(isLibraryAllowed(lib, 'windows')).toBe(true)
    })

    it('allows library when rule allows specific OS', () => {
      const lib: Library = {
        name: 'test',
        downloads: {},
        rules: [{ action: 'allow', os: { name: 'windows' } }]
      }
      expect(isLibraryAllowed(lib, 'windows')).toBe(true)
      expect(isLibraryAllowed(lib, 'osx')).toBe(false)
    })

    it('disallows library when rule disallows specific OS', () => {
      const lib: Library = {
        name: 'test',
        downloads: {},
        rules: [
          { action: 'allow' },
          { action: 'disallow', os: { name: 'osx' } }
        ]
      }
      expect(isLibraryAllowed(lib, 'windows')).toBe(true)
      expect(isLibraryAllowed(lib, 'osx')).toBe(false)
    })
  })

  describe('resolveResources', () => {
    beforeEach(() => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          objects: {
            'minecraft/sounds/click.ogg': { hash: 'abcd1234efgh', size: 1024 }
          }
        })
      } as any)
    })

    it('resolves client JAR, libraries, natives, and assets', async () => {
      const mockVersion: Version = {
        id: '1.20.1',
        mainClass: 'net.minecraft.client.main.Main',
        assets: '1.20',
        assetIndex: {
          id: '1.20',
          sha1: 'indexsha',
          size: 100,
          totalSize: 1000,
          url: 'https://example.com/index.json'
        },
        downloads: {
          client: { sha1: 'clientsha', size: 5000, url: 'https://example.com/client.jar' }
        },
        libraries: [
          {
            name: 'com.example:library:1.0',
            downloads: {
              artifact: { path: 'com/example/library/1.0/library-1.0.jar', sha1: 'libsha', size: 500, url: 'https://example.com/lib.jar' }
            }
          },
          {
            name: 'com.example:native:1.0',
            natives: { windows: 'natives-windows' },
            downloads: {
              classifiers: {
                'natives-windows': { path: 'com/example/native/1.0/native-1.0-natives-windows.jar', sha1: 'natsha', size: 300, url: 'https://example.com/native.jar' }
              }
            }
          }
        ]
      }

      const resources = await resolveResources(mockVersion, 'windows')
      
      // Should include: Client JAR, 1 Library, 1 Native, 1 Asset Index, 1 Asset Object
      expect(resources).toHaveLength(5)
      
      const paths = resources.map(r => r.path)
      expect(paths).toContain('versions/1.20.1/1.20.1.jar')
      expect(paths).toContain('libraries/com/example/library/1.0/library-1.0.jar')
      expect(paths).toContain('libraries/com/example/native/1.0/native-1.0-natives-windows.jar')
      expect(paths).toContain('assets/indexes/1.20.json')
      expect(paths).toContain('assets/objects/ab/abcd1234efgh') // 'ab' is the first 2 chars of hash
    })

    it('filters out libraries not meant for the target OS', async () => {
      const mockVersion: Version = {
        id: '1.19',
        mainClass: 'Main',
        assets: '1.19',
        assetIndex: undefined as any,
        downloads: { client: { sha1: 'c', size: 1, url: 'u' } },
        libraries: [
          {
            name: 'osx-only-lib',
            rules: [{ action: 'allow', os: { name: 'osx' } }],
            downloads: { artifact: { path: 'osx.jar', sha1: 'x', size: 1, url: 'url' } }
          }
        ]
      }

      const windowsResources = await resolveResources(mockVersion, 'windows')
      expect(windowsResources).toHaveLength(1) // Only client jar

      const osxResources = await resolveResources(mockVersion, 'osx')
      expect(osxResources).toHaveLength(2) // Client jar + the library
    })
  })
})
