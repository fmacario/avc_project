// References
var storageRef = firebase.storage().ref(); // storage service
var database = firebase.database(); // database service

// Global variables
var myParam = location.search.split('param=')[1]
myParamSpace = myParam.replace('_', ' ');
var templatesRef = database.ref("templates/" + myParamSpace); // database templates

var selectedDiv = null;
var letrasEscondidas = [];
var arrayLetters = [];
var entity = [];
var sceneEl;
var x = -0.9;
var y = 0.5;
var selected = false;
var antigaLetraSelecionada = null;
var letraSelecionada = null;
var escondePosicao = [];        // posicao das letras a serem escondidas
var input, imgTitle, nrLetras, mensagensDoDoutor;

templatesRef.once("value", function (snapshot) {
	imgTitle = snapshot.val().imgname,
		input = snapshot.val().input,
		nrLetras = snapshot.val().nrLetras,
		mensagensDoDoutor = snapshot.val().mensagens
	start();
});


function customEnterVR() {
	var scene = document.querySelector('a-scene');
	if (scene) {
		if (scene.hasLoaded) {
			scene.enterVR();
		} else {
			scene.addEventListener('loaded', scene.enterVR);
		}
	}
}


function start() {
	//document.addEventListener('mouseup', customEnterVR);	// 
	var c;
	var str = "";
	for (var i = 0; i < input.length; i++) {
		c = input.charAt(i);

		if (c == 'ã' || c == 'á' || c == 'à' || c == 'â') c = 'a';
		else if (c == 'Ã' || c == 'Á' || c == 'À' || c == 'Â') c = 'a';
		else if (c == 'é' || c == 'è') c = 'e';
		else if (c == 'É' || c == 'È') c = 'E';
		else if (c == 'í' || c == 'ì') c = 'i';
		else if (c == 'Í' || c == 'Ì') c = 'I';
		else if (c == 'ó' || c == 'õ') c = 'o';
		else if (c == 'Ó' || c == 'Õ') c = 'O';
		else if (c == 'ú' || c == 'ù') c = 'u';
		else if (c == 'ú' || c == 'Ù') c = 'U';

		str += c;
	}
	input = str;
	//console.log(input);
	nrLetters = input.length;


	sceneEl = document.querySelector('#nome');
	//console.log(nrLetters);
	inserirImagem();
	inserirNome();
	esconderLetras();
	criarAlfabeto();
	ocultarAlfabeto();

	//console.log(escondePosicao);

	if (letra0 != null && escondePosicao.includes(0))
		letra0.addEventListener('click', function () {
			clicado(letra0, 0);
		});

	if (letra1 != null && escondePosicao.includes(1))
		letra1.addEventListener('click', function () {
			clicado(letra1, 1);
		});

	if (letra2 != null && escondePosicao.includes(2))
		letra2.addEventListener('click', function () {
			clicado(letra2, 2);
		});

	if (letra3 != null && escondePosicao.includes(3))
		letra3.addEventListener('click', function () {
			clicado(letra3, 3);
		});

	if (letra4 != null && escondePosicao.includes(4))
		letra4.addEventListener('click', function () {
			clicado(letra4, 4);
		});

	if (letra5 != null && escondePosicao.includes(5))
		letra5.addEventListener('click', function () {
			clicado(letra5, 5);
		});

	if (letra6 != null && escondePosicao.includes(6))
		letra6.addEventListener('click', function () {
			clicado(letra6, 6);
		});

	if (letra7 != null && escondePosicao.includes(7))
		letra7.addEventListener('click', function () {
			clicado(letra7, 7);
		});

	if (letra8 != null && escondePosicao.includes(8))
		letra8.addEventListener('click', function () {
			clicado(letra8, 8);
		});

	if (letra9 != null && escondePosicao.includes(9))
		letra9.addEventListener('click', function () {
			clicado(letra9, 9);
		});

	if (letra10 != null && escondePosicao.includes(10))
		letra10.addEventListener('click', function () {
			clicado(letra10, 10);
		});

	if (letra11 != null && escondePosicao.includes(11))
		letra11.addEventListener('click', function () {
			clicado(letra11, 11);
		});

	if (letra12 != null && escondePosicao.includes(12))
		letra12.addEventListener('click', function () {
			clicado(letra12, 12);
		});

	if (letra13 != null && escondePosicao.includes(13))
		letra13.addEventListener('click', function () {
			clicado(letra13, 13);
		});

	if (letra14 != null && escondePosicao.includes(14))
		letra14.addEventListener('click', function () {
			clicado(letra14, 14);
		});

	if (letra15 != null && escondePosicao.includes(15))
		letra15.addEventListener('click', function () {
			clicado(letra15, 15);
		});

	if (letra16 != null && escondePosicao.includes(16))
		letra16.addEventListener('click', function () {
			clicado(letra16, 16);
		});

	if (letra17 != null && escondePosicao.includes(17))
		letra17.addEventListener('click', function () {
			clicado(letra17, 17);
		});

	if (letra18 != null && escondePosicao.includes(18))
		letra18.addEventListener('click', function () {
			clicado(letra18, 18);
		});

	if (letra19 != null && escondePosicao.includes(19))
		letra19.addEventListener('click', function () {
			clicado(letra19, 19);
		});

	if (letra20 != null && escondePosicao.includes(20))
		letra20.addEventListener('click', function () {
			clicado(letra20, 20);
		});

	if (letra21 != null && escondePosicao.includes(21))
		letra21.addEventListener('click', function () {
			clicado(letra21, 21);
		});

	if (letra22 != null && escondePosicao.includes(22))
		letra22.addEventListener('click', function () {
			clicado(letra22, 22);
		});

	if (letra23 != null && escondePosicao.includes(23))
		letra23.addEventListener('click', function () {
			clicado(letra23, 23);
		});

	if (letra24 != null && escondePosicao.includes(24))
		letra24.addEventListener('click', function () {
			clicado(letra24, 24);
		});

	if (letra25 != null && escondePosicao.includes(25))
		letra25.addEventListener('click', function () {
			clicado(letra25, 25);
		});

	if (letra26 != null && escondePosicao.includes(26))
		letra26.addEventListener('click', function () {
			clicado(letra26, 26);
		});

	if (letra27 != null && escondePosicao.includes(27))
		letra27.addEventListener('click', function () {
			clicado(letra27, 27);
		});

	if (letra28 != null && escondePosicao.includes(28))
		letra28.addEventListener('click', function () {
			clicado(letra28, 28);
		});

	if (letra29 != null && escondePosicao.includes(29))
		letra29.addEventListener('click', function () {
			clicado(letra29, 29);
		});

	if (letra30 != null && escondePosicao.includes(30))
		letra30.addEventListener('click', function () {
			clicado(letra30, 30);
		});

	if (letra31 != null && escondePosicao.includes(31))
		letra31.addEventListener('click', function () {
			clicado(letra31, 31);
		});




};

