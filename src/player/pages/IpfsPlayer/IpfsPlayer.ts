import { css, html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { createRef, ref, Ref } from 'lit/directives/ref.js';
import IPFSVideoSourceController from '../../controllers/IPFSVideoSourceController';

@customElement('ipfs-player')
export default class IpfsPlayer extends LitElement {

    @property()
    hash: string = '';

    @state()
    videoMeta: IPFSVideoSourceController = {} as IPFSVideoSourceController;

    connectedCallback() {
        super.connectedCallback();
        this.videoMeta = new IPFSVideoSourceController(this, this.hash);
    }

    static styles = css`
        video, h2 {
            width: 80%;
            max-width: 80%;
        }
        h1 {
            margin-top: 20px;
        }
    `;

    videoPlayerRef: Ref<HTMLMediaElement> = createRef();

    updated() {
        if (this.videoPlayerRef.value) {
            this.videoPlayerRef.value.load();
        }
    }

    render() {
        return html`${this.videoMeta.value.src === '' ?
            html`<h1>Loading...</h1>` :
            html`<h1>This video is playing over IPFS!</h1>
                <video
                    ${ref(this.videoPlayerRef)}
                    playsinline
                    controls
                    autoplay
                    muted
                >
                    <source src="${this.videoMeta.value.src}" type="video/webm">
                    Your browser does not support the video tag.
                </video>
                <h2>${this.videoMeta.value.title}</h2>
                <a href="${this.videoMeta.value.webpage_url}" target="_blank">View on YouTube</a>`
        }`;
    }
}
