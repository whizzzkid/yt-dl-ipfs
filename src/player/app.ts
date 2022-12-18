import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

import './pages/homepage/Homepage';
import './pages/IpfsPlayer/IpfsPlayer';

@customElement('ipfs-player-app')
export class App extends LitElement {
    private hash: string = window?.location?.hash.substring(1);

    render() {
        return this.hash ? html`<ipfs-player hash=${this.hash}></ipfs-player>` : html`<home-page></home-page>`;
    }
}
