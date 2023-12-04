const fetch = require('node-fetch');

exports.handler = async (event, context) => {
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
      body: 'console.log("Your JavaScript code");',
    };
  } else {
    // Domain is not authorized, return an error or placeholder script
    return {
      statusCode: 403,
      body: 'console.error("Unauthorized domain.");',
    };
  }
};
