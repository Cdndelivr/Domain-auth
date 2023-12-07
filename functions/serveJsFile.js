const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  const { domain } = JSON.parse(event.body);

  try {
    const response = await fetch(`${process.env.URL}/.netlify/functions/verifyDomain`, {
      method: 'POST',
      body: JSON.stringify({ domain }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Unauthorized domain.');
    }

    const jsCode = 'console.log("Your JavaScript code");';

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*', // Set this to your actual domain in production
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST',
      },
      body: jsCode,
    };
  } catch (error) {
    return {
      statusCode: 403,
      headers: {
        'Access-Control-Allow-Origin': '*', // Set this to your actual domain in production
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST',
      },
      body: `console.error("${error.message}");`,
    };
  }
};
