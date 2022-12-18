import ora from 'ora';
import youtubeDl from 'youtube-dl-exec';
import { IPFS_API_URL } from '../config';
import ipfsClient from '../ipfsClient';
import type { ErrorCustom } from './../types.d';

const spinner = ora();

export default async function saveVideo(ytVideo: Awaited<ReturnType<typeof youtubeDl>>): Promise<string> {
    try {
        spinner.start(`Saving to IPFS...`);
        const ipfsCid = await ipfsClient.saveVideoWithManifest(ytVideo);
        spinner.succeed(`Saved to ${ipfsCid}`);
        return ipfsCid;
    } catch (e) {
        const err = e as ErrorCustom;
        if (err?.code === 'ECONNREFUSED') {
            err.message = `IPFS daemon is not running at ${IPFS_API_URL}`;
        }
        spinner.fail('Error: ' + err.message);
        throw err;
    }
}
