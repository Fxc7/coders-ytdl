/// <reference types="node" />

declare module "coders-ytdl" {
    export default class YT {
        constructor(url?: string | URL | null);

        /**
         * Set the URL of the video to download
         * @param url YouTube video URL
         * @returns YT instance with updated URL
         */
        downloadLink(url: string | URL): this;

        /**
         * Get video metadata with some data removed
         * @param url YouTube video URL (optional)
         * @returns Video metadata in object form
         */
        getMetadata(url?: string | URL | null): Promise<object>;

        /**
         * Get full metadata from video
         * @param url YouTube video URL (optional)
         * @returns Full video metadata
         */
        getFullMetadata(url?: string | URL | null): Promise<object>;

        /**
         * Get audio buffer from YouTube video in MP3 format
         * @param url URL of YouTube video (optional)
         * @returns Audio buffer in MP3 format
         */
        getBufferAudio(url?: string | URL | null): Promise<Buffer>;

        /**
         * Get video buffer from YouTube in best quality
         * @param url YouTube video URL (optional)
         * @returns Video buffer
         */
        getBufferVideo(url?: string | URL | null): Promise<Buffer>;
    }
}