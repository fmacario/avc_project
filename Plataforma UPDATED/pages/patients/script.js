// References
var database = firebase.database(); // database service
var auth = firebase.auth();

// Global variables;
var selectedPatient;
var patientRef;
var patientRefTemplates;
var patientAssociatedTemplates;

// Displays patients of database in a table
$(document).ready(function () {
    var tpatients = $('#showpatients')  // table patients

    var patientsRef = database.ref("patients/"); // database patients

    patientsRef.once("value", function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            var teste = $("#jogo table");
            teste.append($('<tr id="' + childSnapshot.key + '" onclick="showPatient(this)">')
                .append($('<td>')
                    .text(childSnapshot.val().pname)
                )
            )
        });

        $(".loader").css("display", "none");
        $("#jogo").css("display", "block");
    });
});

// Adds patient to database
function writeUserData() {
    pname = $("#pname").val();
    pusername = $("#pusername").val();
    pusernameE = $("#pusername").val() + '@strokerehab.com';
    ppassword = $("#ppassword").val();

    auth.createUserWithEmailAndPassword(pusernameE, ppassword).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);

        database.ref('patients/' + pusername).remove();

        if (errorCode === 'auth/email-already-in-use') {
            var html_block = '<div id="mensagemErro" class="alert alert-danger alert-dismissible">' +
                '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>' +
                '<h5><i class="icon fa fa-warning"></i> Utilizador já existe!</h5>' +
                '</div>';

            $("#mensagemErro").replaceWith(html_block);
        }
        if (errorCode === 'auth/weak-password') {
            var html_block = '<div id="mensagemErro" class="alert alert-danger alert-dismissible">' +
                '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>' +
                '<h5><i class="icon fa fa-warning"></i>Palavra-chave fraca.</h5>' +
                'Escolha uma palavra-chave com pelo menos digitos.' +
                '</div>';

            $("#mensagemErro").replaceWith(html_block);
        }
    });

    database.ref('patients/' + pusername).set({
        pname: pname,
        ntemplates: 0
    });

    setTimeout(function () {
        window.location.href = window.location.href;
    }, 1000);
}

// Displays selected patient from table
function showPatient(obj) {
    selectedPatient = obj.id;
    patientRef = database.ref('patients/' + selectedPatient);
    var patientNameRef = database.ref('patients/' + selectedPatient);

    patientNameRef.on('value', function (snapshot) {
        var html_block = '<div id="showpatient">' +
            '<div class="box box-widget widget-user-2" style="z-index: 2;width: 100%;">' +
            '<div class="box-header with-border">' +
            '<!-- /.box-tools -->' +
            '<!-- Add the bg color to the header using any of the bg-* classes -->' +
            '<div class="widget-user-header bg-blue">' +
            '<div class="widget-user-image">' +
            '<img class="img-circle" src="../../dist/img/user7-128x128.jpg" alt="User Avatar">' +
            '</div>' +
            '<!-- /.widget-user-image -->' +
            '<h3 class="widget-user-username">' + snapshot.val().pname + '</h3>' +
            '<h5 class="widget-user-desc">Paciente</h5>' +
            '</div>' +
            '<div class="box-footer no-padding">' +
            '<ul class="nav nav-stacked">' +
            '<li id="atribuidas"><a>Tarefas atribuidas<span class="pull-right badge bg-aqua">' + snapshot.val().ntemplates + '</span></a onclick="associatedTemplates()"></li>' +
            '<li><a>Tarefas completadas<span class="pull-right badge bg-green">0</span></a></li>' +
            '<li>' +
            '<button type="button" class="btn btn-block btn-danger btn-sm" style="width: 25%; margin: auto;" onclick="removePatient();window.location.href=window.location.href;">Remover paciente</button>' +
            '<div id="templates" style="width: 25%; margin: auto;"></div>' +
            '<button type="button" class="btn btn-block btn-sm" style="width: 25%; margin: auto;" onclick="assignTask();">Atribuir tarefa</button>' +
            '</li>' +
            '</ul>' +
            '</div>' +
            '</div>' +
            '</div>';

        $('#showpatient').replaceWith(html_block);

        var conc = '<div id="templates" style="width: 25%; margin: auto;">' +
            '<div class="form-group">' +
            '<select id="seltemplates" class="form-control select2 " multiple="" data-placeholder="Select templates" style="width: 100%;" tabindex="-1" aria-hidden="true">';

        refTemplates = database.ref('templates/');

        refTemplates.once("value", function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                conc = conc + '<option>' + childSnapshot.getKey() + '</option>';
            });
            conc = conc + '</select></div>';
            $('#templates').replaceWith(conc);

            $(function () {
                //Initialize Select2 Elements
                $(".select2").select2();
            });
        });
    });
}

// Removes patient from database
function removePatient() {
    patientRef.remove();
}

// Assign task to patient
function assignTask() {
    var finalTemplates = [];

    database.ref('patients/' + selectedPatient + "/ptemplates").once("value", function (snapshot) {
        console.log(snapshot.val());
        finalTemplates = jQuery.makeArray(snapshot.val());
        console.log(finalTemplates);

        for (var i = 0; i < $("#seltemplates").val().length; i++) {
            if (jQuery.inArray($("#seltemplates").val()[i], snapshot.val()) == -1 || jQuery.inArray($("#seltemplates").val()[i], snapshot.val()) == null) {
                console.log("initial temp" + finalTemplates);
                finalTemplates.push($("#seltemplates").val()[i]);
                console.log("dei push a " + $("#seltemplates").val()[i]);
                console.log("final temp " + finalTemplates);
            }
        }

        database.ref('patients/' + selectedPatient).set({
            pname: selectedPatient,
            ptemplates: finalTemplates,
            ntemplates: finalTemplates.length
        });
    });
}