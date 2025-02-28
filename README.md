
# coders-ytdl

A simple and practical YouTube downloader that is easy to integrate. You can integrate it into your project that requires downloading YouTube videos and audio or just to get YouTube metadata via a link.

## Features

#### getMetadata()
- get full metadata without links
#### getFullMetadata()
- get full metadata with links
#### getBufferAudio()
- convert best audio to buffer
#### getBufferVideo()
- convert best video to buffer


## Installation

Install coders-ytdl with:

## NPM

```
npm install coders-ytdl
```
## PNPM
```
pnpm install coders-ytdl
```
## YARN
```
yarn install coders-ytdl
```
## Usage/Examples

### ESM
```js
import CodersYtdl from 'coders-ytdl';

(async (url) => {
  try {
    const init = new CodersYtdl(); // can also new CodersYtdl(url);
    // If there is no URL argument in the constructor, you can add the method below.
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
```

### CommonJS
```js
const CodersYtdl = require('coders-ytdl');

(async (url) => {
  try {
    const init = new CodersYtdl(); // can also new CodersYtdl(url);
    // If there is no URL argument in the constructor, you can add the method below.
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
```

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)


## Authors

- [@Fxc7](https://www.github.com/Fxc7)


## Feedback

If you have any feedback, please reach out to us at farhanxcode7@gmail.com