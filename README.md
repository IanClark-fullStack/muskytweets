# muskytweets
* HTML - https://ianclark-fullstack.github.io/muskytweets/
* Snippet - <img src="./assets/snippet.png" alt="musky tweets home page">

## Goals
* Wire Frame and implement HTML with TailwindCSS
* Use two API fetch calls to pull and minipulate Data
* Use Chart.JS to show stock api
* Make HTML interactive 
* Save inputs into local storage
* Dom manipulation with news api and stock api


### Wire Frame
* wire frame what the application should look like
<img src="./assets/wireframe.png" alt="wire frame of the html">

#### Fetch Calls
```
var newsFeed = []
    $('#news-container').empty()
    searchNews()

    var newsAPIURL = `https://newsapi.org/v2/${newsType}?q=${company}&from=${today}&to=${`${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()}`}&sortBy=popularity&apiKey=14abb4c1b5de4b2e974aea79db9937e5`
    console.log(newsAPIURL)
    fetch(newsAPIURL)
    .then (function(response) {
        return response.json()
    })
    // function to loop through data and pull information
    .then(function(data) {
        var newsArticles = data.articles
        for (let i = 0; i < newsArticles.length; i++) {
            var title = {}
            title.articleTitle = newsArticles[i].title
            if (title.articleTitle.includes(company)) {
                console.log(title.articleTitle)
            }
```

##### Chart.JS
```
const config = {
    type: 'line',
    data: data,
    options: {
        plugins: {
            tooltip: {
                callbacks: {
                    afterBody: function() {
                        for (var i=0; i<stockOpen.length; i++) {
                            var open = stockOpen[i];
                            var close = stockClose[i];
                            console.log(open);
                            return `open: ${open.stockOpen} close: ${close.stockClose}`;
                        }
                        // if we want to add any text to the tooltips enter here or we can delete if nothing needs to be added.
                    }
                }
            }
        }
    }
};
```

###### HTML Interactive 
```
$form.on("submit", function(event) {
    event.preventDefault();
    fetchStocks($("#searchBar").val())
    fetchNews($("#searchBar").val())
})

// on click change back to recent search
$("#stock-options").on("change", function (event) {
    var company = $("#stock-options").val()
    console.log(company)
    fetchNews(company)
    fetchStocks(company)
})
```



###### Dom manipulation / local storage
* Add inputs and recent searches
```
function searchNews() {
    company = $("#searchBar").val()
    company.trim()
    if (company.length > 0 && companySearches.indexOf(company) === -1) {
        companySearches.push(company)
        localStorage.setItem("company", JSON.stringify(companySearches))
        companyHistory.append(
            $("<option>")
                .addClass()
                .attr("class", "recentSearch")
                .text(company)
        )


    }
}
```





