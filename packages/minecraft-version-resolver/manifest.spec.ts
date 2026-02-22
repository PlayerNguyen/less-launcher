/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { getVersionManifest, listAllVersions, getLatestVersions, VERSION_MANIFEST_URL } from './manifest'

const mockManifest = {
  latest: {
    release: '1.20.1',
    snapshot: '23w31a'
  },
  versions: [
    {
      id: '1.20.1',
      type: 'release',
      url: 'https://piston-meta.mojang.com/v1/packages/1.20.1.json',
      time: '2023-06-12T11:46:58+00:00',
      releaseTime: '2023-06-12T11:46:58+00:00'
    },
    {
      id: '23w31a',
      type: 'snapshot',
      url: 'https://piston-meta.mojang.com/v1/packages/23w31a.json',
      time: '2023-08-02T13:46:58+00:00',
      releaseTime: '2023-08-02T13:46:58+00:00'
    }
  ]
}

describe('manifest.ts', () => {
  beforeEach(() => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockManifest
    } as any)
  })

  it('getVersionManifest fetches and parses the manifest correctly', async () => {
    const result = await getVersionManifest()
    expect(global.fetch).toHaveBeenCalledWith(VERSION_MANIFEST_URL)
    expect(result).toEqual(mockManifest)
  })

  it('listAllVersions returns the versions array', async () => {
    const versions = await listAllVersions()
    expect(versions).toHaveLength(2)
    expect(versions[0].id).toBe('1.20.1')
  })

  it('getLatestVersions returns the latest release and snapshot objects', async () => {
    const latest = await getLatestVersions()
    expect(latest).toEqual(mockManifest.latest)
  })

  it('throws an error if fetch fails', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      statusText: 'Not Found'
    } as any)

    await expect(getVersionManifest()).rejects.toThrow('Failed to fetch version manifest: Not Found')
  })
})
