import { PLAYER_PATH, IPFS_API_URL } from './config';
import { IPFSHTTPClient, create, globSource } from 'ipfs-http-client';
import youtubeDl from 'youtube-dl-exec';
import { downloadPath, generateIPFSManifest, videoFileName } from './helpers';

class IPFSClient {
    private client: IPFSHTTPClient;

    constructor() {
        this.client = create({
            url: IPFS_API_URL,
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
            ipfs: generateIPFSManifest(cid.toString(), ytVideo)
        }));
        return `${PLAYER_PATH}#${manifestCid.toString()}`;
    }
}

const ipfsClient = new IPFSClient();
export default ipfsClient;
