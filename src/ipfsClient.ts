import { IPFSHTTPClient, create, globSource } from 'ipfs-http-client';
import youtubeDl from 'youtube-dl-exec';
import { downloadPath, generateIPFSManifest, videoFileName } from './helpers';

class IPFSClient {
    private client: IPFSHTTPClient;

    constructor() {
        this.client = create({
            url: process.env.IPFS_API_URL || 'http://127.0.0.1:5001/api/v0',
        });
    }

    async saveVideoWithManifest(ytVideo: Awaited<ReturnType<typeof youtubeDl>>): Promise<string> {
        const src = await globSource(downloadPath(ytVideo), videoFileName(ytVideo)).next();
        if (!src.value?.content) {
            throw new Error(`File missing after download!`);
        }
        const { content } = src.value;
        const { cid } = await this.client.add(content);
        const { cid: manifestCid } = await this.client.add(JSON.stringify({
            ...ytVideo,
            ifps: generateIPFSManifest(cid.toString(), ytVideo)
        }));
        return `https://https://whizzzkid.github.io/yt-dl-ipfs/#${manifestCid.toString()}`;
    }
}

const ipfsClient = new IPFSClient();
export default ipfsClient;
