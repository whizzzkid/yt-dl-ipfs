import banner from './banner';
import input from './input';

async function main() {
    console.log(await banner());
    input();
};

main();
