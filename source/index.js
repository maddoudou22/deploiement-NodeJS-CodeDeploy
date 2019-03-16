
// Note : cette fonction Lambda a une API Gateway comme trigger

exports.handler = (event, context, callback) => {
    
	//Exemple de récupération de paramètres s'ils étaient transmis dans l'URL :
	//JSON.parse(event.body).parametre) 
	// Simulation d'erreur
	//var erreur = 1/0;
	//console.log("body : " + event.body);
		
	// Recuperation du message envoyé en JSON :
	var data = JSON.stringify(event);
	console.log("request: " + "coucou");
};