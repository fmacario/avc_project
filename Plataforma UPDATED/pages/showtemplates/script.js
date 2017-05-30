// References
var database = firebase.database(); // database service

$("#jogo").hide();

// Displays templates of database in a table
$(document).ready(function () {
    var ttemplates = $('#showtemplates')  // table templates
    var templatesRef = database.ref("templates/"); // database templates

    templatesRef.once("value", function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            var teste = $("#jogo table");
            teste.append($('<tr id="' + childSnapshot.key + '">')
                .append($('<td>')
                    .text(childSnapshot.key.replace(/_/g, ' '))
                )
                .append($('<td>')
                    .text(childSnapshot.val().tipo)
                )
                .append($('<td><a><i class="fa fa-fw fa-remove" style="color:red; font-size: 20px" onclick="removeTemplate(this)"></i></a><a><i class="fa fa-fw fa-edit" style="font-size: 20px" onclick="editTemplate(this)"></i></a><a><i class="fa fa-fw fa-play-circle-o" style="color:green; font-size: 20px" onclick="previewTemplate(this)"></i></a>')
                )
            )
        });

        $(".loader").hide("slow");
        $("#showpatients").toggleClass('box-body table-responsive no-padding');
        $("#jogo").show("slow");
    });
});

function removeTemplate(obj) {
    var selectedTemplate = obj.parentElement.parentElement.parentElement.id;
    templateRef = database.ref('templates/' + selectedTemplate);
    templateRef.remove();

    patientsRef = database.ref('patients/');

    patientsRef.once("value", function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            var ptemplatesPatient = database.ref('patients/' + childSnapshot.key);

            ptemplatesPatient.orderByKey().equalTo("ptemplates").on("child_added", function (snapshot2) {
                var array = snapshot2.val();
                var index = array.indexOf(selectedTemplate);
                array.splice(index, 1);

                if (index > -1) {
                    if (childSnapshot.val().ptemplatesdone) {
                        database.ref('patients/' + childSnapshot.key).set({
                            pname: childSnapshot.val().pname,
                            pprocess: childSnapshot.val().pprocess,
                            ptemplates: array,
                            ntemplates: array.length,
                            ptemplatesdone: childSnapshot.val().ptemplatesDone
                        });
                    } else {
                        database.ref('patients/' + childSnapshot.key).set({
                            pname: childSnapshot.val().pname,
                            pprocess: childSnapshot.val().pprocess,
                            ptemplates: array,
                            ntemplates: array.length,
                        });
                    }
                } else {
                    console.log("nao existe");
                }
            });
        });
    });

    setTimeout(function () {
        window.location.href = window.location.href;
    }, 1000);
}

function previewTemplate(obj) {
    var selectedTemplate = obj.parentElement.parentElement.parentElement.id;
    templateRef = database.ref('templates/' + selectedTemplate);
    templateRef.once("value", function (snapshot) {
        window.location = '../templates/' + snapshot.val().tipo + '/patient/preview.html' + '?param=' + snapshot.key;
    });
}

function editTemplate(obj) {
    var selectedTemplate = obj.parentElement.parentElement.parentElement.id;
    templateRef = database.ref('templates/' + selectedTemplate);
    templateRef.once("value", function (snapshot) {
        window.location = '../templates/' + snapshot.val().tipo + '/doctor/doctor.html' + '?param=' + snapshot.key;
    });
}

function displaySearch() {
    var searchText = $("#searchText").val();
    var table = $("#jogo table");
    var newTable = $("<table class='table table-hover table-striped'></table>");

    newTable.append($('<tr>')
        .append($('<th>')
            .text('Nome')
        )
        .append($('<th>')
            .text('Tipo')
        )
        .append($('<th>')
        )
    );

    if (searchText == "") {
        var templatesRef = database.ref("templates/"); // database templates

        templatesRef.once("value", function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                var teste = $("#jogo table");
                teste.append($('<tr id="' + childSnapshot.key + '">')
                    .append($('<td>')
                        .text(childSnapshot.key.replace(/_/g, ' '))
                    )
                    .append($('<td>')
                        .text(childSnapshot.val().tipo)
                    )
                    .append($('<td><a><i class="fa fa-fw fa-remove" style="color:red; font-size: 20px" onclick="removeTemplate(this)"></i></a><a><i class="fa fa-fw fa-edit" style="font-size: 20px" onclick="editTemplate(this)"></i></a><a><i class="fa fa-fw fa-play-circle-o" style="color:green; font-size: 20px" onclick="previewTemplate(this)"></i></a>')
                    )
                )
            });

            $(".loader").hide("slow");
            $("#showpatients").toggleClass('box-body table-responsive no-padding');
            $("#jogo").show("slow");
        });

        table.replaceWith(newTable);
        return;
    }

    $('#jogo table tr').each(function () {
        var templateName = $(this).find("td:first").html();
        var templateTipo = $(this).find("td:nth-child(2)").html();

        if (templateName != undefined) {
            var index = templateName.indexOf(searchText);
            if (index != -1) {
                //table.empty();
                newTable.append($('<tr id="' + templateName + '">')
                    .append($('<td>')
                        .text(templateName)
                    )
                    .append($('<td>')
                        .text(templateTipo)
                    )
                    .append($('<td><a><i class="fa fa-fw fa-remove" style="color:red; font-size: 20px" onclick="removeTemplate(this)"></i></a><a><i class="fa fa-fw fa-edit" style="font-size: 20px" onclick="editTemplate(this)"></i></a><a><i class="fa fa-fw fa-play-circle-o" style="color:green; font-size: 20px" onclick="previewTemplate(this)"></i></a>')
                    )
                )
            }
        }
    });

    table.replaceWith(newTable);
}

// Enter key to submit
$('#searchText').keypress(function (e) {
    if (e.which == 13) {
        console.log("shit");
        displaySearch();
        return false;
    }
});
