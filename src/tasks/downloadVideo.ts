import { TMP_PATH } from './../config';
import ora from 'ora';
import youtubeDl from 'youtube-dl-exec';
import sanitize from 'sanitize-filename';
import path from 'path';

const spinner = ora();

export default async function downloadVideo(ytVideo: Awaited<ReturnType<typeof youtubeDl>>) {
    try {
        spinner.start(`Downloading ${ytVideo.title}...`);
        const filePath = path.join(TMP_PATH, sanitize(ytVideo.title, { replacement: ' ' }));
        await youtubeDl.exec(ytVideo.webpage_url, { output: filePath });
        spinner.succeed(`Downloaded to ${filePath}`);
        return `${filePath}.${ytVideo.ext}`;
    } catch (err) {
        spinner.fail('Error: ' + err);
        throw err;
    }
}
