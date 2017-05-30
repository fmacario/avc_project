// References
var database = firebase.database(); // database service

var myParam = location.search.split('param=')[1]
myParamSpace = myParam.replace('_', ' ');

var templatesRef = database.ref("patients/" + myParamSpace + "/ptemplatesdone/sequence");




templatesRef.once("value", function (snapshot) {
    snapshot.forEach(function (childSnapshot) {
            updateGraphValuesSequence(childSnapshot.val().templatename, childSnapshot.val().tempo, childSnapshot.val().tentativas);

    });

    createGraphTempoSequence();

});

var templatenames = [];
var tempos = [];
var attempts = [];


function updateGraphValuesSequence(templatename, tempo, tentativas) {
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
    attempts.push(tentativas);

}

function createGraphTempoSequence() {
    var ctxTimeSequence = document.getElementById("lineChartTempoSequence");
    //templatenames.unshift("teste");
    //tempo.unshift(0);
    //console.log(templatenames +  " -> " + tempo);
    var chartTimeSequence = new Chart(ctxTimeSequence, {
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
