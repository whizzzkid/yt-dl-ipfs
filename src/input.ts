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
                message: 'Enter YouTube URL [Ctrl+C to Exit]:',
                validate: (input: string) => input.match(/^(https?\:\/\/)?((www)?\.youtube\.com|youtu\.?be)\/.+$/) ? true : 'Please enter a valid YouTube URL'
            }
        ]);
        const ytVideo = await findVideo(ytUrl);
        await downloadVideo(ytVideo);
        const playerPath = await saveVideo(ytVideo);
        console.log(playerPath);
        await input();
    } catch (err) {
        spinner.fail('Error: ' + err);
    }
};
