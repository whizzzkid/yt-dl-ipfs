import ora from 'ora';
import youtubeDl from 'youtube-dl-exec';
import { videoFilePath } from '../helpers';
import type { ErrorCustom } from '../types';

const spinner = ora();

export default async function downloadVideo(ytVideo: Awaited<ReturnType<typeof youtubeDl>>): Promise<void> {
    try {
        spinner.start(`Downloading ${ytVideo.title}...`);
        await youtubeDl.exec(ytVideo.webpage_url, { output: videoFilePath(ytVideo) });
        spinner.succeed('Downloaded Complete!');
    } catch (e) {
        const err = e as ErrorCustom;
        spinner.fail('Download Failed: ' + err.message);
        throw err;
    }
}
