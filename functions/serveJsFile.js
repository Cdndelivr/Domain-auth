const fetch = require('node-fetch');
const allowedDomains = require('./allowedDomains.json');

exports.handler = async (event, context) => {
  // Check if event.body is empty
  if (!event.body) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Bad Request - Missing request body' }),
    };
  }

  const { domain } = JSON.parse(event.body);

  if (allowedDomains.includes(domain)) {
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
      // Domain verification failed, return an error
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
  } else {
    // Domain is not in the allowed domains list, return an error
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
};