function clicado(letraSelecionada, n) {
	if (selected) {
		antigaLetraSelecionada.setAttribute('material', 'color', 'white');
	}

	letraSelecionada.setAttribute('material', 'color', 'black');
	antigaLetraSelecionada = letraSelecionada;
	selected = true;
	var id;

	if (escondePosicao.includes(n))
		mostrarAlfabeto();

	A.addEventListener('click', function () {
		g = A.getAttribute('text', 'value');
		id = letraSelecionada.getAttribute('text', 'value');




		if (g.value === id.value || g.value === id.value.toUpperCase()) {
			//letraSelecionada.setAttribute('text', 'value', id);
			letraSelecionada.setAttribute('material', 'opacity', '0');
			letraSelecionada.setAttribute('text', 'opacity', '1');
			letraSelecionada.setAttribute('text', 'baseline', 'center');
			letraSelecionada.setAttribute('text', 'width', '4');
			escondePosicao.remove(n);
			ocultarAlfabeto(); selected = false; escondePosicao.remove(n); checkIfDone();
		}
	});

	B.addEventListener('click', function () {
		g = B.getAttribute('text', 'value');
		id = letraSelecionada.getAttribute('text', 'value');




		if (g.value === id.value || g.value === id.value.toUpperCase()) {
			//letraSelecionada.setAttribute('text', 'value', id);
			letraSelecionada.setAttribute('material', 'opacity', '0');
			letraSelecionada.setAttribute('text', 'opacity', '1');
			letraSelecionada.setAttribute('text', 'baseline', 'center');
			letraSelecionada.setAttribute('text', 'width', '4');
			escondePosicao.remove(n);
			ocultarAlfabeto(); selected = false; escondePosicao.remove(n); checkIfDone();
		}
	});

	C.addEventListener('click', function () {
		g = C.getAttribute('text', 'value');
		id = letraSelecionada.getAttribute('text', 'value');




		if (g.value === id.value || g.value === id.value.toUpperCase()) {
			//letraSelecionada.setAttribute('text', 'value', id);
			letraSelecionada.setAttribute('material', 'opacity', '0');
			letraSelecionada.setAttribute('text', 'opacity', '1');
			letraSelecionada.setAttribute('text', 'baseline', 'center');
			letraSelecionada.setAttribute('text', 'width', '4');
			escondePosicao.remove(n);
			ocultarAlfabeto(); selected = false; escondePosicao.remove(n); checkIfDone();
		}
	});

	D.addEventListener('click', function () {
		g = D.getAttribute('text', 'value');
		id = letraSelecionada.getAttribute('text', 'value');




		if (g.value === id.value || g.value === id.value.toUpperCase()) {
			//letraSelecionada.setAttribute('text', 'value', id);
			letraSelecionada.setAttribute('material', 'opacity', '0');
			letraSelecionada.setAttribute('text', 'opacity', '1');
			letraSelecionada.setAttribute('text', 'baseline', 'center');
			letraSelecionada.setAttribute('text', 'width', '4');
			escondePosicao.remove(n);
			ocultarAlfabeto(); selected = false; escondePosicao.remove(n); checkIfDone();
		}
	});

	E.addEventListener('click', function () {
		g = E.getAttribute('text', 'value');
		id = letraSelecionada.getAttribute('text', 'value');




		if (g.value === id.value || g.value === id.value.toUpperCase()) {
			//letraSelecionada.setAttribute('text', 'value', id);
			letraSelecionada.setAttribute('material', 'opacity', '0');
			letraSelecionada.setAttribute('text', 'opacity', '1');
			letraSelecionada.setAttribute('text', 'baseline', 'center');
			letraSelecionada.setAttribute('text', 'width', '4');
			escondePosicao.remove(n);
			ocultarAlfabeto(); selected = false; escondePosicao.remove(n); checkIfDone();
		}
	});

	F.addEventListener('click', function () {
		g = F.getAttribute('text', 'value');
		id = letraSelecionada.getAttribute('text', 'value');




		if (g.value === id.value || g.value === id.value.toUpperCase()) {
			//letraSelecionada.setAttribute('text', 'value', id);
			letraSelecionada.setAttribute('material', 'opacity', '0');
			letraSelecionada.setAttribute('text', 'opacity', '1');
			letraSelecionada.setAttribute('text', 'baseline', 'center');
			letraSelecionada.setAttribute('text', 'width', '4');
			escondePosicao.remove(n);
			ocultarAlfabeto(); selected = false; escondePosicao.remove(n); checkIfDone();
		}
	});

	G.addEventListener('click', function () {
		g = G.getAttribute('text', 'value');
		id = letraSelecionada.getAttribute('text', 'value');




		if (g.value === id.value || g.value === id.value.toUpperCase()) {
			//letraSelecionada.setAttribute('text', 'value', id);
			letraSelecionada.setAttribute('material', 'opacity', '0');
			letraSelecionada.setAttribute('text', 'opacity', '1');
			letraSelecionada.setAttribute('text', 'baseline', 'center');
			letraSelecionada.setAttribute('text', 'width', '4');
			escondePosicao.remove(n);
			ocultarAlfabeto(); selected = false; escondePosicao.remove(n); checkIfDone();
		}
	});

	H.addEventListener('click', function () {
		g = H.getAttribute('text', 'value');
		id = letraSelecionada.getAttribute('text', 'value');




		if (g.value === id.value || g.value === id.value.toUpperCase()) {
			//letraSelecionada.setAttribute('text', 'value', id);
			letraSelecionada.setAttribute('material', 'opacity', '0');
			letraSelecionada.setAttribute('text', 'opacity', '1');
			letraSelecionada.setAttribute('text', 'baseline', 'center');
			letraSelecionada.setAttribute('text', 'width', '4');
			escondePosicao.remove(n);
			ocultarAlfabeto(); selected = false; escondePosicao.remove(n); checkIfDone();
		}
	});

	I.addEventListener('click', function () {
		g = I.getAttribute('text', 'value');
		id = letraSelecionada.getAttribute('text', 'value');




		if (g.value === id.value || g.value === id.value.toUpperCase()) {
			//letraSelecionada.setAttribute('text', 'value', id);
			letraSelecionada.setAttribute('material', 'opacity', '0');
			letraSelecionada.setAttribute('text', 'opacity', '1');
			letraSelecionada.setAttribute('text', 'baseline', 'center');
			letraSelecionada.setAttribute('text', 'width', '4');
			escondePosicao.remove(n);
			ocultarAlfabeto(); selected = false; escondePosicao.remove(n); checkIfDone();
		}
	});

	J.addEventListener('click', function () {
		g = J.getAttribute('text', 'value');
		id = letraSelecionada.getAttribute('text', 'value');




		if (g.value === id.value || g.value === id.value.toUpperCase()) {
			//letraSelecionada.setAttribute('text', 'value', id);
			letraSelecionada.setAttribute('material', 'opacity', '0');
			letraSelecionada.setAttribute('text', 'opacity', '1');
			letraSelecionada.setAttribute('text', 'baseline', 'center');
			letraSelecionada.setAttribute('text', 'width', '4');
			escondePosicao.remove(n);
			ocultarAlfabeto(); selected = false; escondePosicao.remove(n); checkIfDone();
		}
	});

	K.addEventListener('click', function () {
		g = K.getAttribute('text', 'value');
		id = letraSelecionada.getAttribute('text', 'value');




		if (g.value === id.value || g.value === id.value.toUpperCase()) {
			//letraSelecionada.setAttribute('text', 'value', id);
			letraSelecionada.setAttribute('material', 'opacity', '0');
			letraSelecionada.setAttribute('text', 'opacity', '1');
			letraSelecionada.setAttribute('text', 'baseline', 'center');
			letraSelecionada.setAttribute('text', 'width', '4');
			escondePosicao.remove(n);
			ocultarAlfabeto(); selected = false; escondePosicao.remove(n); checkIfDone();
		}
	});

	L.addEventListener('click', function () {
		g = L.getAttribute('text', 'value');
		id = letraSelecionada.getAttribute('text', 'value');




		if (g.value === id.value || g.value === id.value.toUpperCase()) {
			//letraSelecionada.setAttribute('text', 'value', id);
			letraSelecionada.setAttribute('material', 'opacity', '0');
			letraSelecionada.setAttribute('text', 'opacity', '1');
			letraSelecionada.setAttribute('text', 'baseline', 'center');
			letraSelecionada.setAttribute('text', 'width', '4');
			escondePosicao.remove(n);
			ocultarAlfabeto(); selected = false; escondePosicao.remove(n); checkIfDone();
		}
	});

	M.addEventListener('click', function () {
		g = M.getAttribute('text', 'value');
		id = letraSelecionada.getAttribute('text', 'value');




		if (g.value === id.value || g.value === id.value.toUpperCase()) {
			//letraSelecionada.setAttribute('text', 'value', id);
			letraSelecionada.setAttribute('material', 'opacity', '0');
			letraSelecionada.setAttribute('text', 'opacity', '1');
			letraSelecionada.setAttribute('text', 'baseline', 'center');
			letraSelecionada.setAttribute('text', 'width', '4');
			escondePosicao.remove(n);
			ocultarAlfabeto(); selected = false; escondePosicao.remove(n); checkIfDone();
		}
	});

	N.addEventListener('click', function () {
		g = N.getAttribute('text', 'value');
		id = letraSelecionada.getAttribute('text', 'value');




		if (g.value === id.value || g.value === id.value.toUpperCase()) {
			//letraSelecionada.setAttribute('text', 'value', id);
			letraSelecionada.setAttribute('material', 'opacity', '0');
			letraSelecionada.setAttribute('text', 'opacity', '1');
			letraSelecionada.setAttribute('text', 'baseline', 'center');
			letraSelecionada.setAttribute('text', 'width', '4');
			escondePosicao.remove(n);
			ocultarAlfabeto(); selected = false; escondePosicao.remove(n); checkIfDone();
		}
	});

	O.addEventListener('click', function () {
		g = O.getAttribute('text', 'value');
		id = letraSelecionada.getAttribute('text', 'value');




		if (g.value === id.value || g.value === id.value.toUpperCase()) {
			//letraSelecionada.setAttribute('text', 'value', id);
			letraSelecionada.setAttribute('material', 'opacity', '0');
			letraSelecionada.setAttribute('text', 'opacity', '1');
			letraSelecionada.setAttribute('text', 'baseline', 'center');
			letraSelecionada.setAttribute('text', 'width', '4');
			escondePosicao.remove(n);
			ocultarAlfabeto(); selected = false; escondePosicao.remove(n); checkIfDone();
		}
	});

	P.addEventListener('click', function () {
		g = P.getAttribute('text', 'value');
		id = letraSelecionada.getAttribute('text', 'value');




		if (g.value === id.value || g.value === id.value.toUpperCase()) {
			//letraSelecionada.setAttribute('text', 'value', id);
			letraSelecionada.setAttribute('material', 'opacity', '0');
			letraSelecionada.setAttribute('text', 'opacity', '1');
			letraSelecionada.setAttribute('text', 'baseline', 'center');
			letraSelecionada.setAttribute('text', 'width', '4');
			escondePosicao.remove(n);
			ocultarAlfabeto(); selected = false; escondePosicao.remove(n); checkIfDone();
		}
	});

	Q.addEventListener('click', function () {
		g = Q.getAttribute('text', 'value');
		id = letraSelecionada.getAttribute('text', 'value');




		if (g.value === id.value || g.value === id.value.toUpperCase()) {
			//letraSelecionada.setAttribute('text', 'value', id);
			letraSelecionada.setAttribute('material', 'opacity', '0');
			letraSelecionada.setAttribute('text', 'opacity', '1');
			letraSelecionada.setAttribute('text', 'baseline', 'center');
			letraSelecionada.setAttribute('text', 'width', '4');
			escondePosicao.remove(n);
			ocultarAlfabeto(); selected = false; escondePosicao.remove(n); checkIfDone();
		}
	});

	R.addEventListener('click', function () {
		g = R.getAttribute('text', 'value');
		id = letraSelecionada.getAttribute('text', 'value');




		if (g.value === id.value || g.value === id.value.toUpperCase()) {
			//letraSelecionada.setAttribute('text', 'value', id);
			letraSelecionada.setAttribute('material', 'opacity', '0');
			letraSelecionada.setAttribute('text', 'opacity', '1');
			letraSelecionada.setAttribute('text', 'baseline', 'center');
			letraSelecionada.setAttribute('text', 'width', '4');
			escondePosicao.remove(n);
			ocultarAlfabeto(); selected = false; escondePosicao.remove(n); checkIfDone();
		}
	});

	S.addEventListener('click', function () {
		g = S.getAttribute('text', 'value');
		id = letraSelecionada.getAttribute('text', 'value');




		if (g.value === id.value || g.value === id.value.toUpperCase()) {
			//letraSelecionada.setAttribute('text', 'value', id);
			letraSelecionada.setAttribute('material', 'opacity', '0');
			letraSelecionada.setAttribute('text', 'opacity', '1');
			letraSelecionada.setAttribute('text', 'baseline', 'center');
			letraSelecionada.setAttribute('text', 'width', '4');
			escondePosicao.remove(n);
			ocultarAlfabeto(); selected = false; escondePosicao.remove(n); checkIfDone();
		}
	});

	T.addEventListener('click', function () {
		g = T.getAttribute('text', 'value');
		id = letraSelecionada.getAttribute('text', 'value');




		if (g.value === id.value || g.value === id.value.toUpperCase()) {
			//letraSelecionada.setAttribute('text', 'value', id);
			letraSelecionada.setAttribute('material', 'opacity', '0');
			letraSelecionada.setAttribute('text', 'opacity', '1');
			letraSelecionada.setAttribute('text', 'baseline', 'center');
			letraSelecionada.setAttribute('text', 'width', '4');
			escondePosicao.remove(n);
			ocultarAlfabeto(); selected = false; escondePosicao.remove(n); checkIfDone();
		}
	});

	U.addEventListener('click', function () {
		g = U.getAttribute('text', 'value');
		id = letraSelecionada.getAttribute('text', 'value');




		if (g.value === id.value || g.value === id.value.toUpperCase()) {
			//letraSelecionada.setAttribute('text', 'value', id);
			letraSelecionada.setAttribute('material', 'opacity', '0');
			letraSelecionada.setAttribute('text', 'opacity', '1');
			letraSelecionada.setAttribute('text', 'baseline', 'center');
			letraSelecionada.setAttribute('text', 'width', '4');
			escondePosicao.remove(n);
			ocultarAlfabeto(); selected = false; escondePosicao.remove(n); checkIfDone();
		}
	});

	V.addEventListener('click', function () {
		g = V.getAttribute('text', 'value');
		id = letraSelecionada.getAttribute('text', 'value');




		if (g.value === id.value || g.value === id.value.toUpperCase()) {
			//letraSelecionada.setAttribute('text', 'value', id);
			letraSelecionada.setAttribute('material', 'opacity', '0');
			letraSelecionada.setAttribute('text', 'opacity', '1');
			letraSelecionada.setAttribute('text', 'baseline', 'center');
			letraSelecionada.setAttribute('text', 'width', '4');
			escondePosicao.remove(n);
			ocultarAlfabeto(); selected = false; escondePosicao.remove(n); checkIfDone();
		}
	});

	W.addEventListener('click', function () {
		g = W.getAttribute('text', 'value');
		id = letraSelecionada.getAttribute('text', 'value');




		if (g.value === id.value || g.value === id.value.toUpperCase()) {
			//letraSelecionada.setAttribute('text', 'value', id);
			letraSelecionada.setAttribute('material', 'opacity', '0');
			letraSelecionada.setAttribute('text', 'opacity', '1');
			letraSelecionada.setAttribute('text', 'baseline', 'center');
			letraSelecionada.setAttribute('text', 'width', '4');
			escondePosicao.remove(n);
			ocultarAlfabeto(); selected = false; escondePosicao.remove(n); checkIfDone();
		}
	});

	X.addEventListener('click', function () {
		g = X.getAttribute('text', 'value');
		id = letraSelecionada.getAttribute('text', 'value');




		if (g.value === id.value || g.value === id.value.toUpperCase()) {
			//letraSelecionada.setAttribute('text', 'value', id);
			letraSelecionada.setAttribute('material', 'opacity', '0');
			letraSelecionada.setAttribute('text', 'opacity', '1');
			letraSelecionada.setAttribute('text', 'baseline', 'center');
			letraSelecionada.setAttribute('text', 'width', '4');
			escondePosicao.remove(n);
			ocultarAlfabeto(); selected = false; escondePosicao.remove(n); checkIfDone();
		}
	});

	Y.addEventListener('click', function () {
		g = Y.getAttribute('text', 'value');
		id = letraSelecionada.getAttribute('text', 'value');




		if (g.value === id.value || g.value === id.value.toUpperCase()) {
			//letraSelecionada.setAttribute('text', 'value', id);
			letraSelecionada.setAttribute('material', 'opacity', '0');
			letraSelecionada.setAttribute('text', 'opacity', '1');
			letraSelecionada.setAttribute('text', 'baseline', 'center');
			letraSelecionada.setAttribute('text', 'width', '4');
			escondePosicao.remove(n);
			ocultarAlfabeto(); selected = false; escondePosicao.remove(n); checkIfDone();
		}
	});

	Z.addEventListener('click', function () {
		g = Y.getAttribute('text', 'value');
		id = letraSelecionada.getAttribute('text', 'value');




		if (g.value === id.value || g.value === id.value.toUpperCase()) {
			//letraSelecionada.setAttribute('text', 'value', id);
			letraSelecionada.setAttribute('material', 'opacity', '0');
			letraSelecionada.setAttribute('text', 'opacity', '1');
			letraSelecionada.setAttribute('text', 'baseline', 'center');
			letraSelecionada.setAttribute('text', 'width', '4');
			escondePosicao.remove(n);
			ocultarAlfabeto(); selected = false; escondePosicao.remove(n); checkIfDone();
		}
	});


	checkIfDone();
};

