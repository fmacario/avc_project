// References
var database = firebase.database(); // database service
var auth = firebase.auth();

// Global variables;
var selectedPatient = "default";
var patientRef;
var patientRefTemplates;
var patientAssociatedTemplates;

// Displays patients of database in a table
$(document).ready(function () {
    $("#jogo").hide();

    var tpatients = $('#showpatients')  // table patients
    var patientsRef = database.ref("patients/"); // database patients

    patientsRef.once("value", function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            var teste = $("#jogo table");
            teste.append($('<tr id="' + childSnapshot.key + '" onclick="showPatient(this)">')
                .append($('<td>')
                    .text(childSnapshot.val().pname)
                )
                .append($('<td>')
                    .text(childSnapshot.val().pprocess)
                )
            )
        });

        $(".loader").hide("slow");
        $("#showpatients").toggleClass('box-body table-responsive no-padding table-striped');
        $("#jogo").show("slow");
    });
});

// Adds patient to database
function writeUserData() {
    var pusername = $("#pusername").val();
    var pusernameE = pusername.toLowerCase();
    pusernameE = pusernameE + '@strokerehab.com';
    var ppassword = $("#ppassword").val();
    var pname = $("#pname").val();
    var pprocess = $("#pprocess").val();
    auth.createUserWithEmailAndPassword(pusernameE, ppassword).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);

        database.ref('patients/' + pusername).remove();

        if (errorCode === 'auth/email-already-in-use') {
            var html_block = '<div id="mensagemErro" class="alert alert-danger alert-dismissible merro">' +
                '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>' +
                '<h5><i class="icon fa fa-warning"></i> Utilizador já existe!</h5>' +
                '</div>';

            $("#mensagemErro").replaceWith(html_block);
        }
        if (errorCode === 'auth/weak-password') {
            var html_block = '<div id="mensagemErro" class="alert alert-danger alert-dismissible merro">' +
                '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>' +
                '<h5><i class="icon fa fa-warning"></i>Palavra-chave fraca.</h5>' +
                'Escolha uma palavra-chave com pelo menos 6 digitos.' +
                '</div>';

            $("#mensagemErro").replaceWith(html_block);
        }
    });

    database.ref('patients/' + pusername).set({
        pname: pname,
        ntemplates: 0,
        ntemplatesdone: 0,
        pprocess: pprocess
    });

    setTimeout(function () {
        relogin();
        setTimeout(function () {
            window.location.href = window.location.href;
        }, 1000);
    }, 1000);
}

