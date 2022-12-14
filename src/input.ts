import ora from 'ora';
import inquirer from 'inquirer';
import findVideo from './tasks/findVideo';
import downloadVideo from './tasks/downloadVideo';
import saveVideo from './tasks/saveVideo';

const spinner = ora();
export default async function input() {
    try {
        const { ytUrl } = await inquirer.prompt([
            {
                type: 'input',
                name: 'ytUrl',
                message: 'Enter YouTube URL:',
                validate: (input: string) => input.match(/^(https?\:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/) ? true : 'Please enter a valid YouTube URL'
            }
        ]);
        const ytVideo = await findVideo(ytUrl);
        const downloadedVideo = await downloadVideo(ytVideo);
        const ipfsCid = await saveVideo(downloadedVideo);
        console.log(ipfsCid);
    } catch (err) {
        spinner.fail('Error: ' + err);
    }
};