function inserirImagem() {
	s = document.querySelector('a-scene');
	var entityFotografia = s.querySelector('#fotografia');

	// read image
	var spaceRef = storageRef.child('templates/' + imgTitle);
	var path = spaceRef.fullPath;

	console.log(path);
	console.log(spaceRef.name);
	console.log(spaceRef.bucket);

	storageRef.child('templates/' + imgTitle).getDownloadURL().then(function (url) {
		var test = url;
		entityFotografia.setAttribute('src', test);
	}).catch(function (error) {

	});



	var entityBloco = s.querySelector('#nome');
	entityBloco.setAttribute('material', 'opacity: 0');

};

function inserirNome() {
	arrayLetters = input.split('');

	for (var i = 0; i < arrayLetters.length; i++) {
		entity.push(document.createElement('a-entity'));
		entity[i].setAttribute('id', "letra" + i);
		entity[i].setAttribute('geometry', {
			primitive: 'plane',
			width: 0.2,
			height: 0.2
		});
		entity[i].setAttribute('material', {
			color: 'white',
			opacity: 0
		});
		entity[i].setAttribute('position', x + ' ' + y + ' 0');
		entity[i].setAttribute('text', {
			value: arrayLetters[i],
			color: 'black',
			width: 4,
			align: 'center'
		});

		if (arrayLetters[i] == ' ') {
			entity[i].setAttribute('visible', 'false');
			entity[i].setAttribute('material', 'opacity: 0');
			entity[i].setAttribute('id', "letra" + i);
			x = -1.15;
			y -= 0.25;
		}

		//
		sceneEl.appendChild(entity[i]);
		//console.log(entity[i]);

		x += 0.25;
	}
};

