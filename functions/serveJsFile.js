const fs = require('fs');
const jwt = require('jsonwebtoken');

exports.handler = async function (event, context) {
  const secretKey = '123456789'; // Replace with a secure secret key
  const allowedDomains = ['https://www.codeadvice.xyz', 'https://subdomain.example.com'];

  // Get the token from the request headers
  const token = event.headers.authorization;

  try {
    // Verify the token
    const decoded = jwt.verify(token, secretKey);

    // Check if the domain is authorized
    const origin = decoded.origin;
    if (allowedDomains.includes(origin)) {
      // Read and serve the JavaScript file
      const jsCode = fs.readFileSync('/src/V3-Latest.js', 'utf-8');

      return {
        statusCode: 200,
        body: jsCode,
        headers: {
          'Content-Type': 'application/javascript',
        },
      };
    } else {
      return {
        statusCode: 403,
        body: JSON.stringify({ error: 'Unauthorized domain' }),
      };
    }
  } catch (error) {
    return {
      statusCode: 401,
      body: JSON.stringify({ error: 'Unauthorized' }),
    };
  }
};
