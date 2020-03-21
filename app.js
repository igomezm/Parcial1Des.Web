const express = require('express');
const appServer = express();
const newPandemia = require('./pandemia');

var pandemias = [];



appServer.listen(3000, () => {
	console.log('SERVER IS RUNNING ON PORT 3000');
});


appServer.use(express.json());

appServer.get('/', (req, res) => {
	res.send('Servidor Funciona')
});

appServer.post('/curar/:id/:idpais', (req, res) => {
	for (var i = 0; i < pandemias.length; i++) {
		if (pandemias[i].id == req.params.id) {
			for (var j = 0; j < pandemias[i].nPais.length; j++) {
				if (req.params.idpais == pandemias[i].nPais[j].id) {
					var l = parseInt(pandemias[i].nPais[j].recuperados);

					pandemias[i].nPais[j].recuperados = parseInt(pandemias[i].nPais[j].infectados) - parseInt(pandemias[i].nPais[j].muertes) + parseInt(l);
					//pandemias[i].nPais[j].recuperados=pandemias[i].nPais[j].recuperados+l;
					pandemias[i].nPais[j].infectados = 0;
					pandemias[i].encurso = false;
					res.json(pandemias[i]);
				}
			}

			esta = true;
		}
	}

	if (!esta) {
		res.send('No existe una pandemia con ese ID ');
	}


});


appServer.post('/postpandemia', (req, res) => {
	console.log(req.body);
	var pandemia = {};
	pandemia.id = req.body.id;
	pandemia.nombre = req.body.nombre;
	pandemia.sintomas = req.body.sintomas;
	pandemia.recomendaciones = req.body.sintomas;
	pandemia.encurso = req.body.encurso;
	pandemia.nPais = req.body.nPais;

	pandemias.push(pandemia);

	console.log("Pandemia creada:  " + res.json(pandemia));

});


appServer.post('/actpais/:id', (req, res) => {
	var esta = false;
	for (var i = 0; i < pandemias.length; i++) {
		if (pandemias[i].id == req.params.id) {
			for (var j = 0; j < pandemias[i].nPais.length; j++) {
				if (req.body.nombre == pandemias[i].nPais[j].nombre) {
					pandemias[i].nPais[j].infectados = req.body.infectados;
					pandemias[i].nPais[j].recuperados = req.body.recuperados;
					pandemias[i].nPais[j].muertes = req.body.muertes;
					res.json(pandemias[i]);
				}
			}

			esta = true;
		}
	}

	if (!esta) {
		res.send('No existe una pandemia con ese ID ');
	}
});

appServer.post	('/mostrarpandemia/:id', (req, res) => {
	var esta = false;
	var m = 0;
	var i = 0;
	var r = 0;
	for (var i = 0; i < pandemias.length; i++) {
		if (pandemias[i].id == req.params.id) {
			for (var j = 0; j < 2; j++) {
				m += parseInt(pandemias[i].nPais[j].muertes);
				i += parseInt(pandemias[i].nPais[j].infectados);
				r += parseInt(pandemias[i].nPais[j].recuperados);
			}

			res.send(pandemias[i], "Numero de paises infectados: " + pandemias[i].nPais.length +
				"Numero total de infectados: " + i +
				"Numero de total recuperados: " + r +
				"Numero de total muertes: " + m,
				pandemias[i].nPais);

			esta = true;
		}
	}

	if (!esta) {
		res.send('No existe una pandemia con ese ID ');
	}
});

appServer.get('/mostrarpais/:id', (req, res) => {
	var esta = false;
	for (var i = 0; i < pandemias.length; i++) {
		if (pandemias[i].id == req.params.id) {

			res.send(pandemias[i].nPais)

			esta = true;
		}
	}

	if (!esta) {
		res.send('No existe una pandemia con ese ID ');
	}
});
