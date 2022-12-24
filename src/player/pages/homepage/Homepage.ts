import { css, CSSResultGroup, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

import 'zero-md';
const ASSET_URL = 'https://raw.githubusercontent.com/whizzzkid/yt-dl-ipfs/main';

@customElement('home-page')
export default class Homepage extends LitElement {
    static styles?: CSSResultGroup = css`
        zero-md {
            text-align: left;
            padding: 5%;
            max-width: 600px;
        }
    `;

    render() {
        return html`<zero-md src="${ASSET_URL}/README.md">
            <template>
            <style>
                a {
                    text-decoration: none;
                    color: #eee;
                }
            </style>
            </template>
        </zero-md>`;
    }
}
