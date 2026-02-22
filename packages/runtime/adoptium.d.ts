export interface AdoptiumAsset {
    version: string;
    url: string;
    name: string;
    size: number;
    os: string;
    architecture: string;
}
/**
 * Fetches the download URL and metadata for the latest JRE of a specified version.
 * @param version The major Java version (e.g., 8, 11, 17, 21)
 */
export declare function getLatestJREAsset(version: number | string): Promise<AdoptiumAsset>;
