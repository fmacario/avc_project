// References
var database = firebase.database(); // database service

var myParam = location.search.split('param=')[1]
myParamSpace = myParam.replace('_', ' ');

var templatesRef = database.ref("patients/" + myParamSpace + "/ptemplatesdone/categorizacao/");

templatesRef.once("value", function (snapshot) {
    snapshot.forEach(function (childSnapshot) {
            updateGraphValuesCategorias(childSnapshot.val().templatename, childSnapshot.val().tempo, childSnapshot.val().tentativas);
    });

    
    createGraphTempoCategorias();
    createGraphAttemptsCategorias();
});

var templatenamesCat = [];
var temposCat = [];
var attemptsCat = [];


function updateGraphValuesCategorias(templatename, tempo, tentativas) {
    templatenamesCat.push(templatename);

    var tempoMin = tempo.split('.');
    var tempoNew;
   

    if(tempoMin[1] < 10){
        tempoNew = tempoMin[0] + '.' + '0' + tempoMin[1];
    }
    else{
        tempoNew = tempoMin[0] + '.' + tempoMin[1];
    } 

    temposCat.push(tempoNew);
    attemptsCat.push(tentativas);
}

function createGraphTempoCategorias() {

    var ctxTimeCategorizacao = document.getElementById("lineChartTempoCategorizao");
    templatenamesCat.unshift("teste");
    temposCat.unshift(0);
    var chartTimeCategorizacao = new Chart(ctxTimeCategorizacao, {
        type: 'line',
        data: {
            labels: templatenamesCat,
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
                    data: temposCat,
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

function createGraphAttemptsCategorias() {
    var ctxTentativasCategorias = document.getElementById("lineChartAttemptsCategorias");
    var ctxTentativasCategorias = new Chart(ctxTentativasCategorias, {
        type: 'line',
        data: {
            labels: templatenamesCat,
            datasets: [
                {
                    label: "Tentativas de resposta",
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
                    data: attemptsCat,
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