function esconderLetras() {
	letrasEscondidas = [];

	/* nao deixa a posicao de esconder ser a mesma */
	for (var i = 0; i < nrLetras; i++) {
		var tmp = Math.floor(Math.random() * (input.length));

		while (arrayLetters[tmp] == " ") {                  //previne que a letra a ser escondida seja um espaco
			tmp = Math.floor(Math.random() * (input.length));
		}

		if (escondePosicao.length == 0) {                 //se array tiver limpo, poe
			escondePosicao[i] = tmp;
		} else {                                             //previne repeticao dentro do array
			if (escondePosicao.includes(tmp)) {
				i--;
			}
			else {
				escondePosicao[i] = tmp;
			}
		}
	}

	//    var id;
	for (var i = 0; i < escondePosicao.length; i++) {
		entity[escondePosicao[i]].setAttribute('material', 'opacity: 1');
		entity[escondePosicao[i]].setAttribute('text', 'opacity', '0');
		entity[escondePosicao[i]].setAttribute('text', 'baseline', 'top');
		entity[escondePosicao[i]].setAttribute('text', 'width', '0');
		//sceneEl.appendChild(entity[i]);
	}

};

function criarAlfabeto() {
	var c = 0;
	y -= 0.5;
	x = -0.9;

	for (var i = nrLetters; i < nrLetters + 26; i++) {
		entity.push(document.createElement('a-entity'));
		entity[i].setAttribute('id', letra(c));
		entity[i].setAttribute('geometry', {
			primitive: 'plane',
			width: 0.2,
			height: 0.2
		});
		entity[i].setAttribute('material', 'color: white');
		entity[i].setAttribute('position', x + ' ' + y + ' 0');
		entity[i].setAttribute('text', {
			value: letra(c),
			color: 'black',
			width: 4,
			align: 'center'
		});

		if (c == 8 || c == 17) {
			x = -1.15;
			y -= 0.25;
		}

		//
		sceneEl.appendChild(entity[i]);
		//console.log(entity[i]);

		x += 0.25;
		c++;
	}
};

