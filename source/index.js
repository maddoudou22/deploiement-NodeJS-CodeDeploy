exports.handler = async (event) => {

	//var param = JSON.stringify(event.queryStringParameters.param);
	var param = event.queryStringParameters.param;
	if (param == 'fail') {
      1;
    }
    
    const response = {
        statusCode: 200,
        body: JSON.stringify('Coucou, ' + param),
    };
    return response;
};
