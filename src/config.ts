import { resolve } from 'path';

export const TMP_PATH = resolve(process.cwd(), 'tmp');
export const PLAYER_PATH = process.env.PLAYER_PATH || 'https://whizzzkid.github.io/yt-dl-ipfs/';
export const IPFS_API_URL = process.env.IPFS_API_URL || 'http://127.0.0.1:5001/';
