const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  try {
    // Ensure the body is not empty before parsing
    const requestBody = event.body || '{}';
    const { domain } = JSON.parse(requestBody);

    // Verify the domain using the verifyDomain function
    const response = await fetch(`${process.env.URL}/.netlify/functions/verifyDomain`, {
      method: 'POST',
      body: JSON.stringify({ domain }),
    });

    if (response.ok) {
      // Domain is authorized, serve the JavaScript file
      return {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*', // Adjust this based on your requirements
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Allow-Methods': 'POST',
        },
        body: 'console.log("Your JavaScript code");',
      };
    } else {
      // Domain is not authorized, return an error or placeholder script
      return {
        statusCode: 403,
        headers: {
          'Access-Control-Allow-Origin': '*', // Adjust this based on your requirements
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Allow-Methods': 'POST',
        },
        body: 'console.error("Unauthorized domain.");',
      };
    }
  } catch (error) {
    // Handle any errors, log them, and return an appropriate response
    console.error('Error in serveJsFile handler:', error);

    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*', // Adjust this based on your requirements
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST',
      },
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
};
