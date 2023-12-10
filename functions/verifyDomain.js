// functions/verifyDomain.js
exports.handler = async (event, context) => {
  const { domain } = JSON.parse(event.body);

  const headers = {
    'Access-Control-Allow-Origin': '*',  // Adjust this based on your requirements
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST',
  };

  if (event.httpMethod === 'OPTIONS') {
    // Handle CORS preflight request
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  // Your existing logic for domain verification goes here

  if (allowedDomains.includes(domain)) {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: 'Domain is authorized.' }),
    };
  } else {
    return {
      statusCode: 403,
      headers,
      body: JSON.stringify({ message: 'Unauthorized domain.' }),
    };
  }
};
