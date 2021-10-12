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