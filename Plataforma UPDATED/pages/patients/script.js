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
                /*
                .append($('<td>')
                    .text(childSnapshot.val().page)
                )
                .append($('<td>')
                    .text(childSnapshot.val().pschool)
                )
                .append($('<td>')
                    .text(childSnapshot.val().pdateinjury)
                )
                .append($('<td>')
                    .text(childSnapshot.val().ptypeinjury)
                )
                */
            )
        });

        $(".loader").hide("slow");
        $("#showpatients").toggleClass('box-body table-responsive no-padding');
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
    /*
    var page = $("#page").val();
    var pschool = $("#pschool").val();
    var pdateinjury = $("#pdateinjury").val();
    var ptypeinjury = $("#ptypeinjury").val();
    */  
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
        ntemplates: 0,
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
            '<li id="atribuidas"><a>Tarefas atribuidas<span class="pull-right badge bg-aqua">' + snapshot.val().ntemplates + '</span></a onclick="associatedTemplates()"></li>' +
            '<div id="tabletemp"></div>' +
            '<li id="completadas"><a>Tarefas completadas<span class="pull-right badge bg-green">0</span></a></li>' +
            '<div id="tabletempdone"></div>' +
            '<li id="atribuidas"><a>Estatisticas<span class="pull-right badge bg-yellow"><i class="fa fa-fw fa-pie-chart"></i></span></a onclick=""></li>' +
            '</ul>' +
            '<button type="button" class="btn btn-block btn-danger btn-sm" style="width: 25%; margin: auto;" onclick="removePatient();window.location.href=window.location.href;">Remover paciente</button>' +
            '<button type="button" class="btn btn-block btn-info btn-sm" style="width: 25%; margin: auto;" onclick="editPatient();">Editar paciente</button>' +
            '<div id="templates" style="width: 25%; margin: auto;"></div>' +
            '<button type="button" class="btn btn-block btn-primary btn-sm" style="width: 25%; margin: auto;" onclick="assignTask();">Atribuir tarefa</button>' +
            '</div>' +
            '</div>';

        $('#showpatient').replaceWith(html_block);
        $('#atribuidas').click(function () {
            html_block = "<table id='tabletemp' class='table table-hover'>" +
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
                                .text(snapshot.val().ptemplates[i])
                            )
                            .append($('<td>')
                                .text('A SER IMPLEMENTADO')
                            )

                        )
                }
            }
        })

        $('#completadas').click(function () {
            html_block = "<table id='tabletempdone' class='table table-hover'>" +
                "<tbody>" +
                "<tr>" +
                "<th>Nome</th>" +
                "<th>Tipo</th>" +
                "<th>Resultados e estatisticas</th>" +
                "</tr>" +
                "</tbody>" +
                "</table>";

            if (snapshot.val().ntemplates != 0) {
                $("#tabletempdone").replaceWith(html_block);
                for (var i = 0; i < snapshot.val().ptemplatesdone.length; i++) {
                    $("#tabletemp")
                        .append($('<tr id="' + snapshot.key + '">')
                            .append($('<td>')
                                .text(snapshot.val().ptemplatesdone[i])
                            )
                            .append($('<td>')
                                .text('A SER IMPLEMENTADO')
                            )
                            .append($('<td>')
                                .text('A SER IMPLEMENTADO')
                            )
                        )
                }
            }
        })

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

            $(".loader").hide("slow");
            $("#showpatient").show("slow");
        });
    });
}

// Removes patient from database
function removePatient() {
    patientRef.remove();
}

//Eu sou panuco, sou louco por piça, por favor venham-me ao cu


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
    var n_pname = $("#n_pname").val();
    var n_pprocess = $("#n_pprocess").val();
    var finalTemplates = [];

    database.ref('patients/' + selectedPatient + "/ptemplates").once("value", function (snapshot) {
        finalTemplates = jQuery.makeArray(snapshot.val());

        database.ref('patients/' + selectedPatient).set({
            pname: n_pname,
            pprocess: n_pprocess,
            ptemplates: finalTemplates,
            ntemplates: finalTemplates.length
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