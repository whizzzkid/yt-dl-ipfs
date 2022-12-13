import figlet from 'figlet';
import {name, version} from '../package.json';

export default async function banner(): Promise<string> {
    return new Promise((resolve, reject) => {
        figlet(name, function (err, data) {
            if (err) {
                reject(err);
            }
            resolve(`${data} v${version}\n\n` as string);
        });
    });
}
