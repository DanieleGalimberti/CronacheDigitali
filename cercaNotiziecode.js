const dataAInput= document.getElementById('dataA');
const dataDaInput = document.getElementById('dataDa');

const dataCorrente = new Date().toISOString().split('T')[0];
dataAInput.max = dataCorrente;
dataDaInput.max = dataCorrente;

document.getElementById('dataDa').addEventListener('change', function () {
    const dataDaValue = this.value;
    document.getElementById('dataA').min = dataDaValue;
});

let urlCompleto = " ";
if (Cerca()) {
    fetchData(urlCompleto);
}

function Cerca(event) {
    event.preventDefault();

    const testoRicerca = document.getElementById('testoInput').value;
    const fonti = Array.from(document.getElementById('menuSelezionabile').selectedOptions).map(opz => opz.value);

    let doveCercare;
    const bottoniRicerca = document.getElementsByName('selezioneDoveRicerca');
    for (const bott of bottoniRicerca) {
        if (bott.checked) {
            doveCercare = bott.value;
            break;
        }
    }

    let ordinaPer;
    const bottoniOrdina = document.getElementsByName('selezioneOrdinamento');
    for (const bott of bottoniOrdina) {
        if (bott.checked) {
            ordinaPer = bott.value;
            break;
        }
    }

    const dataDa = document.getElementById('dataDa').value;
    const dataA = document.getElementById('dataA').value;

    const form = document.querySelector('form');
    let ris = false;
    if (form.checkValidity()) {
        ris = prendiDati(testoRicerca, fonti, doveCercare, ordinaPer, dataDa, dataA);
    }

    if (ris) {
        fetchData(urlCompleto);
    }
}

function prendiDati(testoRicerca, fonti, doveCercare, ordinaPer, dataDa, dataA) {
    var apiKey = window.config.apiKey;
    const ulrBase = `https://newsapi.org/v2/everything?q=${encodeURIComponent(testoRicerca)}&language=it&sortBy=${ordinaPer}&searchIn=${doveCercare}&apiKey=${apiKey}`;
    const parametriAggiuntivi = new URLSearchParams();
    let uriConParametri = " ";
    if (dataDa != "") {
        parametriAggiuntivi.append('from', dataDa)
    }
    if (dataA != "") {
        parametriAggiuntivi.append('to', dataA)
    }
    if (fonti != "") {
        parametriAggiuntivi.append('domains', sistemaFonti(fonti))
    }

    if (parametriAggiuntivi.toString() !== "") {
        urlCompleto = `${ulrBase}&${parametriAggiuntivi.toString()}`;
    } else {
        urlCompleto = ulrBase;
    }
    return true;
}

function sistemaFonti(fonti) {
    let fontiString = " ";
    for (let i = 0; i < fonti.length; i++) {
        fontiString += fonti[i];
        if (i < fonti.length - 1) {
            fontiString += ",";
        }
    }
    return fontiString;
}
async function fetchData(url) {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Errore HTTP! Status: ${response.status}`);
        }

        const data = await response.json();
        const articles = data.articles;

        const newsList = document.getElementById('newsList');
        newsList.innerHTML = '';

        if (articles.length === 0) {
            const noResultsMessage = document.createElement('p');
            noResultsMessage.textContent = 'Nessun risultato trovato.';
            newsList.appendChild(noResultsMessage);
        } else {
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
        }
    } catch (error) {
        console.error('Errore nella richiesta:', error);
        document.getElementById('newsList').textContent = 'Errore nel recupero delle notizie.';
    }
}
