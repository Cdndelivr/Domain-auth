const fs = require('fs');

exports.handler = async function (event, context) {
  const allowedDomains = ['https://example.com', 'https://subdomain.example.com'];
  const origin = event.headers.origin;

  if (allowedDomains.includes(origin)) {
    // Read and serve the JavaScript file
    const jsCode = fs.readFileSync('path/to/src/V3-Latest.js', 'utf-8');

    return {
      statusCode: 200,
      body: jsCode,
      headers: {
        'Content-Type': 'application/javascript',
        'Access-Control-Allow-Origin': origin,
      },
    };
  } else {
    return {
      statusCode: 403,
      body: JSON.stringify({ error: 'Unauthorized domain' }),
    };
  }
};
