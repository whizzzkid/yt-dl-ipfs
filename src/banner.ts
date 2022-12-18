import figlet from 'figlet';
import { name, version} from '../package.json';

export default async function banner(): Promise<void> {
    console.log(`${figlet.textSync(name)} v${version}\n\n`);
}
