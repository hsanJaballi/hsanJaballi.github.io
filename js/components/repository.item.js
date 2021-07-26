const repositoryTemplate = document.createElement(`template`);

repositoryTemplate.innerHTML = `
    <style>
        #toggle {
            background-color: red;
        }
    </style>
    <div class="repository-item">
        <div class="highlights">
            <span id="repository-name"></span>
            <span id="toggle">toggle</span>
        </div>
        <div id="details">
            <p id="repository-description"></p>
        </div>
    </div>
`;

class RepositoryItem extends HTMLElement {
    constructor () {
        super();

        this.attachShadow({mode: `open`});

        this.shadowRoot.appendChild(repositoryTemplate.content.cloneNode(true))
        
    }

    static observedAttributes () {
        return [`rname`, `rdescription`, `open`];
    }

    connectedCallback() {
        const name = this.shadowRoot.getElementById(`repository-name`);
        const description = this.shadowRoot.getElementById(`repository-description`);

        const toggle = this.shadowRoot.getElementById(`toggle`);

        toggle.addEventListener(`click`, (event) => {
            this.setAttribute(`open`, !(this.getAttribute(`open`).length))
            console.log(`currently ${this.getAttribute(`open`)}`)
        })
        this.setAttribute(`open`, ``)
        
        name.textContent = this.rname;
        description.textContent = this.rdescription;
    }
    
    /*
    attributeChangedCallback(name, oldValue, newValue) {
        
    }
    */

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

    get open() {
        return this.getAttribute(`open`);
    }

    set open(nextValue) {
        this.setAttribute(`open`, nextValue);
    }
}

window.customElements.define(`repository-item`, RepositoryItem);