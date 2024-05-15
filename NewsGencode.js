
let categoriaSelez = " ";
var apiKey = window.config.apiKey;

function seleClick(cat) {
    categoriaSelez = cat;
    console.log('Categoria selezionata: ' + categoriaSelez);
    AggiornaNotizie();
}

function AggiornaNotizie() {
    let apiUrl = 'https://newsapi.org/v2/top-headlines?country=it&apiKey=' + apiKey;
    document.body.style.backgroundColor = '#DFC99B';
    switch (categoriaSelez) {
        case "Tutte":
            apiUrl = 'https://newsapi.org/v2/top-headlines?country=it&category=general&apiKey=' + apiKey;
            document.body.style.backgroundColor = '#DFC99B';
            break;
        case "Economia":
            apiUrl = 'https://newsapi.org/v2/top-headlines?country=it&category=business&apiKey=' + apiKey;
            document.body.style.backgroundColor = '#f9cccc';
            break;
        case "Intrattenimento":
            apiUrl = 'https://newsapi.org/v2/top-headlines?country=it&category=entertainment&apiKey=' + apiKey;
            document.body.style.backgroundColor = '#fde3a7';
            break;
        case "Salute":
            apiUrl = 'https://newsapi.org/v2/top-headlines?country=it&category=health&apiKey=' + apiKey;
            document.body.style.backgroundColor = '#a2ded0';
            break;
        case "Scienza":
            apiUrl = 'https://newsapi.org/v2/top-headlines?country=it&category=science&apiKey=' + apiKey;
            document.body.style.backgroundColor = '#e8daef';
            break;
        case "Sport":
            apiUrl = 'https://newsapi.org/v2/top-headlines?country=it&category=sports&apiKey=' + apiKey;
            document.body.style.backgroundColor = '#b3e57c';
            break;
        case "Tecnologia":
            apiUrl = 'https://newsapi.org/v2/top-headlines?country=it&category=technology&apiKey=' + apiKey;
            document.body.style.backgroundColor = '#d6eaf8';
            break;
        default:
            break;
    }
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const articles = data.articles;
            const newsList = document.getElementById('newsList');
            newsList.innerHTML = '';

            articles.forEach(article => {
                const listItem = document.createElement('li');
                listItem.classList.add('list-group-item', 'mb-3');

                listItem.innerHTML = `
                         <div class="row">
                         <div class="col">
                             <h5 class="mb-1">${article.title}</h5>
                             <h1></h1>
                             <small>Pubblicata il: ${new Date(article.publishedAt).toLocaleString()}</small>
                          </div>
                         <div class="col-3 text-center">
                            <a href="${article.url}" target="_blank" class="btn btn-primary btn-block mt-3" style="border-radius: 20px;">Leggi di più</a>
                        </div>
                      </div>`;
                newsList.appendChild(listItem);
            });
        })
        .catch(error => {
            console.error('Errore nella richiesta:', error);
            document.getElementById('newsList').textContent = 'Errore nel recupero delle notizie.';
        });

}
AggiornaNotizie();

