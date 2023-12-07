const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  try {
    const { domain } = JSON.parse(event.body);

    // Allow requests from your local development environment
    const allowedOrigins = ['http://www.codeadvice.xyz'];
    const origin = event.headers.origin || '';
    if (allowedOrigins.includes(origin)) {
      return {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': origin,
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Allow-Methods': 'POST',
        },
        body: 'console.log("Your JavaScript code");',
      };
    } else {
      throw new Error('Unauthorized origin.');
    }
  } catch (error) {
    return {
      statusCode: 403,
      headers: {
        'Access-Control-Allow-Origin': '*', // Adjust this based on your requirements
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST',
      },
      body: `console.error("${error.message || 'Request body is empty.'}");`,
    };
  }
};
