let input = document.getElementById("search-input");
let button = document.getElementById("search-button");

const onButtonClick = e => {
    // Show results
    let query = document.getElementById("search-input").value;
    fetch(`https://api.tvmaze.com/search/shows?q=${query}`)
    .then(response => response.json())
    .then(data => showResult(data))
    .catch(err => console.log(err));

    // Add query to search history
    let obj = JSON.parse(localStorage.getItem(query.toLowerCase()))
    let date = new Date();
    if (obj == null){
        obj = {
            query: query.toLowerCase(),
            lastSearch : Date.now(),
            numSearch : 1
        };
        localStorage.setItem(query.toLowerCase(), JSON.stringify(obj));
    } else {
        obj["lastSearch"] = Date.now();
        obj["numSearch"] += 1;
        localStorage.setItem(query.toLowerCase(), JSON.stringify(obj));
    }
    document.getElementById("search-input").value = "";
    clear(query);
    
    e.preventDefault();
}

const showResult = results => {
    let resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML="";

    let table = "";
    let row = [];
    for(let i = 0; i < results.length; i++){
        result = results[i]["show"];
        let showTitle = result["name"];
        let showImage = result["image"];
        let showID = result["externals"]["imdb"]
        if(showImage != null) showImage = showImage["medium"];
        else showImage = "";

        if(row.length === 4){
            let rowString = "<div class='row'>";

            for (let col in row){
                rowString += row[col];
            }

            rowString += "</div>"
            table += rowString;
            row = [];
        }

        row.push(`<a class="result col-lg-3 col-sm-6" href=# id="${showID}">
        <div><img src="${showImage}" alt="" class="show-img"></div>
        <p class="show-title">${showTitle}</p>
        </a>`)
    }

    let rowString = "<div class='row'>";

    for (let col in row){
        rowString += row[col];
    }

    rowString += "</div>"
    table += rowString;
    row = [];

    resultsDiv.innerHTML = table;
}

const clear = (query) => {
    input.value = "";
    document.getElementById("dd-menu").innerHTML = "";
    document.getElementById("dd-menu").classList.remove('show');
    document.getElementById("showing").classList.remove('invisible');
    document.getElementById("showing").classList.add('visible');
    document.getElementById("showing").innerHTML = `Showing result for <b>${query}</b>`
}

const getRecommendedWord = (query) => {
    let keys = Object.keys(localStorage),
    words = [], i = keys.length,
    ddMenu = document.getElementById("dd-menu");

    ddMenu.innerHTML = "";

    // Getting search history from localStorage
    while(i--){
        words.push(JSON.parse(localStorage.getItem(keys[i])));
    }

    // Sort search history based on when the last time the word is searched
    words.sort(compareByDate);

    // Sort search history based on number of searches have done in the past
    // words.sort(compareByNumSearch);

    // Membuat object regex dari query
    let regexKey = new RegExp(`^${strToRegex(query)}`)
    
    let match = 0;

    // Search for the first 3 words that starts with query
    for(let i = 0; i < words.length; i++){
        if (words[i]["query"].search(regexKey) != -1){
            ddMenu.innerHTML += `<a class="dropdown-item" href="#">${words[i]["query"]}</a>`;
            match++;
        }
        if(match === 3) break;  // If 3 words are found stop the search
    }

    // If there are matching words --> show recommendation words
    if (match > 0){
        ddMenu.classList.add('show');
        let ddMenuChilds = document.getElementById("dd-menu").children;

        for (let i = 0; i < ddMenuChilds.length; i++){
            ddMenuChilds[i].addEventListener('click', (e) =>{
            e.preventDefault();
            input.value = e.target.innerText;
            button.click();
        });
}
    }
    // Else hide
    else ddMenu.classList.remove('show')
}

const strToRegex = (str) => {
    const specialChars = '.+?^$(){}|\\';
    let regex = "";
    for (let i = 0; i < str.length; i++){
        if(specialChars.indexOf(str[i]) != -1){
            regex += '\\' + str[i];
        }
        else regex += str[i];
    }
    return regex;
}

const compareByDate = (a, b) => {
    if(a["lastSearch"] > b["lastSearch"]) return -1;
    if(a["lastSearch"] = b["lastSearch"]) return 0;
    return 1;
}

const compareByNumSearch = (a, b) => {
    if(a["numSearch"] > b["numSearch"]) return -1;
    if(a["numSearch"] = b["numSearch"]) return 0;
    return 1;
}

// Get recommended words everytime a character is entered
input.addEventListener('keyup', (e) => {
    if(e.keyCode === 13) return;
    getRecommendedWord(input.value.toLowerCase());
})

// Search when button is clicked or enter is pressed
input.addEventListener('keydown', (e) => {
    if(e.keyCode === 13) button.click();
})
button.addEventListener('click', onButtonClick)