import { ref, createRef, Ref } from 'lit/directives/ref.js';
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import IPFSVideoSourceController from './IPFSVideoSourceController';

@customElement('ipfs-player')
export class IpfsPlayer extends LitElement {
    static styles = css`
        video {
            width: 80%;
            max-width: 80%;
        }
        h1 {
            margin-top: 20px;
        }
    `;

    videoPlayerRef: Ref<HTMLMediaElement> = createRef();

    @property()
    private videoMeta = new IPFSVideoSourceController(this);

    updated() {
        if (this.videoPlayerRef.value) {
            this.videoPlayerRef.value.load();
        }
    }

    render() {
        return html`
            <center>
                <h1>This video is playing over IPFS!</h1>
                <video
                    ${ref(this.videoPlayerRef)}
                    playsinline
                    controls
                    autoplay
                    muted="muted"
                >
                    <source src="${this.videoMeta.value.src}" type="video/webm">
                    Your browser does not support the video tag.
                </video>
            </center>
        `;
    }
}