const ajaxService = (term) => {
    const url = "https://api.postit.lt/?term=";
    const key = "NiW3hV5TvdWIt6yBE7gs";
    return fetch(`${url}${term}&key=${key}`)
        .then(response => response.json())
}

export default ajaxService;