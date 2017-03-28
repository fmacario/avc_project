var msgNr = 0; // variavel de contar mensagens
var imgTitle;	//titulo da imagem sem path/extencao
var input;		//input dado para adivinhar
var nrLetras;	//nr de letras para esconder
var pathToImg; //path to image to upload o patient side
var mensagens = []; //array de mensagens dadas

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
var storageRef = firebase.storage().ref(); // storage service

$(function () {
    //Function to upload image

    $(":file").change(function () {
        if (this.files && this.files[0]) {
            var reader = new FileReader();
            reader.onload = imageIsLoaded;
            reader.readAsDataURL(this.files[0]);

            pathToImg = $(this).val();

            imgTitle = takeExtension(this.files[0].name);
            $('#palavra').val(imgTitle);
        }
    });


    //Butao de eliminar mensagem
    $("#apagarMensagem").on('click', function () {
        assertImgInsert();

        if (msgNr == 0) {
            alert("Não existe texto ajuda para eliminar!");
            throw new Error("No text available to delete")
        }
        msgNr--;
        $("#mensagem" + msgNr).hide();
        mensagens.pop();
    });

    //Butao de adicionar mensagem
    $("#adicionarMensagem").on('click', function () {
        assertImgInsert();
        getMessage();


        $("#mensagens").append("<li id=\"mensagem" + msgNr + "\">" + mensagens[msgNr] + "</li>");
        $("#msgAjuda").val("");
        msgNr++;
    });

    //Butao de esconder todas as letras
    $("#todos").on('click', function () {
        assertImgInsert();
        getInput();

        var stringWithoutSpace = input.replace(/ /g, "") //tira os espaços entre os nomes para contagem de letras
        $("#nrletras").val(stringWithoutSpace.length);
    });

    //Butao de esconder metade das letras
    $("#metade").on('click', function () {

        assertImgInsert();
        getInput();

        var stringWithoutSpace = input.replace(/ /g, "") //tira os espaços entre os nomes para contagem de letras
        $("#nrletras").val(stringWithoutSpace.length / 2 | 0); //arredonda para baixo
    });

    //Submit button
    $('#submitBtn').on('click', function () {

        assertImgInsert();
        getInput();
        nrLetras = $('#nrletras').val();		//nrLetras é o nr de letras a esconder


        if (nrLetras > input.length) {
            alert("Número de letras a esconder é superior ao número de letras na palavra!");
            throw new Error("Assertion failed");
        }
        else if (nrLetras <= 0) {
            alert("Número de letras não pode ser menor ou igual a 0!");
            throw new Error("Assertion failed");
        }
        else {
            var path='templates/guessname/teste.jpg';
            //meter ajudas para o ficheiro
            console.log(input);
            console.log(nrLetras);
            console.log(mensagens);


            var imageRef = storageRef.child('teste.jpg');
            var imagesImageRef = storageRef.child(path);

            // While the file names are the same, the references point to different files
            imageRef.name === imagesImageRef.name            // true
            imageRef.fullPath === imagesImageRef.fullPath    // false

            var file = document.getElementById('result').files[0];
            imagesImageRef.put(file).then(function(snapshot) {
                console.log('Uploaded a blob or file!');
            });

            database.ref('templates/guessname/' + 0).set({
                templateid: 0,
                input: input,
                nrLetras: nrLetras,
                mensagens: mensagens
            });
        }
    });

});

//Load the image and take out the upload button
function imageIsLoaded(e) {
    $('#myImg').attr('src', e.target.result);
    var input = document.getElementById("result").style.display = "none";
    var input = document.getElementById("labelresult2").style.visibility = "visible";

}

//Get name without extentions
function takeExtension(e) {
    parts = e.split("."); // This is not an answer for all the scnarios, like if file name is `services.controller.js`
    e = parts[0];
    return e;
}

//Assert image was placed
function assertImgInsert() {
    if (imgTitle == null) {
        alert("Insira imagem!");
        throw new Error("Image not inserted");
    }	//se não houver imagem, erro
}

//Get input
function getInput() {
    input = $('#palavra').val();		//input é a palavra

    if (input == "") {
        input = imgTitle;
    } 	//se nao houver input, palavra = titulo da img
}

//Get mensagem
function getMessage() {
    mensagemEmQuestao = $('#msgAjuda').val();

    if (mensagemEmQuestao == "") {
        alert("Insira um texto de ajuda!");
        throw new Error("Help not given!");
    }

    mensagens[msgNr] = mensagemEmQuestao;

}


/* Removes element from array by value*/
Array.prototype.remove = function () {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
}

// initialize
function Init() {

    var fileselect = $id("result"),
        filedrag = $id("filedrag");

    // file select
    fileselect.addEventListener("change", FileSelectHandler, false);

    // is XHR2 available?
    var xhr = new XMLHttpRequest();
    if (xhr.upload) {

        // file drop
        filedrag.addEventListener("dragover", FileDragHover, false);
        filedrag.addEventListener("dragleave", FileDragHover, false);
        filedrag.addEventListener("drop", FileSelectHandler, false);
        filedrag.style.display = "block";

    }

}

// getElementById
function $id(id) {
    return document.getElementById(id);
}