// Displays selected patient from table
function showPatient(obj) {
    if (obj.id == selectedPatient) {
        selectedPatient = "default";
        $("#showpatient").hide('slow');

        return;
    }

    selectedPatient = obj.id;
    patientRef = database.ref('patients/' + selectedPatient);
    var patientNameRef = database.ref('patients/' + selectedPatient);

    patientNameRef.on('value', function (snapshot) {
        var html_block = '<div class="loader" style="margin: auto;"></div>' +
            '<div id="showpatient" style="display: none">' +
            '<div class="box box-widget widget-user-2" style="z-index: 2;width: 100%;">' +
            '<div class="box-header with-border">' +
            '<!-- Add the bg color to the header using any of the bg-* classes -->' +
            '<div class="widget-user-header bg-blue">' +
            '<div class="widget-user-image">' +
            '<img class="img-circle" src="../../dist/img/user7-128x128.jpg" alt="User Avatar">' +
            '</div>' +
            '<!-- /.widget-user-image -->' +
            '<h3 class="widget-user-username">' + snapshot.val().pname + '</h3>' +
            '<h5 class="widget-user-desc">Paciente</h5>' +
            '</div>' +
            '<ul class="nav nav-stacked">' +
            '<li id="atribuidas"><a>Tarefas atribuidas<span class="pull-right badge bg-aqua">' + snapshot.val().ntemplates + '</span></a></li>' +
            '<div id="tabletemp"></div>' +
            '<li id="completadas"><a>Tarefas completadas<span class="pull-right badge bg-green">' + snapshot.val().ntemplatesdone + '</span></a></li>' +
            '<div id="tabletempdone"></div>' +
            '<li id="graphs"><a>Estatisticas<span class="pull-right badge bg-yellow"><i class="fa fa-fw fa-pie-chart"></i></span></a onclick="goToStatistics()"></li>' +
            '</ul>' +
            '<div style="text-align: center;">' +
            '<div   >' +
            '<a href="#" class="btn btn-sm btn-danger buttoncenter" onclick="removePatient();window.location.href=window.location.href;"><i class="fa fa-trash-o" aria-hidden="true"></i> Remover paciente</a>' +
            '<a href="#" class="btn btn-sm btn-info buttoncenter" onclick="editPatient();"><i class="fa fa-pencil-square-o" aria-hidden="true"></i> Editar paciente</a>' +
            '</div>' +
            '<div style="padding: 10px">' +
            '<div id="templates"></div>' +
            '<a href="#" class="btn btn-sm btn-primary buttoncenter" onclick="assignTask();"><i class="fa fa-plus-square" aria-hidden="true"></i> Atribuir tarefa</a>' +
            '</div>' +
            '<div id="templates2"></div>' + 
            '<div>' +
            '<a href="#" class="btn btn-sm btn-primary buttoncenter" onclick="deassignTask();"><i class="fa fa-minus-square" aria-hidden="true"></i> Desatribuir tarefa</a>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>';

        $('#showpatient').replaceWith(html_block);
        $('#atribuidas').click(function () {
            html_block = "<table id='tabletemp' class='table table-hover table-striped'>" +
                "<tbody>" +
                "<tr>" +
                "<th>Nome</th>" +
                "<th>Tipo</th>" +
                "</tr>" +
                "</tbody>" +
                "</table>";

            $("#tabletemp").replaceWith(html_block);
            if (snapshot.val().ntemplates != 0) {
                for (var i = 0; i < snapshot.val().ptemplates.length; i++) {
                    $("#tabletemp")
                        .append($('<tr id="' + snapshot.key + '">')
                            .append($('<td>')
                                .text(snapshot.val().ptemplates[i].replace(/_/g, ' '))
                            )
                            .append($('<td>')
                                .text('A SER IMPLEMENTADO')
                            )
                        )
                }
            }
        })

        $('#completadas').click(function () {
            html_block = "<table id='tabletempdone' class='table table-hover table-striped'>" +
                "<tbody>" +
                "<tr>" +
                "<th>Nome</th>" +
                "<th>Tipo</th>" +
                "</tr>" +
                "</tbody>" +
                "</table>";

            var patientNameRef2 = database.ref('patients/' + selectedPatient + '/ptemplatesdone');

            patientNameRef2.on('value', function (snapshot) {
                $("#tabletempdone").replaceWith(html_block);
                snapshot.forEach(function (childSnapshot) {
                    $("#tabletempdone")
                        .append($('<tr id="' + childSnapshot.key + '">')
                            .append($('<td>')
                                .text(childSnapshot.key)
                            )
                            .append($('<td>')
                                .text('A SER IMPLEMENTADO')
                            )
                        )
                });
            });
        })

        $("#graphs").click(function () {
            window.location = '../statistics/statistics.html' + '?param=' + selectedPatient;
        });
        

        var conc = '<div id="templates" style="width: 25%; margin: auto;">' +
            '<div class="form-group">' +
            '<select id="seltemplates" class="form-control select2 " multiple="" data-placeholder="Associar templates" style="width: 100%;" tabindex="-1" aria-hidden="true">';

        refTemplates = database.ref('templates/');

        refTemplates.once("value", function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                conc = conc + '<option>' + childSnapshot.getKey().replace(/_/g, ' ') + '</option>';
            });
            conc = conc + '</select></div>';
            $('#templates').replaceWith(conc);

            $(function () {
                //Initialize Select2 Elements
                $(".select2").select2();
            });

            $(".loader").hide("slow");
            $("#showpatient").show("slow");
        });

        var conc2 = '<div id="templates2" style="width: 25%; margin: auto;">' +
            '<div class="form-group">' +
            '<select id="seltemplates2" class="form-control select2 " multiple="" data-placeholder="Desassociar templates" style="width: 100%;" tabindex="-1" aria-hidden="true">';

        refTemplatesAss = database.ref('patients/' + selectedPatient + '/ptemplates');

        refTemplatesAss.once("value", function (snapshot) {
            if (snapshot.val()) {
                for (var i = 0; i < snapshot.val().length; i++) {
                    conc2 = conc2 + '<option>' + snapshot.val()[i].replace(/_/g, ' ') + '</option>';
                }
            }

            conc2 = conc2 + '</select></div>';
            $('#templates2').replaceWith(conc2);

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

// Edits patients information
function editPatient() {
    var patientsRef = database.ref("patients/" + selectedPatient); // database patients

    patientsRef.once("value", function (snapshot) {
        $(".loader").hide("slow");
        $("#showpatients").toggleClass('box-body table-responsive no-padding');
        $("#jogo").show("slow");

        var html_block = '<form role="form">' +
            '<div class="form-group">' +
            '<label>Nome do paciente</label>' +
            '<input type="text" class="form-control" id="n_pname" placeholder="Insira Nome do Paciente" value="' + snapshot.val().pname + '">' +
            '<label>Nº de processo</label>' +
            '<input type="number" class="form-control" id="n_pprocess" placeholder="Nº de processo" value="' + snapshot.val().pprocess + '">' +
            '<button type="button" class="btn btn-block btn-info btn-sm" style="width: 25%; margin: auto;" onclick="modifyPatient();">Aplicar alterações</button>';

        $('#showpatient').fadeOut("slow", function () {
            $(this).replaceWith(html_block);
            $('#showpatient').fadeIn("slow");
        });
    });
}

function modifyPatient() {
    database.ref('patients/' + selectedPatient).once("value", function (snapshot) {
        database.ref('patients/' + selectedPatient).set({
            pname: $("#n_pname").val(),
            ptemplates: snapshot.child("ptemplates").val(),
            ntemplates: snapshot.child("ptemplates").numChildren(),
            ntemplatesdone: snapshot.child("ptemplatesdone").numChildren(),
            ptemplatesdone: snapshot.child("ptemplatesdone").val(),
            pprocess: $("#n_pprocess").val()
        });
    });
}

// Assign task to patient
function assignTask() {
    var finalTemplates = [];

    database.ref('patients/' + selectedPatient + "/ptemplates").once("value", function (snapshot) {
        finalTemplates = jQuery.makeArray(snapshot.val());

        for (var i = 0; i < $("#seltemplates").val().length; i++) {
            if (jQuery.inArray($("#seltemplates").val()[i], snapshot.val()) == -1 || jQuery.inArray($("#seltemplates").val()[i], snapshot.val()) == null) {
                finalTemplates.push($("#seltemplates").val()[i].replace(/ /g, "_"));
            }
        }

        database.ref('patients/' + selectedPatient).once("value", function (snapshot) {
            database.ref('patients/' + selectedPatient).set({
                pname: selectedPatient,
                ptemplates: finalTemplates,
                ntemplates: snapshot.child("ptemplates").numChildren() + 1,
                ntemplatesdone: snapshot.child("ptemplatesdone").numChildren(),
                ptemplatesdone: snapshot.child("ptemplatesdone").val(),
                pprocess: snapshot.child("pprocess").val()
            });
        });
    });
}

// Deassgines templates to selected patient
function deassignTask() {
    var finalTemplates = [];

    database.ref('patients/' + selectedPatient + "/ptemplates").once("value", function (snapshot) {
        finalTemplates = jQuery.makeArray(snapshot.val());
        var index;

        for (var i = 0; i < $("#seltemplates2").val().length; i++) {
            index = finalTemplates.indexOf($("#seltemplates2").val()[i]);
            finalTemplates.splice(index, 1);
        }

        database.ref('patients/' + selectedPatient).once("value", function (snapshot) {
            database.ref('patients/' + selectedPatient).set({
                pname: selectedPatient,
                ptemplates: finalTemplates,
                ntemplates: snapshot.child("ptemplates").numChildren() - 1,
                ntemplatesdone: snapshot.child("ptemplatesdone").numChildren(),
                ptemplatesdone: snapshot.child("ptemplatesdone").val(),
                pprocess: snapshot.child("pprocess").val()
            });
        });
    });
}

function relogin() {
    var dusername = "admin@strokerehab.com";
    var dpassword = "admin123";

    firebase.auth().signInWithEmailAndPassword(dusername, dpassword).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
    });
}
