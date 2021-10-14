
var pastTime;
// get more refined searches when company's ticker is searched
// var company;
// var newsType;
// fetch call function from inputs 
// var newsAPIURL = `https://newsapi.org/v2/${newsType}?q=${company}&from=2021-9-15&to=2021-10-11&sortBy=popularity&apiKey=9b854ba91e734d3ca1e59cd723393af2`
// fetchNews grabs news for specific search
var $form = $("#form")

function fetchNews(event) {
    event.preventDefault()
    var newsFeed = []
    var newsType = "everything"
    var company = $("#searchBar").val()
    searchNews()
    var newsAPIURL = `https://newsapi.org/v2/${newsType}?q=${company}&from=2021-9-15&to=2021-10-11&sortBy=popularity&apiKey=9b854ba91e734d3ca1e59cd723393af2`
    fetch(newsAPIURL)
    .then (function(response) {
        return response.json()
    })
    // function to loop through data and pull information
    .then(function(data) {
        var newsArticles = data.articles
        console.log(newsArticles)
        for (var i = 0; i < newsArticles.length; i++) {
            var title = {}
            title.articleTitle = newsArticles[i].title
            if (title.articleTitle.includes(company)) {
                console.log(title.articleTitle)
            }
            title.articleDate = newsArticles[i].publishedAt
            title.articleDescription = newsArticles[i].description
            title.articleAuthor = newsArticles[i].author
            title.articleURL = newsArticles[i].url
            newsFeed.push(title)
        }
        localStorage.setItem("company", JSON.stringify(newsFeed))
        console.log(newsFeed)

    })
}

function fetchStocks() {
    var stockOpen = []
    var stockClose = []
    var company = $('#searchBar').val()
    var stockAPIURL= `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&apikey=CNK6ZW6SKIWY6TEE&symbol=${company}&interval=60min&outputsize=full`
    fetch(stockAPIURL)
    .then (function(response) {
        return response.json()
    })
    .then (function(data) {
        var stockData = []
        for (var keys in data['Time Series (60min)']) {
            data['Time Series (60min)'][keys].time = keys
            stockData.push(data['Time Series (60min)'][keys])
        }

        for (var i = 15; i < 352; i += 16) {
            var stock = {}
            stock.stockOpen = stockData[i]['1. open']
            stockOpen.push(stock)
        }
        for (var i = 0; i < 352; i += 16) {
            var stock2 ={}
            stock2.stockClose = stockData[i]['4. close']
            stockClose.push(stock2)
        }

        changeData(stockOpen, stockClose)
    })
}

var companySearches = []
function searchNews() {
    var company = $("#searchBar").val()
    company.trim()
    var companyHistory = $("#stock-options")
    if (company.length > 0 && companySearches.indexOf(company) === -1) {
        companySearches.push(company)
        localStorage.setItem("company", JSON.stringify(company))
        companyHistory.append(
            $("<option>")
                .addClass()
                .attr("class", "recentSearch")
                .text(company)
        )
        $("#searchBar").val("")
        console.log(companySearches)
        console.log(company)
    }
}


const labels = [
    
    // If we want to change the values of the x-axis
];

var dates = future
for ( var i = 30; i > 0; i--) {
    var future = new Date();
    future.setDate(future.getDate() - i)
    labels.push(future)
    }


const data = {
    labels: labels,
    datasets: [{
    label: 'S&P 500',
    // if we want to change the title of the chart/line. Most likely take the data from fetch call and insert the stock name and the date taken from api data.
    backgroundColor: 'rgb(255, 99, 132)',
    borderColor: 'rgb(255, 99, 132)',
    data: [],
    // data values are not true, need to change to reflect the values given by stock api. grab the values for the day and insert it into the array.
    // y-axis will reflect to show a range starting a little below the first value and ending a little above the highest value
    }]
};

const config = {
    type: 'line',
    data: data,
    options: {
        plugins: {
            tooltip: {
                callbacks: {
                    afterBody: function() {
                        return 'Hi';
                        // if we want to add any text to the tooltips enter here or we can delete if nothing needs to be added.
                    }
                }
            }
        }
    }
};

function changeData(openValue) {
    // openVAlue[i].stockOpen ==> [140.04, 104.96, ...]
    // empty data array first to have a fresh chart, then push the stockopen value into the data array
    stockFigure.data.datasets[0].data = [];

    for (var i = 0; i < openValue.length; i++) {
    stockFigure.data.datasets[0].data.push(openValue[i].stockOpen)
    }
stockFigure.update();   
}

var stockFigure = new Chart(
    document.getElementById('stockFigure'),
    config
);



$form.on("submit", fetchStocks)
$form.on("submit", fetchNews)