import { TMP_PATH } from './../config';
import ora from 'ora';
import youtubeDl from 'youtube-dl-exec';
import sanitize from 'sanitize-filename';
import path from 'path';

const spinner = ora();

export default async function downloadVideo(ytVideo: Awaited<ReturnType<typeof youtubeDl>>) {
    try {
        spinner.start(`Downloading ${ytVideo.title}...`);
        const fileName = sanitize(ytVideo.title, { replacement: ' ' });
        const filePath = path.join(TMP_PATH, fileName);
        await youtubeDl.exec(ytVideo.webpage_url, { output: filePath });
        spinner.succeed(`Downloaded to ${filePath}`);
        return `${fileName}.${ytVideo.ext}`;
    } catch (err) {
        spinner.fail('Error: ' + err);
        throw err;
    }
}
