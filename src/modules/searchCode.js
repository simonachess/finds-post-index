import ajaxService from "./ajaxService";
import storeSearch from "./storeSearch";

const searchCode = () => {
    document.querySelector('form').addEventListener('submit', (e) => {
        e.preventDefault();
        const searchTerm = document.querySelector('.term').value;
        let searchResponse;
        ajaxService(searchTerm)
            .then(result => searchResponse = result)
            .then(() => console.log(searchResponse))
            .then(() => {
                if (searchResponse.total === 1) {
                    document.querySelector('.result').value = searchResponse.data[0].post_code;
                    storeSearch(searchResponse.data[0].post_code, searchResponse.data[0])
                } else {
                    document.querySelector('main').innerHTML += '<p>Klaida!</p>'
                }
            })
        // .then(result => {
        //     document.querySelector('.result').value = result.data[0].post_code
        // })
    })

    const searchDOM = document.querySelector('input');
    const listDOM = document.getElementById('list');
    const searchAdress = async searchText => {
        const res = await fetch('https://api.postit.lt/?term=Taikos&limit=20&key=postit.lt-examplekey');
        const adressesArr = await res.json();
        console.log(adressesArr.data)
        let matches = adressesArr.data.filter(address => {
            const regex = new RegExp(`^${searchText}`, `gi`);
            return address.address.match(regex) || address.city.match(regex);
        })
        if (searchText.length === 0) {
            matches = [];
            listDOM.innerHTML = '';
        }
        outputHTML(matches);
    }

    const outputHTML = matches => {
        if (matches.length > 0) {
            const html = matches.map(match => `<div>
                <p>${match.address}, ${match.city}, ${match.post_code}
                </p>
            </div>`
            ).join('');
            listDOM.innerHTML = html;
        }
    }
    searchDOM.addEventListener('input', () => searchAdress(searchDOM.value));
}

export default searchCode;