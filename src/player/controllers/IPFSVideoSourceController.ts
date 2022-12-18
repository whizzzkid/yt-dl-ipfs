import { ReactiveController, ReactiveControllerHost } from 'lit';

export default class IPFSVideoSourceController {
    private hash: string;
    private host: ReactiveControllerHost;
    public value: {
        src: string;
        title: string;
        webpage_url: string;
    } = {
        src: '',
        title: '',
        webpage_url: '',
    };

    constructor(host: ReactiveControllerHost, hash: string) {
        this.host = host;
        host.addController(this as ReactiveController);
        this.hash = hash;
        this.fetchVideo();
    }

    private async fetchVideo() {
        const response = await fetch(`https://ipfs.io/ipfs/${this.hash}`);
        const responseJson = JSON.parse(await response.text());
        console.log(`Response From IPFS:`, responseJson);
        const { ipfs: {cid, title, webpage_url} } = responseJson;
        this.value = {
            src: `https://ipfs.io/ipfs/${cid}`,
            title,
            webpage_url
        }
        this.host.requestUpdate();
    }
}
