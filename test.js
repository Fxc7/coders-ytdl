import CodersYtdl from './index.js';

(async (url) => {
   try {
      const init = new CodersYtdl();
      init.downloadLink(url);
      const result = await Promise.all([
         await init.getMetadata(),
         await init.getFullMetadata(),
         await init.getBufferAudio(),
         await init.getBufferVideo()
      ]);
      console.log('Metadata:', result[0]);
      console.log('Full Metadata:', result[1]);
      console.log('Buffer Audio:', result[2]);
      console.log('Buffer Video:', result[3]);
   } catch (error) {
      console.error(error);
   }
})('https://www.youtube.com/watch?v=IWKyykQBRKo');