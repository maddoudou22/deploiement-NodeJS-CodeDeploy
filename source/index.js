
// Note : cette fonction Lambda a une API Gateway comme trigger

const AWSXRay = require('aws-xray-sdk');
const AWS = require('aws-sdk');
//const AWS = AWSXRay.captureAWS(require('aws-sdk'));

const AWS_region = process.env.AWS_REGION;
AWS.config.update({region: AWS_region});


exports.handler = (event, context, callback) => {
    
	// Création d'un subsegment X-Ray permettant de suivre l'execution d'une partie du code et remonter des annotations dans les traces X-Ray :
    AWSXRay.captureFunc('RecupListeApplications', function(subsegment){
        subsegment.addAnnotation('traceGlobale', `Evolution_Prix_Depuis_Lambda`);
        subsegment.addMetadata('metaGlobale', `Evolution_Prix_Depuis_Lambda`);

		var tableauProduits = [];
		var listeElementsAnnotation = '';
		const dynamoDB_table = process.env.DYNAMODB_TABLE_NAME; // Recuperation du nom de la table DynamoDB contenant la liste des applications depuis les variables d'environnement

		//Exemple de récupération de paramètres s'ils étaient transmis dans l'URL :
		//JSON.parse(event.body).parametre) 
			// Simulation d'erreur
			//var erreur = 1/0;
		console.log("headers : " + event.headers);
		
		// Recuperation du message envoyé en JSON :
		var data = JSON.stringify(event);
		//console.log("request: " + data);

		// Utilisation de X-Ray pour tracer l'appel vers DynamoDB :
		const ddb = AWSXRay.captureAWSClient(new AWS.DynamoDB());
	
		// Préparation de la requête DynamoDB :
		var params = {
			TableName: dynamoDB_table,
		};

		// Exécution de la requête DynamoDB :
		ddb.scan(params, function(err, data) {
			if (err) {
				console.log("Error", err);
			} else {
				console.log("Success");
				//console.log("data" + JSON.parse(data));
				// Traitement de chacun des items retournés par DynamoDB :
				data.Items.forEach(function(element, index, array) {
					console.log("Application : ", element.ID_produit.N);
					tableauProduits.push(element.ID_produit.N);
					listeElementsAnnotation += element.ID_produit.N + ";";
				});
                
				// Préparation du corps de la réponse GET à renvoyer au client (vu que cette fonction Lambda a été déclenchée via une requête faite à une API gérée par une API Gateway de AWS) :
				var responseBody = {
					message: 'my response',
					//receivedkey2: event.key2,     // Exemple s'il fallait se servir des paramètres de la requête JSON en entrée
					listProduits: tableauProduits
					//nouvelAttribut: 'coucou'
				};
				
				// Préparation de la réponse finale (corps + header) à renvoyer au client :
				var response = {
					statusCode: 200,
					body: responseBody
				};
				
				subsegment.addAnnotation('listeRetournee', listeElementsAnnotation);
				// La récupération de la liste des applications est terminée : fermeture du subsegment X-ray, sinon les informations le concernant ne sont pas envoyées à X-ray
				subsegment.close();
				
				// Renvoie de la réponse au format http au client ayant fait l'appel à la fonction (forwardée par l'API Gateway) : 
				callback(null, response);
			}
		});

	});
};