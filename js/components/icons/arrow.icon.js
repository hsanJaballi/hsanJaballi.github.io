const arrowIconTemplate = document.createElement(`template`);

arrowIconTemplate.innerHTML = `
    <style>
        svg {
            vertical-align: middle;
        }
    </style>
    <div id="icon-container">
    </div>
`;

leftArrowSVG = `
    <svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512" height="22px">
        <title>Caret Back</title>
        <path d="M368 64L144 256l224 192V64z"/>
    </svg>
`;

downArrowSVG = `
    <svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512" height="22px">
        <title>Caret Down</title>
        <path d="M64 144l192 224 192-224H64z"/>
    </svg>
`;

class ArrowIcon extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: `open` });
        this.shadowRoot.appendChild(arrowIconTemplate.content.cloneNode(true));
    }

    static observedAttributes() {
        return [`adirection`];
    }

    connectedCallback() {
        const currentDirectionAttribute = this.getAttribute(`adirection`);
        const iconContainer = this.shadowRoot.getElementById(`icon-container`);
        
        console.log(`>> ${currentDirectionAttribute}`);

        if (!currentDirectionAttribute) {
            this.setAttribute(`adirection`, `left`);
            iconContainer.innerHTML = leftArrowSVG;
        } else if (currentDirectionAttribute === `left`) {
            iconContainer.innerHTML = leftArrowSVG;
        } else if (currentDirectionAttribute === `down`) {
            iconContainer.innerHTML = downArrowSVG;
        }
    }

    get adirection() {
        return this.getAttribute(`adirection`);
    }

    set adirection(nextValue) {
        const iconContainer = this.shadowRoot.getElementById(`icon-container`);
        this.setAttribute(`adirection`, nextValue);
        console.log(nextValue)
        switch (nextValue) {
            case `left`:
                iconContainer.innerHTML = leftArrowSVG;
                break;
            case `down`:
                iconContainer.innerHTML = downArrowSVG;
            default:
                break;
        }
    }
}

window.customElements.define(`arrow-icon`, ArrowIcon);