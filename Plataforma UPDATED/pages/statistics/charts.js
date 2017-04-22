// References
var database = firebase.database(); // database service

var templatesRef = database.ref("templates/multiplechoice/"); // database templates


templatesRef.once("value", function (snapshot) {
    snapshot.forEach(function (childSnapshot) {
        var ctx = document.getElementById("lineChart");
        
        console.log(childSnapshot.val().tempo);
        var myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ["Pergunta 1", "Pergunta 2", "Pergunta 3", "Pergunta 4", "Pergunta 5", "Pergunta 6"],
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
                        data: [childSnapshot.val().tempo,"5.5","5","1"],
                        spanGaps: false,
                    }
                ]
            },

            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true
                        }
                    }]
                }
            }
        });

    });
});

