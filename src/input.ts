import ora from 'ora';
import inquirer from 'inquirer';
import youtubeDl from 'youtube-dl-exec';

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
        spinner.start(`Looking Up ${ytUrl}...`);
        const ytResp = await youtubeDl(ytUrl, {
            dumpSingleJson: true,
        });
        spinner.text = `Found ${ytResp.title}`;
        spinner.text = `Downloading ${ytResp.title}...`;
        await youtubeDl.exec(ytUrl, { output: `tmp/${ytResp.title}` });
        spinner.succeed(`✅ Downloaded ${ytResp.title}`);
    } catch (err) {
        spinner.fail('Error: ' + err);
    }
};
