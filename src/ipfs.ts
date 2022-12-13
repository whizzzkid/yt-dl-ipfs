import { IPFSHTTPClient } from './../node_modules/ipfs-http-client/dist/src/index.d';
import { create } from 'ipfs-http-client';
import path from 'path';
import { TMP_PATH } from './config';

export default class IPFSClient {
    private client: IPFSHTTPClient;

    constructor() {
        this.client = create({
            url: process.env.IPFS_API_URL || 'http://localhost:5001/api/v0',
        });
    }

    async saveFile(fileName: string): Promise<string> {
        const { cid } = await this.client.add(path.join(TMP_PATH, fileName));
        return cid.toString();
    }
}
