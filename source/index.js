exports.handler = async (event) => {

	//var param = JSON.stringify(event.queryStringParameters.param);
	var param = event.queryStringParameters.param;
	if (param == 'fail') {
      failure;
    }
    
    const response = {
        statusCode: 200,
        body: JSON.stringify('Hello, ' + param),
    };
    return response;
};
