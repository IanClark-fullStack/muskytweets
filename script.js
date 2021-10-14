
var pastTime;
var $form = $("#form")
var company = $("#searchBar").val()
var newsType = "everything"
var today = new Date();
var lastMonth = yyyy+"-"+mm-1+"-"+dd;
var dd = today.getDate();
var mm = today.getMonth()+1;
var yyyy = today.getFullYear();

function fetchNews(event) {
    event.preventDefault()
    // Create ISO Time 
    if(dd<10) {dd='0'+dd;}
    if (mm<10){mm='0'+mm;}
    today=yyyy+"-"+mm+"-"+dd+"-";
    // newsType = "everything"
    company = $("#searchBar").val()
    populateNews(company)
}
function populateNews(company) {
    var newsFeed = []
    $('#news-container').empty()
     searchNews()

    var newsAPIURL = `https://newsapi.org/v2/${newsType}?q=${company}&from=${today}&to=${lastMonth}&sortBy=popularity&apiKey=9b854ba91e734d3ca1e59cd723393af2`
    console.log(newsAPIURL)
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
            if (title.articleTitle.includes(company)) {
                console.log(title.articleTitle)
            }
            title.articleDate = newsArticles[i].publishedAt
            title.articleDescription = newsArticles[i].description
            title.articleAuthor = newsArticles[i].author
            title.articleURL = newsArticles[i].url
            newsFeed.push(title)
            var newsContainer = $('#news-container');
            var newNewsArticle = $('<article>');
            newNewsArticle.attr('class', 'my-2 w-4/6');
            newsContainer.append(newNewsArticle);
            var newsTitle = $(`<h6 class="text-gray-200 text-2xl block">${title.articleTitle}</h6>
            <a class="cursor-pointer block my-1" href="${title.articleURL}">${title.articleDate}</a>
            <p class="my-3 text-gray-400">${title.articleDescription}</p>`);
            newNewsArticle.append(newsTitle);

        }
        localStorage.setItem("company", JSON.stringify(newsFeed))
        console.log(newsFeed)
    })
}

var highest = 0;
var lowest = 0;

function fetchStocks() {
    var stockOpen = []
    var stockClose = []
    var company = $('#searchBar').val()
    var stockAPIURL= `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&apikey=CNK6ZW6SKIWY6TEE&symbol=${company}&interval=60min&outputsize=full`
    company = $('#searchBar').val()
    var stockAPIURL= `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&apikey=CNK6ZW6SKIWY6TEE&symbol=${company}&interval=60min&outputsize=full`


    // console.log(company)


    // console.log (stockAPIURL)
    fetch(stockAPIURL)
    .then (function(response) {
        return response.json()
    })
    .then (function(data) {
        var stockData = []
        // console.log(data)
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
         // Loop Created to Obtain the Highest and Lowest Values of Stock Close
        var stockValley = stockClose[0].stockClose;
        var stockPeak = stockClose[0].stockClose;
        for (var i=0; i<stockClose.length; i++) {
            var startVal = stockClose[i].stockClose;
            if (startVal > stockPeak) {
                stockPeak = startVal; 
                highest += stockPeak; 
            }
            if (startVal < stockValley) {
                stockValley = startVal;
                lowest += stockValley;
            }
        }
        var setPeak = $('#peak');
        setPeak.text(stockPeak);
        var setValley = $('#valley');
        setValley.text(stockValley);
        
        console.log(stockOpen)
        console.log(stockClose)
    })
}


var companySearches = []
function searchNews() {
    company = $("#searchBar").val()
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
        // $("#searchBar").val("")
        // console.log(companySearches)
        // console.log(company)
    }
}


const labels = [
    
    // If we want to change the values of the x-axis
];

var dates = future
for ( var i = 30; i > 0; i--) {
    var future = new Date();
    future.setDate(future.getDate() - i)
    // console.log(future)
    labels.push(future.toLocaleDateString())
    }
    


const data = {
    labels: labels,
    datasets: [{
    label: 'Stock',
    // if we want to change the title of the chart/line. Most likely take the data from fetch call and insert the stock name and the date taken from api data.
    backgroundColor: 'rgb(255, 99, 132)',
    borderColor: 'rgb(255, 99, 132)',
    data: [],
    // data values are not true, need to change to reflect the values given by stock api. grab the values for the day and insert it into the array.
    // y-axis will reflect to show a range starting a little below the first value and ending a little above the highest value
    }]
};
// console.log(data);


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
                           
                            return `open: ${open.stockOpen} close: ${close.stockClose}`;
                        }
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

function init() {
    company = "tsla"
    newsType = "top_headlines"
    // adjust parameters before function call
    populateNews(company)
    // fetchStock with the company part set to SPY
    // localStorage.get to pull recent searches and put them as options
}


// init()

$form.on("submit", fetchStocks)
$form.on("submit", fetchNews)