function letra(c) {
	return String.fromCharCode(65 + c);
};

function ocultarAlfabeto() {
	for (var i = nrLetters; i < nrLetters + 26; i++) {
		entity[i].setAttribute('visible', false);
	}
}

function mostrarAlfabeto() {
	for (var i = nrLetters; i < nrLetters + 26; i++) {
		entity[i].setAttribute('visible', true);
	}
}


/*Shuffles array*/
function shuffle(a) {
	var j, x, i;
	for (i = a.length; i; i--) {
		j = Math.floor(Math.random() * i);
		x = a[i - 1];
		a[i - 1] = a[j];
		a[j] = x;
	}
};

function removerCorVermelha(ent) {
	ent.setAttribute('material', 'color: white');
};

function checkIfDone() {
	//console.log(escondePosicao + "   " + escondePosicao.length);
	if (escondePosicao.length == 0) {

		s = document.querySelector('a-scene');
		var entityFotografia = s.querySelector('#fotografia');
		entityFotografia.setAttribute('visible', 'false');

		var v = sceneEl.querySelectorAll('a-entity');
		//console.log(v);

		for (var i = 0; i < v.length; i++) {
			v[i].parentNode.removeChild(v[i]);
		}

		var a = document.createElement('a-entity');
		a.setAttribute('id', "fim");
		a.setAttribute('geometry', {
			primitive: 'plane',
			width: 2.5,
			height: 1
		});
		a.setAttribute('material', {
			color: 'green'
		});
		a.setAttribute('position', '0  2 -1.5');
		a.setAttribute('text', {
			value: "MUITO BEM! CONCLUIU A TAREFA COM SUCESSO!\n\nClique aqui para sair.",
			color: 'white'
		});

		//
		sceneEl.appendChild(a);

		a.addEventListener('click', function () {
			console.log("teste");
			window.location.replace("../../../patients_side/dashboardVR.html");
		});
	}
};



Array.prototype.remove = function () {
	var what, a = arguments, L = a.length, ax;
	while (L && this.length) {
		what = a[--L];
		while ((ax = this.indexOf(what)) !== -1) {
			this.splice(ax, 1);
		}
	}
	return this;
};

