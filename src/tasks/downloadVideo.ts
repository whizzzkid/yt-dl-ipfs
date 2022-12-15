import ora from 'ora';
import youtubeDl from 'youtube-dl-exec';
import { videoFilePath } from '../helpers';

const spinner = ora();

export default async function downloadVideo(ytVideo: Awaited<ReturnType<typeof youtubeDl>>) {
    try {
        spinner.start(`Downloading ${ytVideo.title}...`);
        await youtubeDl.exec(ytVideo.webpage_url, { output: videoFilePath(ytVideo) });
        spinner.succeed('Downloaded Complete!');
    } catch (err) {
        spinner.fail('Error: ' + err);
        throw err;
    }
}
