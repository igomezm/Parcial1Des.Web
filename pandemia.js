const pais = require('./pais');
const pandemia = {
	id: Number,
	nombre: String,
	sintomas: [String],
	recomendaciones: [String],
	encurso: Boolean,
	nPais : [pais]
}

module.exports.pandemia = pandemia;	
