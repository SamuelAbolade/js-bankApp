var xValues = ["Out", "In"];
var yValues = [1, 1];
var barColors = [
    "#b91d47",
    "#00aba9",
];

new Chart("analyticsChart", {
    type: "doughnut",
    data: {
        labels: xValues,
        datasets: [{
            backgroundColor: barColors,
            data: yValues
        }]
    },
  options: {
        title: {
            display: false,
            text: "Analytics chart"
        }
    }
});