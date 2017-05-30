// References
var database = firebase.database(); // database service

var myParam = location.search.split('param=')[1]
myParamSpace = myParam.replace('_', ' ');

var templatesRef = database.ref("patients/" + myParamSpace + "/ptemplatesdone/categorizacao");




templatesRef.once("value", function (snapshot) {
    snapshot.forEach(function (childSnapshot) {
            updateGraphValuesCategorias(childSnapshot.val().templatename, childSnapshot.val().tempo, childSnapshot.val().tentativas);
    });

    
    createGraphTempoCategorias();
});

var templatenames = [];
var tempos = [];
//var attempts = [];


function updateGraphValuesCategorias(templatename, tempo, tentativas) {
    templatenames.push(templatename);

    var tempoMin = tempo.split('.');
    var tempoNew;
   

    if(tempoMin[1] < 10){
        tempoNew = tempoMin[0] + '.' + '0' + tempoMin[1];
    }
    else{
        tempoNew = tempoMin[0] + '.' + tempoMin[1];
    } 

    tempos.push(tempoNew);
}

function createGraphTempoCategorias() {

    var ctxTimeCategorizacao = document.getElementById("lineChartTempoCategorizao");
    var chartTimeCategorizacao = new Chart(ctxTimeCategorizacao, {
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
                    data: tempos,
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