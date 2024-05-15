
var apiKey = window.config.apiKey;

function caricaNotizie(paese, listaId) {
    const apiUrl = `https://newsapi.org/v2/top-headlines?country=${paese}&apiKey=${apiKey}`;
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const articles = data.articles;
            const newsList = document.getElementById(listaId);

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
                           <a href="${article.url}" target="_blank" class="btn btn-primary btn-block mt-3" style="border-radius: 20px;">Read More</a>
                       </div>
                     </div>`;

                newsList.appendChild(listItem);
            });
        })
        .catch(error => {
            console.error('Errore nella richiesta:', error);
            document.getElementById(listaId).textContent = 'Errore nel recupero delle notizie.';
        });
}

caricaNotizie('de', 'listaDe');
caricaNotizie('fr', 'listaFr');
caricaNotizie('gb', 'listaGb');
caricaNotizie('nl', 'listaNl');
caricaNotizie('us', 'listaUs');
caricaNotizie('ru', 'listaRu');
