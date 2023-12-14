// functions/serveJsFile.js

const fs = require('fs');
const jwt = require('jsonwebtoken');

exports.handler = async function (event, context) {
  const secretKey = 'qwerty123';
  const allowedDomains = ['https://example.com', 'https://subdomain.example.com'];

  const token = event.headers.authorization;

  try {
    const decoded = jwt.verify(token, secretKey);

    const origin = decoded.origin;
    if (allowedDomains.includes(origin)) {
      const jsCode = fs.readFileSync('/src/V3-Latest.js', 'utf-8');

      return {
        statusCode: 200,
        body: jsCode,
        headers: {
          'Content-Type': 'application/javascript',
          'Access-Control-Allow-Origin': origin, // Set the correct origin dynamically
          'Access-Control-Allow-Methods': 'GET', // Add other required methods if necessary
          'Access-Control-Allow-Headers': 'Authorization', // Add other required headers if necessary
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
