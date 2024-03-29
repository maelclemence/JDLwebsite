function sanitizeAnibisItems(anibis) {
    console.log("anibis : ", anibis)
    var results = [];
    var arrayLength = anibis.length;
    for (var i = 0; i < arrayLength; i++) {
        article = anibis[i];
        var image = "../../img/goose.png";
        try {
            const baseUrl = article.imageData.baseUrl;
            const size   =  "/?380x285/0/60/";
            const first_image   = article.imageData.images[0].substring(9);
            image = baseUrl + size + first_image;
        } catch (error) {
            console.log("error : ", error)
        }
        results.push({
            "title": article.title,
            "price": article.price,
            "name": article.category.name,
            "image": image,
            "url": `https://www.anibis.ch${article.url}`, 
            "platform": "anibis"
        })
    }
    return results;
}

function sanitizeRicardoItems(ricardo) {
    var result = [];
    var arrayLength = ricardo.length;
    for (var i = 0; i < arrayLength; i++) {
        article = ricardo[i];
        result.push({
            "title": article.title,
            "price": article.buyNowPrice,
            "name": article.title,
            "image": "../../img/goose.png",
            "url": "https://www.ricardo.ch/fr/c/o/antiquites-et-arts-38399/",
            "platform": "ricardo"
        })
    }
    return result;
}

function sanitizeDepopItems(depop) {
    result = [];
    for (var i = 0; i < depop.length; i++) {
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

function addArticles(articles) {
    console.log('Adding articles...');
    for (var i = 0; i < articles.length; i++) {
        const article = articles[i];
        html = `
            <div class="col">
              <div class="card shadow-sm">
                <img src=${article.image} alt="Image de l'article">
                <div class="card-body">
                  <p class="card-text">${article.title}</p>
                  <div class="d-flex justify-content-between align-items-center">
                    <div class="btn-group">
                      <a class="btn btn-primary my-2" href="${article.url}" target="_blank">View</a>
                      <a class="btn btn-secondary my-2" href="https://jeudeloie.ch" target="_blank">JDL</a>
                    </div>
                    <small class="text-muted">${article.platform}</small>
                  </div>
                </div>
              </div>
            </div>
        `;
        document.getElementById("all_articles").innerHTML += html;
    }
}

async function fetchData() {
    console.log('Fetching data...');
    let anibisPromise = new Promise(
        (resolve, reject) => {
            setTimeout(() => {
                let results = fetchFromAnibis("shampoo");
                resolve(results);
            }, 300);
        }
    );

    anibisPromise.then(
        function(results) {
            console.log('Adding Anibis articles...', results);
            addArticles(results);
        },
        function(err) {
            console.log('Error fetching from Anibis : ', err);
        }
    );

    let ricardoPromise = new Promise(
        (resolve, reject) => {
            setTimeout(() => {
                let results = fetchFromRicardo("shampoo");
                resolve(results);
            }, 300);
        }
    );

    ricardoPromise.then(
        function(results) {
            console.log('Adding Ricardo articles...', results);
            addArticles(results);
        },
        function(err) {
            console.log('Error fetching from Ricardo : ', err);
        }
    );

    let depopPromise = new Promise(
        (resolve, reject) => {
            setTimeout(() => {
                let results = fetchFromDepop("shampoo");
                resolve(results);
            }, 300);
        }
    );

    depopPromise.then(
        function(results) {
            console.log('Adding Depop articles...', results);
            addArticles(results);
        },
        function(err) {
            console.log('Error fetching from Depop : ', err);
        }
    );
}

async function fetchFromAnibis(recherche) {
    return fetch(`https://attach-cors.herokuapp.com/https://api.anibis.ch/v4/fr/search/listings?cun=toutes-les-rubriques&fcun=toutes-les-rubriques&fts=fraise&pr=1`)
                            .then(response => response.json())
                            .then(data => sanitizeAnibisItems(data.listings))
}
    // "sec-fetch-dest": "empty",
    // "sec-fetch-mode": "cors",
    // "sec-fetch-site": "same-site"
  
async function fetchFromRicardo() {
    return fetch("https://attach-cors.herokuapp.com/https://www.ricardo.ch/api/mfa/categories/38399/promo-offers")
                            .then(response => response.json())
                            .then(data => sanitizeRicardoItems(data))
}

async function fetchFromDepop() {
    return fetch("https://attach-cors.herokuapp.com/https://webapi.depop.com/api/v2/search/products/?categories=9&itemsPerPage=24&country=gb&currency=GBP&sort=relevance")
        .then(response => response.json())
        .then(data => sanitizeDepopItems(data.products))
}
