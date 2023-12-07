const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  const { domain } = JSON.parse(event.body);
  try {
    const { domain } = JSON.parse(event.body);

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
         res.setHeader("Access-Control-Allow-Origin", "*"); // Allow requests from any origin
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST',
      },
      body: 'console.log("Your JavaScript code");',
    };
  } else {
    // Domain is not authorized, return an error or placeholder script
    // Allow requests from your local development environment
    const allowedOrigins = ['http://127.0.0.1:3000'];
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
        'Access-Control-Allow-Origin': '*', // Allow requests from any origin
        'Access-Control-Allow-Origin': '*', // Adjust this based on your requirements
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST',
      },
      body: 'console.error("Unauthorized domain.");',
      body: `console.error("${error.message || 'Request body is empty.'}");`,
    };
  }
};
