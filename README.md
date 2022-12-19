<p align="center">
    <img src="https://raw.githubusercontent.com/whizzzkid/yt-dl-ipfs/main/src/player/images/logo.png" width="250"><br>
    <img src="https://github.com/whizzzkid/yt-dl-ipfs/actions/workflows/deploy.yml/badge.svg?branch=main">
    <img src="https://img.shields.io/docker/pulls/whizzzkid/yt-dl-ipfs?style=flat-square">
    <img src="https://img.shields.io/npm/dm/yt-dl-ipfs?label=npm-downloads&style=flat-square">
</p>

# [yt-dl-ipfs](https://github.com/whizzzkid/yt-dl-ipfs)

Download and pin yt videos to IPFS.

## Using NPM or yarn

```sh
$ npm i -g yt-dl-ipfs     # yarn global add yt-dl-ipfs
$ yt-dl-ipfs
        _            _ _       _        __
  _   _| |_       __| | |     (_)_ __  / _|___
 | | | | __|____ / _` | |_____| | '_ \| |_/ __|
 | |_| | ||_____| (_| | |_____| | |_) |  _\__ \
  \__, |\__|     \__,_|_|     |_| .__/|_| |___/
  |___/                         |_|             v0.0.1


? Enter YouTube URL:
```

## Running With Docker

This Image accepts `IPFS_API_URL` as an env variable, otherwise defaults to localhost

```sh
$ docker run -it whizzzkid/yt-dl-ipfs:latest
```

## Building Uploader locally

### Docker

This should be the easiest:

```sh
$ docker build --tag whizzkid/yt-dl-ipfs:latest .
$ docker run -it whizzkid/yt-dl-ipfs:latest
> node dist/index.js

        _            _ _       _        __
  _   _| |_       __| | |     (_)_ __  / _|___
 | | | | __|____ / _` | |_____| | '_ \| |_/ __|
 | |_| | ||_____| (_| | |_____| | |_) |  _\__ \
  \__, |\__|     \__,_|_|     |_| .__/|_| |___/
  |___/                         |_|             v0.0.1


? Enter YouTube URL:
```

### Node

Assuming you have node and python installed.

```sh
$ npm ci
$ npm run build && npm start
> node dist/index.js

        _            _ _       _        __
  _   _| |_       __| | |     (_)_ __  / _|___
 | | | | __|____ / _` | |_____| | '_ \| |_/ __|
 | |_| | ||_____| (_| | |_____| | |_) |  _\__ \
  \__, |\__|     \__,_|_|     |_| .__/|_| |___/
  |___/                         |_|             v0.0.1


? Enter YouTube URL:
```

## Building Player Locally

Player is static, it's hosted here: `https://whizzzkid.github.io/yt-dl-ipfs/#<video_manifest>`

But you can build it locally:

```sh
$ npm ci
$ npm run dev
> yt-dl-ipfs@0.0.1 dev
> npm-watch

No task specified. Will go through all possible tasks
[build] [nodemon] 2.0.20
[serve] dev-server PID 84697
[serve] player@4000> [serve]
[dev-server] listening at http://127.0.0.1:4000
[build]
src/index.ts → dist...
[build] created dist in 911ms

 → dist/player...
[serve] [nodemon] restarting due to changes...
[serve] [nodemon] starting `npm run -s serve`
[serve] dev-server PID 84706
[serve] player@4000> [serve]
[dev-server] listening at http://127.0.0.1:4000
[build] created dist/player in 805ms
[serve] [nodemon] restarting due to changes...
[build] [nodemon] clean exit - waiting for changes before restart
[serve] [nodemon] starting `npm run -s serve`
[serve] dev-server PID 84713
[serve] player@4000> [serve]
[dev-server] listening at http://127.0.0.1:4000
```

The player is live: `http://127.0.0.1:4000/#<video_manifest>`

## API

The uploader, first downloads the video and then adds it to IPFS, uses that to generate a manifest which looks like: https://ipfs.io/ipfs/QmWBaCX9cx4JTqGwEE7nW5zur5LCE52YVtb4mFFyY1M2uy

When this CID is provided as the hash to the player, the video gets loaded so the above manifest can be played as https://whizzzkid.github.io/yt-dl-ipfs/#QmWBaCX9cx4JTqGwEE7nW5zur5LCE52YVtb4mFFyY1M2uy

## License

TBD

## Author

[whizzzkid](https://github.com/whizzzkid)
