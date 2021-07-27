const init = () => {
    const fetcher = (url) => fetch(url).then(r => r.json());

    const repositoriesURL = `https://api.github.com/users/hsanJaballi/repos`;

    const onSuccess = (response) => {

        const target = document.getElementById(`repositories-items`);

        console.log(response);
        
        response.map((o, i) => {
            const el = document.createElement(`repository-item`);
            el.setAttribute(`rname`, o.name);
            el.setAttribute(`rdescription`, o.description);
            if (i === 0) {
                el.setAttribute(`isOpen`, `true`);
            } else {
                el.setAttribute(`isOpen`, `false`);
            }
            target.appendChild(el);
        })

    }

    const onFailure = (reason) => {
        console.warn(reason.message);
    }

    fetcher(repositoriesURL).then(onSuccess).catch(onFailure);
}

window.onload = init