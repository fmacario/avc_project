// References
var database = firebase.database(); // database service

var myParam = location.search.split('param=')[1]
myParamSpace = myParam.replace('_', ' ');

var templatesRef = database.ref("patients/" + myParamSpace + "/ptemplatesdone/sequence");

templatesRef.once("value", function (snapshot) {
    snapshot.forEach(function (childSnapshot) {
        console.log(childSnapshot.val());
        updateGraphValuesSequence(childSnapshot.val().templatename, childSnapshot.val().tempo, childSnapshot.val().tentativas);

    });

    createGraphTempoSequence();
    createGraphAttemptsSequence();

});

var templatenamesSeq = [];
var temposSeq = [];
var attemptsSeq = [];


function updateGraphValuesSequence(templatename, tempo, tentativas) {
    templatenamesSeq.push(templatename);
    var tempoMin = tempo.split('.');
    var tempoNew;

    if (tempoMin[1] < 10) {
        tempoNew = tempoMin[0] + '.' + '0' + tempoMin[1];
    }
    else {
        tempoNew = tempoMin[0] + '.' + tempoMin[1];
    }

    temposSeq.push(tempoNew);
    attemptsSeq.push(tentativas);
    console.log("-2" + templatenamesSeq);
}

function createGraphTempoSequence() {
    var ctxTimeSequence = document.getElementById("lineChartTempoSequence");
    templatenamesSeq.unshift("teste");
    temposSeq.unshift(0);
    //console.log(templatenames2 +  " -> " + tempo);
    var chartTimeSequence = new Chart(ctxTimeSequence, {
        type: 'line',
        data: {
            labels: templatenamesSeq,
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
                    data: temposSeq,
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

function createGraphAttemptsSequence() {
    var ctxTentativasSequence = document.getElementById("lineChartAttemptsSequence");
    attemptsSeq.unshift(0);
    var ctxTentativasSequence = new Chart(ctxTentativasSequence, {
        type: 'line',
        data: {
            labels: templatenamesSeq,
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
                    data: attemptsSeq,
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
