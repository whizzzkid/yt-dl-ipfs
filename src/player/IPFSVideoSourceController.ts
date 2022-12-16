import { ReactiveController, ReactiveControllerHost } from 'lit';

export default class IPFSVideoSourceController {
    host: ReactiveControllerHost;
    value: {
        src: string;
        title: string;
        webpage_url: string;
    } = {
        src: '',
        title: '',
        webpage_url: '',
    };

    constructor(host: ReactiveControllerHost) {
        this.host = host;
        host.addController(this as ReactiveController);
        this.fetchVideo();
    }

    private async fetchVideo() {
        const { hash } = window.location;
        const manifestCid = (hash || '#QmPQudMCKchspxjDzQVXsd3kGoiAaQy3qzrxGRLkt1iyvX').substring(1);
        const response = await fetch(`https://ipfs.io/ipfs/${manifestCid}`);
        const responseJson = JSON.parse(await response.text());
        console.log(responseJson);
        const { ipfs: {cid, title, webpage_url} } = responseJson;
        this.value = {
            src: `https://ipfs.io/ipfs/${cid}`,
            title,
            webpage_url
        }
        this.host.requestUpdate();
    }
}
