const repositoryTemplate = document.createElement(`template`);

repositoryTemplate.innerHTML = `
    <style>
        #toggle {
            background-color: red;
        }
        .is-closed {
            display: none;
        }
        .highlights {
            display: flex;
            width: max-content;
            flex-direction: row-reverse;
        }
    </style>
    <div class="repository-item">
        <div class="highlights">
            <span id="repository-name"></span>
            <span id="icon-wrapper">
                <arrow-icon adirection="left">
            </span>
        </div>
        <div id="details" class="is-closed">
            <p id="repository-description"></p>
        </div>
    </div>
`;

class RepositoryItem extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: `open` });


        this.shadowRoot.appendChild(repositoryTemplate.content.cloneNode(true))
    }

    static observedAttributes() {
        return [`rname`, `rdescription`, `isOpen`];
    }

    connectedCallback() {
        const name = this.shadowRoot.getElementById(`repository-name`);
        const description = this.shadowRoot.getElementById(`repository-description`);
        const iconWrapper = this.shadowRoot.getElementById(`icon-wrapper`);
        const arrowIcon = iconWrapper.getElementsByTagName(`arrow-icon`)[0];
        const detailsContainer = this.shadowRoot.getElementById(`details`);

        iconWrapper.addEventListener(`click`, (event) => {
            if (this.getAttribute(`isOpen`) === `true`) {
                this.setAttribute(`isOpen`, `false`);
                arrowIcon.adirection = "left";
                detailsContainer.classList.add(`is-closed`);
            } else {
                this.setAttribute(`isOpen`, `true`);
                arrowIcon.adirection = "down";
                detailsContainer.classList.remove(`is-closed`);
            }
        })
        console.log(`got >> ${this.getAttribute(`isopen`)}`)

        if (this.getAttribute(`isopen`) === `true`) {
            arrowIcon.setAttribute(`adirection`, `down`);
            detailsContainer.classList.remove(`is-closed`);
        }

        console.log(this.isOpen)

        name.textContent = this.rname;
        description.textContent = this.rdescription;
    }

    get rname() {
        return this.getAttribute(`rname`);
    }

    set rname(nextValue) {
        this.setAttribute(`rname`, nextValue);
    }

    get rdescription() {
        return this.getAttribute(`rdescription`);
    }

    set rdescription(nextValue) {
        this.setAttribute(`rdescription`, nextValue);
    }

    get isOpen() {
        return this.getAttribute(`isOpen`);
    }

    set isOpen(nextValue) {
        this.setAttribute(`isOpen`, nextValue);
        /*
        switch(nextValue) {
            case `false`:
                arrowIcon.adirection = `left`;
                break;
            case `true`:
                arrowIcon.adirection = `down`;
                break;
            default:
                arrowIcon.adirection = `left`;
        }
        */
    }
}

window.customElements.define(`repository-item`, RepositoryItem);