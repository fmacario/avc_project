// Initialize Firebase
var config = {
    apiKey: "AIzaSyCWjs-R7KWD1Hqg1Ve4h1ZGynj06XbB-JQ",
    authDomain: "avcproject-fae11.firebaseapp.com",
    databaseURL: "https://avcproject-fae11.firebaseio.com",
    storageBucket: "avcproject-fae11.appspot.com",
    messagingSenderId: "1031859806052"
};

firebase.initializeApp(config);

// References
var database = firebase.database(); // database service

// Global variables;
var selectedPatient;
var patientRef;
var patientRefTemplates

// Displays patients of database in a table
$(document).ready(function () {
    var tpatients = $('table').find('tbody');  // table patients
    var patientsRef = database.ref("patients/"); // database patients

    patientsRef.once("value", function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            tpatients.append($('<tr id="' + childSnapshot.key + '" onclick="showPatient(this)">')
                .append($('<td>')
                    .text(childSnapshot.val().pname)
                )
            )
        });
    });
});

// Adds patient to database
function writeUserData() {
    var pname = $("#pname").val();

    database.ref('patients/' + pname).set({
        pname: pname,
    });
}

// Displays selected patient from table
function showPatient(obj) {
    selectedPatient = obj.id;

    patientRef = database.ref('patients/' + obj.id);
    patientRefTemplates = database.ref('patients/' + obj.id + '/templates');
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
            '<button type="button" class="btn btn-block btn-sm" style="width: 25%; margin: auto;" onclick="assignTask();window.location.href=window.location.href;">Atribuir tarefa</button>' +
            '<div id="templates"></div>' +
            '</li>' +
            '</ul>' +
            '</div>' +
            '</div>' +
            '</div>';

        $('#showpatient').replaceWith(html_block);

        var conc = '<div id="templates">' +
            '<div class="form-group">' +
            '<select class="form-control select2 " multiple="" data-placeholder="Select a State" style="width: 100%;" tabindex="-1" aria-hidden="true">';

        patientRefTemplates.once("value", function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                    conc = conc + '<option>' + childSnapshot.val() + '</option>';
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
    var pname = $("#pname").val();
}

