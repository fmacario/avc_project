// References
var database = firebase.database(); // database service
var auth = firebase.auth();

// Global variables;
var selectedPatient;
var patientRef;
var patientRefTemplates

// Displays patients of database in a table
$(document).ready(function () {
    var tpatients = $('#showpatients')  // table patients

    var table = "<div id='showpatients' class='box-body table-responsive no-padding'>" +
                "<table class='table table-hover'>" +
                "<tbody>" +
                "<tr><th>Nome</th></tr>" + 
                "</tbody>" +
                "</table>" +
                "</div>";

    var patientsRef = database.ref("patients/"); // database patients

    patientsRef.once("value", function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
                tpatients.replaceWith(table);
                    var teste = $("#showpatients table");
            teste.append($('<tr id="' + childSnapshot.key + '" onclick="showPatient(this)">')
                 .append($('<td>')
                 .text(childSnapshot.val().pname)
                )
            )
        });
    });
});

// Adds patient to database
function writeUserData() {
    pname = $("#pname").val();
    pusername = $("#pusername").val();
    pusernameE = $("#pusername").val() + '@strokerehab.com';
    ppassword = $("#ppassword").val();

    auth.createUserWithEmailAndPassword(pusernameE, ppassword).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
    });


    database.ref('patients/' + pusername).set({
        pname: pname,
    });
}

// Displays selected patient from table
function showPatient(obj) {
    selectedPatient = obj.id;
    console.log(selectedPatient);
    patientRef = database.ref('patients/' + obj.id);
    var patientNameRef = database.ref('patients/' + obj.id + '/pname');

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
            '<h3 class="widget-user-username">' + snapshot.val() + '</h3>' +
            '<h5 class="widget-user-desc">Paciente</h5>' +
            '</div>' +
            '<div class="box-footer no-padding">' +
            '<ul class="nav nav-stacked">' +
            '<li><a href="#">Tarefas atribuidas<span class="pull-right badge bg-aqua">0</span></a></li>' +
            '<li><a href="#">Tarefas completadas<span class="pull-right badge bg-green">0</span></a></li>' +
            '<li>' +
            '<button type="button" class="btn btn-block btn-danger btn-sm" style="width: 25%; margin: auto;" onclick="removePatient();window.location.href=window.location.href;">Remover paciente</button>' +
            '<button type="button" class="btn btn-block btn-sm" style="width: 25%; margin: auto;" onclick="assignTask();">Atribuir tarefa</button>' +
            '<div id="templates"></div>' +
            '</li>' +
            '</ul>' +
            '</div>' +
            '</div>' +
            '</div>';

        $('#showpatient').replaceWith(html_block);

        var conc = '<div id="templates">' +
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
    var seltemplates = $("#seltemplates").val();

    database.ref('patients/' + selectedPatient).set({
        pname: selectedPatient,
        ptemplates: seltemplates
    });
}