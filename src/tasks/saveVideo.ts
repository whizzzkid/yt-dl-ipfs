import ora from 'ora';
import ipfsClient from '../ipfs';

const spinner = ora();

export default async function saveVideo(videoPath: string) {
    try {
        spinner.start(`Saving to IPFS ${videoPath}...`);
        const ipfsCid = await ipfsClient.saveFile(videoPath);
        spinner.succeed(`Saved to ${ipfsCid}`);
        return ipfsCid;
    } catch (err) {
        spinner.fail('Error: ' + err);
        throw err;
    }
}
