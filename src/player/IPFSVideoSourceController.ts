import { ReactiveController, ReactiveControllerHost } from 'lit';

export default class IPFSVideoSourceController {
    host: ReactiveControllerHost;
    value: {
        muted: 'muted' | 'unmuted';
        src: string;
        title: string;
    } = {
        muted: 'muted',
        src: '',
        title: '',
    };

    constructor(host: ReactiveControllerHost) {
        this.host = host;
        host.addController(this as ReactiveController);
        this.fetchVideo();
    }

    private async fetchVideo() {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        this.value = {
            src: 'https://cloudflare-ipfs.com/ipfs/QmcTC1cxYH3goM5TvyUdXqXXokSqg1HYRifV75y2EHJMs1',
            title: 'The Internet Archive',
            muted: 'unmuted',
        }
        this.host.requestUpdate();
    }
}
