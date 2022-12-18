import ora from 'ora';
import youtubeDl from 'youtube-dl-exec';
import type { ErrorCustom } from '../types';

const spinner = ora();

export default async function findVideo(ytUrl: string): Promise<Awaited<ReturnType<typeof youtubeDl>>> {
    try {
        spinner.start(`Looking Up ${ytUrl}...`);
        const ytResp = await youtubeDl(ytUrl, {
            dumpSingleJson: true,
        });
        spinner.succeed(`Found ${ytResp.title}`);
        return ytResp;
    } catch (e) {
        const err = e as ErrorCustom;
        spinner.fail('Could not find video: ' + err.message);
        throw err;
    }
}
