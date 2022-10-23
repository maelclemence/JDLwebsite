function showRandomAnibis(anibis) {
    console.log("anibis : ", anibis)
    return [{
        "title": anibis.title,
        "price": anibis.price,
        "name": anibis.category.name,
        "image": "",
        "url": "https://www.anibis.ch/fr", 
        "platform": "anibis"
    }]
}

function showRandomRicardo(ricardo) {
    console.log("Ricardo ", ricardo)
    var result = [];
    var arrayLength = ricardo.length;
    for (var i = 0; i < arrayLength; i++) {
        article = ricardo[i];
        result.push({
            "title": article.title,
            "price": article.buyNowPrice,
            "name": article.title,
            "image": "",
            "url": "https://www.ricardo.ch/fr/c/o/antiquites-et-arts-38399/",
            "platform": "ricardo"
        })
    }
    return result;
}

function showRandomDepop(depop) {
    console.log("Depop : ", depop)
    result = [];
    var arrayLength = depop.length;
    for (var i = 0; i < arrayLength; i++) {
        article = depop[i]
        result.push({
            "title": article.slug,
            "price": article.price,
            "name": article.title,
            "image": article.preview["150"],
            "url": "https://www.depop.com/",
            "platform": "depop"
        })
    }
    return result;
}

async function fetchData() {
    await Promise.all([fetchFromAnibis(), fetchFromRicardo(), fetchFromDepop()])
        .then(values => {
            console.log("Values : ", values)

        });
    const anibis = fetchFromAnibis();
    const ricardo = fetchFromRicardo();
    const depop = fetchFromDepop();
    const fetched_results = [await anibis, await ricardo, await depop];
    const results = fetched_results.flat();
    for (var i = 0; i < results.length; i++) {
        addArticle(results[i]);
    }
}

function addArticle(article) {
    console.log("addArticle : ", article)
    html = `
        <div class="col">
          <div class="card shadow-sm">
            <img src=${article.image} alt="Image de l'article">

            <div class="card-body">
              <p class="card-text">${article.title}</p>
              <div class="d-flex justify-content-between align-items-center">
                <div class="btn-group">
                  <a class="btn btn-success" href="${article.url}" target="_blank">View</a>
                  <a class="btn btn-success" href="https://jeudeloie.ch" target="_blank">JDL</a>
                </div>
                <small class="text-muted">${article.platform}</small>
              </div>
            </div>
          </div>
        </div>
    `;
    document.getElementById("all_articles").innerHTML += html;
}

async function fetchFromAnibis() {
    return fetch("https://attach-cors.herokuapp.com/https://api.anibis.ch/v4/fr/search/listings?cun=toutes-les-rubriques&fcun=toutes-les-rubriques&fts=clavier&pr=1", {
                                "headers": {
                                    "accept": "application/json",
                                    "accept-language": "en-GB,en-US;q=0.9,en;q=0.8,fr;q=0.7",
                                    // "content-type": "application/json",
                                    "sec-ch-ua": "\"Chromium\";v=\"106\", \"Google Chrome\";v=\"106\", \"Not;A=Brand\";v=\"99\"",
                                    "sec-ch-ua-mobile": "?0",
                                    "sec-ch-ua-platform": "\"Linux\"",
                                },
                                "referrer": "https://www.anibis.ch/fr/c/toutes-les-rubriques?fts=clavier",
                                "referrerPolicy": "unsafe-url",
                                "body": null,
                                "method": "GET",
                                "mode": "cors",
                                "credentials": "omit"
                            })
                            .then(response => response.json())
                            .then(data => showRandomAnibis(data.listings[0]))
}

async function fetchFromRicardo() {
    return fetch("https://attach-cors.herokuapp.com/https://www.ricardo.ch/api/mfa/categories/38399/promo-offers", {
                                    "headers": {
                                        "accept": "application/json, text/plain, */*",
                                        "accept-language": "en-GB,en-US;q=0.9,en;q=0.8,fr;q=0.7",
                                        "sec-ch-ua": "\"Chromium\";v=\"106\", \"Google Chrome\";v=\"106\", \"Not;A=Brand\";v=\"99\"",
                                        "sec-ch-ua-mobile": "?0",
                                        "sec-ch-ua-platform": "\"Linux\"",
                                    },
                                    "referrer": "https://www.ricardo.ch/fr/c/o/antiquites-et-arts-38399/",
                                    "referrerPolicy": "unsafe-url",
                                    "body": null,
                                    "method": "GET",
                                    "mode": "cors",
                                    "credentials": "omit"
                            })
                            .then(response => response.json())
                            .then(data => showRandomRicardo(data))
}

async function fetchFromDepop() {
    return fetch("https://attach-cors.herokuapp.com/https://webapi.depop.com/api/v2/search/products/?categories=9&itemsPerPage=24&country=gb&currency=GBP&sort=relevance", {
        "headers": {
          "accept": "application/json, text/plain, */*",
          "accept-language": "en-GB,en-US;q=0.9,en;q=0.8,fr;q=0.7",
          "sec-ch-ua": "\"Chromium\";v=\"106\", \"Google Chrome\";v=\"106\", \"Not;A=Brand\";v=\"99\"",
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": "\"Linux\"",
        },
        "referrer": "https://www.depop.com/",
        "referrerPolicy": "unsafe-url",
        "body": null,
        "method": "GET",
        "mode": "cors",
        "credentials": "omit"
      })
        .then(response => response.json())
        .then(data => showRandomDepop(data.products))
}
