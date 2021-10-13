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

var presentTime;
var pastTime;
// get more refined searches when company's ticker is searched
var company = "aapl"
// $("input").val()
// fetch call function from inputs 
var newsAPIURL = `https://newsapi.org/v2/everything?q=${company}&from=2021-9-15&to=2021-10-11&sortBy=popularity&apiKey=9b854ba91e734d3ca1e59cd723393af2`

// fetchNews grabs news for specific search
var newsFeed = []
function fetchNews() {
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

fetchNews()