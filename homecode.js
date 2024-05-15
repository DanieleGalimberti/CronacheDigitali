//prima pagina.
var apiKey = window.config.apiKey;
let apiUrl = 'https://newsapi.org/v2/everything?domains=corriere.it&language=it&pageSize=4&apiKey=' + apiKey;
fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        const articles = data.articles;
        const newsList = document.getElementById('newsList');
        newsList.innerHTML = '';

        articles.forEach(article => {
            const listItem = document.createElement('li');

            listItem.innerHTML = `
    <div class="card mb-3">
        <div class="row">
            <div class="col-md-4">
                <img src="${article.urlToImage}" class="card-img" alt="Immagine articolo">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">${article.title}</h5>
                    <p class="card-text">${article.description}</p>
                    <p class="card-text"><small class="text-muted">Autore: ${article.author}</small></p>
                    <p class="card-text"><small class="text-muted">Pubblicata il: ${new Date(article.publishedAt).toLocaleString()}</small></p>
                    <a href="${article.url}" class="btn btn-primary" style="border-radius: 20px;">Leggi di più</a>
                </div>
            </div>
        </div>
    </div>`;
            newsList.appendChild(listItem);
        });


    })
    .catch(error => {
        console.error('Errore nella richiesta:', error);
        document.getElementById('newsList').textContent = 'Errore nel recupero delle notizie.';
});

//fatto randomico
let fatto = "";
fetch("https://uselessfacts.jsph.pl/api/v2/facts/random")
    .then(response => response.json())
    .then(data => {
        fatto = data.text;
        const translationUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(fatto)}&langpair=en|it`;
        return fetch(translationUrl);
    })
    .then(response => response.json())
    .then(data => {
        const testoTradotto = data.matches[0].translation;
        document.getElementById('fattoRandom').textContent = testoTradotto;
    })
    .catch(error => {
        console.error('Errore nella richiesta:', error);
        document.getElementById('fattoRandom').textContent = 'Errore nel caricamento della traduzione.';
    }
    );


//accaduto in questo giorno
const oggi = new Date();
const curiosità = ['', '', '', ''];
const listaAccade = document.getElementById('listaAccade');
const url = `http://numbersapi.com/${oggi.getMonth() + 1}/${oggi.getDate()}/date`;

prendiDati();

async function prendiDati() {
    listaAccade.innerHTML = '';
    for (let i = 0; i < curiosità.length; i++) {

        try {
            const response = await fetch(url);
            const data = await response.text();
            const testoTradotto = await traduci(data);
            const listItem = document.createElement('li');
            listItem.classList.add('list-group-item', 'mb-3');
            listItem.innerHTML = `<p style="border-radius: 10px;">${testoTradotto}</p>`;
            listaAccade.appendChild(listItem);
        } catch (error) {
            console.log(error);
        }
    }
}

function traduci(text) {
    const urlTraduz = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|it`;

    return fetch(urlTraduz)
        .then(response => response.json())
        .then(data => data.matches[0].translation);
}