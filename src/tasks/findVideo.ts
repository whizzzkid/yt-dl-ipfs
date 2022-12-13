import ora from 'ora';
import youtubeDl from 'youtube-dl-exec';

const spinner = ora();

export default async function findVideo(ytUrl: string) {
    try {
        spinner.start(`Looking Up ${ytUrl}...`);
        const ytResp = await youtubeDl(ytUrl, {
            dumpSingleJson: true,
        });
        spinner.succeed(`✅ Found ${ytResp.title}`);
        return ytResp;
    } catch (err) {
        spinner.fail('Error: ' + err);
        throw err;
    }
}
