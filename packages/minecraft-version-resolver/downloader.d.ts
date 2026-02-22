import { ResolvedResource } from './types';
export interface DownloadOptions {
    /** Maximum number of concurrent downloads. Default is 10. */
    concurrency?: number;
    /** Callback emitted after every successful partial or full file download completion. */
    onProgress?: (downloaded: number, total: number) => void;
}
/**
 * Downloads a list of resources concurrently to the specified directory.
 */
export declare function downloadResources(resources: ResolvedResource[], targetDir: string, options?: DownloadOptions): Promise<void>;
