/*!
 * To-do List feito com Javascript
 * Este sistema foi desenvoldo por Leynilson Harden
 * Este sistema é do tipo "CRUD" mas sem o Update, mas será implementado no futuro 'eu acho😅'
 *
 * 
 * =========
 *  CONTENT
 * =========
 *
 * --------------------------------------------------------------------------
 * .A	Verifa se há algum modo guardado e Adiciona o modo guardado 
 * na memoria do browser.
 *.A.1		- Muda o modo ( dia ou noite ) e guarda na memória do browser.
 * --------------------------------------------------------------------------
 * .B	Ajusta a altura do ul#mylist.
 * .B.1 	- 	Actualiza o pagina para que a altura do ul#mylist seja ajustada.
 * 						se este for diferente do modo predifinido ( dia ).
 * .B.2		- 	Muda o modo(escuro ou claro) e guarda na memória do browser.
 * --------------------------------------------------------------------------
 * .C Verifica se há dados na memória do browser.
 * --------------------------------------------------------------------------
 * .D Mostra os dados na página.
 * --------------------------------------------------------------------------
 * .E	CREATE.
 * .E.1 	-		STORE.
 * .E.1.1	-		Guardar os dados na memória do browser.
 * .E.1.2	-		adiciona o valor do input no inicio do array.
 * .E.1.3	- 	Actualiza a página sempre que for guardado um valor.
 * --------------------------------------------------------------------------
 * .F DELETE
 * --------------------------------------------------------------------------
 * .G	Cria um elemento svg.
 * --------------------------------------------------------------------------
 *  Date: 2019-08-24T19:40Z
 */

 //	.A	Verifa se há algum modo guardado e Adiciona o modo guardado na memoria do browser.
 if (localStorage.modo === undefined) {
 	localStorage.modo = document.body.className;
 } else {
 	if (document.body.className != localStorage.modo) {
 		document.body.classList.remove(document.body.className);
 		document.body.classList.add(localStorage.modo);
 	}
 }
 
 //	Inicia o codigo quando o document for carregado.
 document.body.onload = () => {

	 
	// Recebe os dados guardados na memória do browser.
	if (localStorage.dados !== undefined) var todos = JSON.parse(localStorage.dados);
	
	//	.B	Ajusta a altura do ul#mylist.
	var mylist = document.querySelector('#mylist'),
		t = document.querySelector('#Todo').offsetHeight,
		g = document.querySelector('.group').offsetHeight,
		ig = document.querySelector('.input-group').offsetHeight,
		h = t - g - ig - 110;
	mylist.style.maxHeight = `${h}px`;

	mostrarDados();

	window.addEventListener('resize', e => refresh(e));
	document.querySelector('#modo').addEventListener('click', e => mudarModo());
	document.querySelector('#add').addEventListener('click', e => criarGuardar());
	document.querySelector('input').addEventListener('keydown', e => { if (e.key === "Enter") criarGuardar(); });
	document.querySelectorAll('.del').forEach(x => x.addEventListener('click', e => apagar(e)));
	
	//	.A.1	Muda o modo ( dia ou noite ) e guarda na memória do browser.
	function mudarModo() {

	 	if (localStorage.modo === "noite") {
	 		document.body.classList.remove("noite");
	 		document.body.classList.add("dia");
	 		localStorage.modo = "dia";
	 	} else if (localStorage.modo === "dia") {
	 		document.body.classList.remove("dia");
	 		document.body.classList.add("noite");
	 		localStorage.modo = "noite";
	 	} else {
	 		window.location.reload();
	 		alert("Ups! Algo não esta a funcionar correctamente");
	 	}
	}
	//	.B.1 Actualiza o pagina para que a altura do ul#mylist seja ajustada.
	function refresh(e) {
		var screen = document.body.offsetWidth;
		if (screen > 460 || screen < 460) {
			window.location.reload();
		}
	}
	//	.C	Verifica se há dados na memória do browser.
	//	.D	Mostra os dados na página.
	function mostrarDados() {
		
		//	.C	Verifica se há dados na memória do browser.
		if (localStorage.dados !== undefined) {
			//	.D Mostra os dados na página.
			for (var todo in todos.data) {
				var li = document.createElement('li'),
					p = document.createElement('p'),
					span = document.createElement('span'),
					num = document.createTextNode(parseInt(todo) + 1),
					txt = document.createTextNode(todos.data[todo]);
				p.appendChild(txt);
				span.appendChild(num);
				li.appendChild(p);
				li.appendChild(createSvg());
				li.appendChild(span);
				document.querySelector('#mylist').appendChild(li);
			}
		} else {
			window.alert("Este site utiliza a memória do browser (\"LocalSotorage\")\nCaso esteja desativada o programa deixara de funcionar\n\nInsira alguma coisa a sua lista!");
		}
	}
	//	.E	Create
	function criarGuardar() {
		var inputField = document.querySelector('input'),
			val = inputField.value.toLowerCase().trim();
		if (val !== '') {
			//	.E.1	Store
			if (localStorage.dados === undefined) {
				var dados = {
					data: [val]
				};
				//	.E.1.1	Guardar os dados na memória do browser.
				localStorage.dados = JSON.stringify(dados);
				window.location.reload();
			} else {
				//	.E.1.2	adiciona o valor do input no inicio do array.
				todos.data.unshift(val);
				localStorage.dados = JSON.stringify(todos);
				//	.E.1.3	Actualiza a página sempre que for guardado um valor.
				window.location.reload();
				document.body.style.transition = 'none';
			}
		}
		inputField.value = '';
		document.querySelector('#add').focus();
	}
	//	.F	Delete
	function apagar(e) {

		var elemClicado = e.target.tagName;
		if (elemClicado == "line") {
			var liClicado = e.target.parentNode.parentNode.parentNode,
				pTexto = e.target.parentNode.parentNode.previousSibling.innerText.toLowerCase();
		} else if (elemClicado == "svg") {
			var liClicado = e.target.parentNode.parentNode,
				pTexto = e.target.parentNode.previousSibling.innerText.toLowerCase();
		} else if (elemClicado == "BUTTON") {
			var liClicado = e.target.parentNode,
				pTexto = e.target.previousSibling.innerText.toLowerCase();
		}

		var index = todos.data.indexOf(pTexto);
		if (index >= 0) {
			todos.data.splice(index, 1); // Remove o dado na memoria do browser.
			localStorage.dados = JSON.stringify(todos); // Actualiza os dados na memória.
			document.querySelector('#mylist').removeChild(liClicado); // remove o li na página.
			document.body.style.transition = 'none';
			window.location.reload();
		} else {
			console.warn("erro", index, liClicado, pTexto);
		}
	}
	//	.G	Cria um botão com um svg "X" para apagar 
	function createSvg() {

		var btn = document.createElement('button'),
			svgX = document.createElementNS("http://www.w3.org/2000/svg", 'svg'),
			line1 = document.createElementNS("http://www.w3.org/2000/svg", 'line'),
			line2 = document.createElementNS("http://www.w3.org/2000/svg", 'line');
		btn.classList.add('del');
		svgX.classList.add('feather');
		svgX.classList.add('feather-x');
		svgX.setAttribute('viewbox', '0 0 24 24');
		line1.setAttribute('x1', 18);
		line1.setAttribute('y1', 6);
		line1.setAttribute('x2', 6);
		line1.setAttribute('y2', 18);
		line2.setAttribute('x1', 6);
		line2.setAttribute('y1', 6);
		line2.setAttribute('x2', 18);
		line2.setAttribute('y2', 18);
		svgX.appendChild(line1);
		svgX.appendChild(line2);
		btn.appendChild(svgX);
		return btn;
	}
	
}
