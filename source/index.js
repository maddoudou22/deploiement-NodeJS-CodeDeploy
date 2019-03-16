
// Note : cette fonction Lambda a une API Gateway comme trigger abec le mode 'Lambda proxy integration'

exports.handler = (event, context, callback) => {
    
	//Exemple de récupération de paramètres s'ils étaient transmis dans l'URL :
	//JSON.parse(event.body).parametre) 
	// Simulation d'erreur
	//var erreur = 1/0;
	//console.log("body : " + event.body);
		
	// Recuperation du message envoyé en JSON :
	var data = JSON.stringify(event);
	var val1 = require('querystring').parse(event.val1);
	console.log("val1: " + val1);
	console.log("request: " + "coucou");
};