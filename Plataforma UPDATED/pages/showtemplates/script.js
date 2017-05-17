// References
var database = firebase.database(); // database service

// Displays templates of database in a table
$(document).ready(function () {
    $("#jogo").hide();

    var ttemplates = $('#showtemplates')  // table templates
    var templatesRef = database.ref("templates/"); // database templates

    templatesRef.once("value", function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            var teste = $("#jogo table");
            teste.append($('<tr id="' + childSnapshot.key + '" onclick="preview()">')
                .append($('<td>')
                    .text(childSnapshot.key)
                )
                .append($('<td>')
                    .text(childSnapshot.val().tipo)
                )
            )
        });

        $(".loader").hide("slow");
        $("#showpatients").toggleClass('box-body table-responsive no-padding');
        $("#jogo").show("slow");
    });
});