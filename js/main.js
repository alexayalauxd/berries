"use strict";

if( !mainSyngenta )
    var mainSyngenta = {};

mainSyngenta.init = function(){
    console.log('Init Syngenta Berries...');
}

mainSyngenta.homeSwipper = function(){
    let mySwiper = new Swiper('#HomeSwipper', {
        autoplay: {
            delay: 3000,
        },
        effect: 'fade',
        loop: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            renderBullet: function (index, className) {
                return '<span class="' + className + '">' + (index + 1) + '</span>';
        },
    }
    });
}


window.onload = function(){
    mainSyngenta.init();
    mainSyngenta.homeSwipper();
}








// Validaciones

const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');

const expresiones = {
    name: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    lastname: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	phone: /^\d{8,10}$/ // 7 a 14 numeros.
}

const campos = {
    name: false,
    lastname: false,
	email: false,
	phone: false
}

const validarFormulario = (e) => {
	switch (e.target.name) {
		case "name":
			validarCampo(expresiones.name, e.target, 'name');
        break;
        case "lastname":
			validarCampo(expresiones.lastname, e.target, 'lastname');
		break;
		case "email":
			validarCampo(expresiones.email, e.target, 'email');
		break;
		case "phone":
			validarCampo(expresiones.phone, e.target, 'phone');
		break;
	}
}

const validarCampo = (expresion, input, campo) => {
	if(expresion.test(input.value)){
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle');
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle');
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
		campos[campo] = true;
	} else {
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle');
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle');
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
		campos[campo] = false;
	}
}

inputs.forEach((input) => {
	input.addEventListener('keyup', validarFormulario);
	input.addEventListener('blur', validarFormulario);
});

formulario.addEventListener('submit', (e) => {
	e.preventDefault();

	//POST----- ----- ----- ----- ----- ----- ----- -----

	(async () => {
		const rawResponse = await fetch('https://2o62j44a44.execute-api.us-east-1.amazonaws.com/dev/lead', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({name})
		});
		const content = await rawResponse.json();

		console.log(content);
	})();


	// console.log('Me diste click');

	// const datos = new FormData(formulario);

	// console.log(datos);
	// console.log(datos.get('name'));
	// console.log(datos.get('lastname'));
	// console.log(datos.get('email'));
	// console.log(datos.get('phone'));

	// fetch('https://2o62j44a44.execute-api.us-east-1.amazonaws.com/dev/lead',{
	// 	method: 'POST',
	// 	body: datos
	// })
	// .then( res => res.json())
	// .then( data => {
	// 	console.log(data);
	// })

	// const rawResponse = await fetch('https://2o62j44a44.execute-api.us-east-1.amazonaws.com/dev/lead', {
	// 	method: 'POST',
	// 	headers: {
	// 		'Accept': 'application/json',
	// 		'Content-Type': 'application/json'
	// },
	// 	body: JSON.stringify({a: 1, b: 'Textual content'})
	// });

	// const content = await rawResponse.json()


	const terminos = document.getElementById('terminos');
	if(campos.name && campos.lastname && campos.email && campos.phone && terminos.checked ){
		formulario.reset();

		document.getElementById('formulario__mensaje-exito').classList.add('formulario__mensaje-exito-activo');
		setTimeout(() => {
			document.getElementById('formulario__mensaje-exito').classList.remove('formulario__mensaje-exito-activo');
		}, 5000);

		document.querySelectorAll('.formulario__grupo-correcto').forEach((icono) => {
			icono.classList.remove('formulario__grupo-correcto');
		});
	} else {
		document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
	}


	// const formData = new FormData(this);
	// const searchParams = new URLSearchParams();

	// for (const pair of formData) {
	// 	searchParams.append(pair[0], pair[1]);
	// }

	// fetch('welcome.php', {
	// 	method:'post',
	// 	body: searchParams
	// }). then(function (response) {
	// 	return response.text();
	// }).then(function (text) {
	// 	console.log(text);
	// }).catch(function (error) {
	// 	console.log(error);
	// })

		// const rawResponse = new FormData(formulario);

	// const rawResponse = await fetch('https://2o62j44a44.execute-api.us-east-1.amazonaws.com/dev/lead', {
	// 	method: 'POST',
	// 	headers: {
	// 		'Accept': 'application/json',
	// 		'Content-Type': 'application/json'
	// 	},
	// 	body: JSON.stringify({name})
	// });

	// .then( res => res.json())
	// .then( data => {
	// 	console.log(data);
	// })

	// const content = await rawResponse.json()

});