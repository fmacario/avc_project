// References
var database = firebase.database(); // database service

var myParam = location.search.split('param=')[1]
myParamSpace = myParam.replace('_', ' ');

var templatesRef = database.ref("patients/" + myParamSpace + "/ptemplatesdone/multiplechoice");




templatesRef.once("value", function (snapshot) {
    snapshot.forEach(function (childSnapshot) {
            updateGraphValuesMultiplas(childSnapshot.val().templatename, childSnapshot.val().tempo, childSnapshot.val().attempts);
    });

    createGraphTempoMultiplas();
    createGraphAttemptsMultiplas();
    createGraphPercentagemMultiplas();


});

var templatenamesMult = [];
var temposMult = [];
var attemptsMult = [];
var percentagensMult = [];
var tipotemplatesMult = [];

function updateGraphValuesMultiplas(templatename, tempo, tentativas) {
    templatenamesMult.push(templatename);        
    var tempoMin = tempo.split('.');
    var tempoNew;
    var temps = 0, erradas = 0, percentagemErradas=0, percentagemCertas = 0; 
   

    if(tempoMin[1] < 10){
    	tempoNew = tempoMin[0] + '.' + '0' + tempoMin[1];
    }
    else{
    	tempoNew = tempoMin[0] + '.' + tempoMin[1];
    } 

    temposMult.push(tempoNew);
    attemptsMult.push(tentativas);

    for(var i = 0; i < attemptsMult.length; i++){
    	temps += attemptsMult[i];
    }

    erradas = temps - templatenamesMult.length;
    percentagemErradas = erradas/temps;
    percentagemCertas = templatenamesMult.length/temps;

    percentagensMult[0] = percentagemCertas * 100;
    percentagensMult[1] = percentagemErradas * 100;
    console.log("------>>>>>" + attemptsMult);

}

function createGraphTempoMultiplas() {
    var ctxTimeMultiplas = document.getElementById("lineChartTempoMultiplas");
    templatenamesMult.unshift("teste");
    temposMult.unshift(0);
    //console.log(templatenames +  " -> " + tempo);
    var chartTimeMultiplas = new Chart(ctxTimeMultiplas, {
        type: 'line',
        data: {
            labels: templatenamesMult,
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
                    data: temposMult,
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

function createGraphAttemptsMultiplas() {
    var ctxTentativasMultiplas = document.getElementById("lineChartAttemptsMultiplas");
    attemptsMult.unshift(0);
    var chartTentativasMultiplas = new Chart(ctxTentativasMultiplas, {
        type: 'line',
        data: {
            labels: templatenamesMult,
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
                    data: attemptsMult,
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

function createGraphPercentagemMultiplas() {

	 var ctxPercentageMultiplas = document.getElementById("ringChartMultiplas");
	 var chartPercentageMultiplas = new Chart(ctxPercentageMultiplas, {
	     type: 'doughnut',
	     data : {
	     labels: ["Certas (%)", "Erradas (%)" ],
	     datasets: [{
	             data: percentagensMult,
	             backgroundColor: ["#FF6384", "#36A2EB"],
	         }]
	 	}
	 });
}


