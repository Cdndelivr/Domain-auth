const fs = require('fs');
const jwt = require('jsonwebtoken');

exports.handler = async function (event, context) {
  const secretKey = 'QWERTY123';
  const allowedDomains = ['https://example.com', 'https://subdomain.example.com'];

  const token = event.headers.authorization;

  try {
    const decoded = jwt.verify(token, secretKey);

    const origin = decoded.origin;
    const requestingDomain = decoded.domain;

    if (allowedDomains.includes(origin) && requestingDomain) {
      const jsCode = fs.readFileSync('path/to/src/V3-Latest.js', 'utf-8');

      return {
        statusCode: 200,
        body: jsCode,
        headers: {
          'Content-Type': 'application/javascript',
          'Access-Control-Allow-Origin': origin,
          'Access-Control-Allow-Methods': 'GET',
          'Access-Control-Allow-Headers': 'Authorization',
        },
      };
    } else {
      return {
        statusCode: 403,
        body: JSON.stringify({ error: 'Unauthorized domain or missing domain in token' }),
      };
    }
  } catch (error) {
    return {
      statusCode: 401,
      body: JSON.stringify({ error: 'Unauthorized' }),
    };
  }
};
