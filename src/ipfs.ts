import { IPFSHTTPClient } from './../node_modules/ipfs-http-client/dist/src/index.d';
import { create, globSource } from 'ipfs-http-client';
import { TMP_PATH } from './config';

class IPFSClient {
    private client: IPFSHTTPClient;

    constructor() {
        this.client = create({
            url: process.env.IPFS_API_URL || 'http://localhost:5001/api/v0',
        });
    }

    async saveFile(fileName: string): Promise<string> {
        const src = await globSource(TMP_PATH, fileName).next();
        if (!src.value) {
            throw new Error(`File not found: ${fileName}`);
        }
        const { content } = src.value;
        const { cid } = await this.client.add(content);
        return `https://ipfs.io/ipfs/${cid.toString()}`;
    }
}

const ipfsClient = new IPFSClient();
export default ipfsClient;
