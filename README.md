# AdRewind
[![Build Status](https://travis-ci.org/adrewind/extension.svg?branch=master)](https://travis-ci.org/adrewind/extension)

www.adrewind.net

AdRewind is a browser plugin, that helps you skip any fragment of YouTube video which you will recognize as an advertisement.
When you select an ad fragment it will be sent to server and other people never see this ad again.

## How to build

```bash
# clone repo
git clone git@github.com:adrewind/extension.git

# go to direcotry and install dependencies
cd extension
npm install
npm install -g mocha

# try to build extension
npm run build
# try to test builded extension
npm test
```

## Supported browsers

Now plugin supported by Chrome 55+, YandexBrowser 17+.

We are planning to extend browser support after breaking the threshold of 5k users.

You can install it to Opera [using this plugin](https://addons.opera.com/en/extensions/details/download-chrome-extension-9/). And going directly to [chrome store page](https://chrome.google.com/webstore/detail/adrewind-for-youtube/kophdidnhkficnkhklcmdaajpfmmjkmi).
