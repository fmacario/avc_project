// References
var database = firebase.database(); // database service

var myParam = location.search.split('param=')[1]
myParamSpace = myParam.replace('_', ' ');

var templatesRef = database.ref("patients/" + myParamSpace + "/ptemplatesdone/");

templatesRef.once("value", function (snapshot) {
    snapshot.forEach(function (childSnapshot) {
        updateGraphValues(childSnapshot.val().templatename, childSnapshot.val().tempo);
    });

    createGraph();
});

var templatenames = [];
var tempo = [];
function updateGraphValues(templatename, tempos) {
    templatenames.push(templatename);

    var tempoMin = tempos.split('.');
    var tempoNew = tempoMin[0] + '.' + tempoMin[1];
    tempo.push(tempoNew)
}

function createGraph() {
    var ctx = document.getElementById("lineChart");
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: templatenames,
            datasets: [
                {
                    label: "Tempo de resposta",
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: "rgba(75,192,192,0.4)",
                    borderColor: "rgba(75,192,192,1)",
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: "rgba(75,192,192,1)",
                    pointBackgroundColor: "#fff",
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "rgba(75,192,192,1)",
                    pointHoverBorderColor: "rgba(220,220,220,1)",
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: tempo,
                    spanGaps: false,
                }
            ]
        },

        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    })
}

