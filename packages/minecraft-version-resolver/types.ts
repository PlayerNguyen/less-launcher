export interface VersionManifest {
  latest: {
    release: string
    snapshot: string
  }
  versions: VersionInfo[]
}

export interface VersionInfo {
  id: string
  type: string
  url: string
  time: string
  releaseTime: string
  sha1?: string
  complianceLevel?: number
}

export interface Version {
  id: string
  assetIndex: {
    id: string
    sha1: string
    size: number
    totalSize: number
    url: string
  }
  assets: string
  downloads: {
    client: Download
    server?: Download
    client_mappings?: Download
    server_mappings?: Download
  }
  libraries: Library[]
  mainClass: string
  minecraftArguments?: string
  arguments?: {
    game: unknown[]
    jvm: unknown[]
  }
}

export interface Download {
  sha1: string
  size: number
  url: string
  path?: string
}

export interface Library {
  downloads: {
    artifact?: Download
    classifiers?: {
      [key: string]: Download
    }
  }
  name: string
  rules?: Rule[]
  natives?: {
    linux?: string
    osx?: string
    windows?: string
  }
}

export interface Rule {
  action: 'allow' | 'disallow'
  os?: {
    name: string
    version?: string
    arch?: string
  }
}

export interface AssetIndex {
  objects: {
    [key: string]: {
      hash: string
      size: number
    }
  }
}

export type TargetOS = 'windows' | 'osx' | 'linux'

export interface ResolvedResource {
  url: string
  path: string
  sha1: string
  size?: number
}
