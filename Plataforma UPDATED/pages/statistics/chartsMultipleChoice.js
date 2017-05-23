// References
var database = firebase.database(); // database service

var myParam = location.search.split('param=')[1]
myParamSpace = myParam.replace('_', ' ');

var templatesRef = database.ref("patients/" + myParamSpace + "/ptemplatesdone/");




templatesRef.once("value", function (snapshot) {
    snapshot.forEach(function (childSnapshot) {
        if(childSnapshot.val().tipotemplate == "multiplechoice"){
            updateGraphValues(childSnapshot.val().templatename, childSnapshot.val().tempo, childSnapshot.val().attempts);
        }
    });

    createGraphTempo();
    createGraphAttempts();
    createGraphPercentagem();


});

var templatenames = [];
var tempo = [];
var attempts = [];
var percentagens = [];

function updateGraphValues(templatename, tempos, tentativas) {
    templatenames.push(templatename);

    var tempoMin = tempos.split('.');
    var tempoNew;
    var temps = 0, erradas = 0, percentagemErradas=0, percentagemCertas = 0; 
   

    if(tempoMin[1] < 10){
    	tempoNew = tempoMin[0] + '.' + '0' + tempoMin[1];
    }
    else{
    	tempoNew = tempoMin[0] + '.' + tempoMin[1];
    } 

    tempo.push(tempoNew)
    attempts.push(tentativas);

    for(var i = 0; i < attempts.length; i++){
    	temps += attempts[i];
    }

    erradas = temps - templatenames.length;
    percentagemErradas = erradas/temps;
    percentagemCertas = templatenames.length/temps;

    percentagens[0] = percentagemCertas * 100;
    percentagens[1] = percentagemErradas * 100;

}

function createGraphTempo() {
    var ctx = document.getElementById("lineChartTempo");
    templatenames.unshift("teste");
    tempo.unshift(0);
    console.log(templatenames +  " -> " + tempo);
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

function createGraphAttempts() {
    var ctx = document.getElementById("lineChartAttempts");
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: templatenames,
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
                    data: attempts,
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

function createGraphPercentagem() {

	 var ctx = document.getElementById("ringChart");
	 var myChart = new Chart(ctx, {
	     type: 'doughnut',
	     data : {
	     labels: ["Certas (%)", "Erradas (%)" ],
	     datasets: [{
	             data: percentagens,
	             backgroundColor: ["#FF6384", "#36A2EB"],
	         }]
	 	}
	 });
}


