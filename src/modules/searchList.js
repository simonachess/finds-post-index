
const searchList = () => {

    const buttonClearHistory = document.createElement('button');
    buttonClearHistory.innerHTML = "Išvalyti istoriją";
    buttonClearHistory.classList.add('btn', 'btn-warning', 'hidden');
    document.querySelector('section .card-body').appendChild(buttonClearHistory);
    buttonClearHistory.addEventListener('click', () => {
        localStorage.clear();
        window.location.reload();
    })

    document.querySelector('.history').addEventListener('click', () => {

        for (let key in localStorage) {
            if (localStorage.getItem(key) !== null) {
                let result = JSON.parse(localStorage.getItem(key));
                const li = document.createElement('li');
                li.className = 'list-group-item';
                li.textContent = `Adresas: ${result.address}. Pašto kodas: ${result.post_code}`
                document.querySelector('ul').appendChild(li);

            }
            buttonClearHistory.classList.remove('hidden');
        }

    });


}

export default searchList