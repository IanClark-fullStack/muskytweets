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
    var newsAPIURL = `https://newsapi.org/v2/${newsType}?q=${company}&from=2021-9-15&to=2021-10-11&sortBy=popularity&apiKey=9b854ba91e734d3ca1e59cd723393af2`
    fetch(newsAPIURL)
    .then (function(response) {
        return response.json()
    })
    // function to loop through data and pull information
    .then(function(data) {
        console.log(data)
        var newsArticles = data.articles
        console.log(newsArticles)
        for (var i = 0; i < newsArticles.length; i++) {
            var title = {}
            title.articleTitle = newsArticles[i].title
            title.articleDate = newsArticles[i].publishedAt
            title.articleDescription = newsArticles[i].description
            title.articleAuthor = newsArticles[i].author
            title.articleURL = newsArticles[i].url
            newsFeed.push(title)
        }
        console.log(newsFeed)

    })
}
$form.on("submit", fetchNews)



var stockAPIURL= 'https://www.alphavantage.co/query?apikey=KUCB9G0KGR5RT892&function=TIME_SERIES_INTRADAY&symbol=' + company + '&interval=60min&outputsize=full'

var stockOpenDate = []
var stockClose = []

function fetchStocks() {
    fetch(stockAPIURL)
    .then (function(response) {
        return response.json()
    })
    .then (function(data) {
        console.log(data['Time Series (60min)'])
        var stockData = []
        for (var keys in data['Time Series (60min)']) {
            data['Time Series (60min)'][keys].time = keys
            stockData.push(data['Time Series (60min)'][keys])
        }
        console.log(stockData)

        for (var i = 15; i < 352; i += 16) {
            var stock = {}
            stock.stockOpen = stockData[i]['1. open']
            stock.stockDate = stockData[i]['time']
            stockOpenDate.push(stock)
        }
        for (var i = 0; i < 352; i += 16) {
            var stock2 ={}
            stock2.stockClose = stockData[i]['4. close']
            stock2.stockDate = stockData[i]['time']
            stockClose.push(stock2)
        }
        console.log(stockOpenDate)
        console.log(stockClose)
    })
}

fetchStocks()

const labels = [
    '9AM',
    '10AM',
    '11AM',
    '12PM',
    '1PM',
    '2PM',
    '3PM',
    '4PM',
    '5pm',
    '6pm',
    // If we want to change the values of the x-axis
];
const data = {
    labels: labels,
    datasets: [{
    label: '*Stock Name* + *Date*',
    // if we want to change the title of the chart/line. Most likely take the data from fetch call and insert the stock name and the date taken from api data.
    backgroundColor: 'rgb(255, 99, 132)',
    borderColor: 'rgb(255, 99, 132)',
    data: [802.61, 809.51, 809.10, 803.11, 808.68, 804.48, 806.00, 807.67, 805.60],
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

var stockFigure = new Chart(
    document.getElementById('stockFigure'),
    config
);


stockFigure.canvas.parentNode.style.height = '1000px';
stockFigure.canvas.parentNode.style.width = '1000px';
// change the sizing using this 





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


$form.on("submit", fetchNews)

=======

