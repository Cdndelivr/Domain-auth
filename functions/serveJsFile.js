const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  try {
    console.log('Received event:', event);

    const requestBody = event.body;
    console.log('Raw request body:', requestBody);

    const { domain } = JSON.parse(requestBody);
    console.log('Parsed domain:', domain);

    // Verify the domain using the verifyDomain function
    const response = await fetch(`${process.env.URL}/.netlify/functions/verifyDomain`, {
      method: 'POST',
      body: JSON.stringify({ domain }),
    });

    let statusCode, responseBody;

    if (response.ok) {
      // Domain is authorized, serve the JavaScript code
      statusCode = 200;
      responseBody = 'console.log("Your JavaScript code");';
    } else {
      // Domain is not authorized, return an error or placeholder script
      statusCode = 403;
      responseBody = 'console.error("Unauthorized domain.");';
    }

    const headers = {
      'Access-Control-Allow-Origin': '*', // Adjust this based on your requirements
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'POST',
    };

    console.log('Returning response:', { statusCode, headers, responseBody });

    return {
      statusCode,
      headers,
      body: responseBody,
    };
  } catch (error) {
    console.error('Error in serveJsFile handler:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
