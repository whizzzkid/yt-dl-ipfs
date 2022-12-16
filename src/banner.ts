import figlet from 'figlet';
import fs from 'fs';
import { join } from 'path';

function loadPkgInfo() {
    const pkgFile = join(process.cwd(), 'package.json');
    return JSON.parse(fs.readFileSync(pkgFile).toString());
}

export default async function banner(): Promise<void> {
    const { name, version } = loadPkgInfo();
    console.log(`${figlet.textSync(name)} v${version}\n\n`);
}
