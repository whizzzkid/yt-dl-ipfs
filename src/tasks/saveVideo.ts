import ora from 'ora';
import youtubeDl from 'youtube-dl-exec';
import ipfsClient from '../ipfsClient';

const spinner = ora();

export default async function saveVideo(ytVideo: Awaited<ReturnType<typeof youtubeDl>>) {
    try {
        spinner.start(`Saving to IPFS...`);
        const ipfsCid = await ipfsClient.saveVideoWithManifest(ytVideo);
        spinner.succeed(`Saved to ${ipfsCid}`);
        return ipfsCid;
    } catch (err) {
        spinner.fail('Error: ' + err);
        throw err;
    }
}
