const path = require('path');
const os = require('os');
const child_process = require('child_process');

const IsWin32 = os.platform() === 'win32';
const NAME_TOOLS = IsWin32 ? 'coders-tools.exe' : 'coders-tools';
const BIN_DIR = path.resolve(__dirname, 'bin');
const TOOLS_PATH = path.join(BIN_DIR, NAME_TOOLS);

class YT {
   #toolsPath;
   #url;
   #metadata;

   constructor(url = null) {
      this.#toolsPath = TOOLS_PATH;
      this.#url = url;
      this.#metadata = null;
   }

   downloadLink(url) {
      this.#url = url;
      return this;
   }

   #extractId(url) {
      const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
      const match = url.match(regex);
      return match ? match[1] : null;
   }

   #createUrl(url) {
      const id = this.#extractId(url || this.#url);
      if (id) return `https://www.youtube.com/watch?v=${id}`;
      throw new Error('Could not find YouTube ID');
   }

   #deleteObject(data = this.#metadata) {
      if (data.formats) delete data.formats;
      if (data.automatic_captions) delete data.automatic_captions;
      if (data.requested_downloads) delete data.requested_downloads;
      if (data.requested_formats) delete data.requested_formats;
      return data;
   }

   async getMetadata(url = this.#url) {
      if (!url) throw new Error('URL is required');
      const link = this.#createUrl(url);
      return new Promise((resolve, reject) => {
         child_process.execFile(this.#toolsPath, ['-J', link], (error, stdout) => {
            if (error) return reject(error);
            try {
               const result = JSON.parse(stdout);
               delete result._version;
               resolve(this.#deleteObject(result));
            } catch (error) {
               reject(error);
            }
         });
      });
   }

   async getFullMetadata(url = this.#url) {
      if (!url) throw new Error('URL is required');
      const link = this.#createUrl(url);
      return new Promise((resolve, reject) => {
         child_process.execFile(this.#toolsPath, ['-J', link], (error, stdout) => {
            if (error) return reject(error);
            try {
               const result = JSON.parse(stdout);
               delete result._version;
               resolve(result);
            } catch (error) {
               reject(error);
            }
         });
      });
   }

   async getBufferAudio(url = this.#url) {
      return this.#downloadBuffer(url, ['-x', '--audio-format', 'mp3', '-o', '-']);
   }

   async getBufferVideo(url = this.#url) {
      return this.#downloadBuffer(url, ['-f', 'best', '-o', '-']);
   }

   async #downloadBuffer(url, args) {
      if (!url) throw new Error('URL is required');
      const link = this.#createUrl(url);
      return new Promise((resolve, reject) => {
         const ytdl = child_process.spawn(this.#toolsPath, [...args, link]);
         let result = Buffer.alloc(0);
         ytdl.stdout.on('data', (chunk) => {
            result = Buffer.concat([result, chunk]);
         });
         ytdl.on('close', (code) => {
            if (code === 0) {
               resolve(result);
            } else {
               reject(new Error(`Process exited with code ${code}`));
            }
         });
      });
   }
}

module.exports = YT;