// functions/serveV3LatestJsFile.js
const fs = require('fs');
const path = require('path');

exports.handler = async (event, context) => {
  const { headers } = event;

  // List of authorized domains
  const authorizedDomains = [
    'https://www.codeadvice.xyz',
    'https://demo-techadvicev4.blogspot.com',
    // Add more authorized domains as needed
  ];

  // Check if the 'Origin' header is present
  if ('origin' in headers) {
    const origin = headers['origin'];

    // Check if the origin is in the list of authorized domains
    if (authorizedDomains.includes(origin)) {
      // Read the content of v3-latest.js and serve it
      const v3LatestPath = path.resolve(__dirname, '/src/v3-latest.js');
      const jsCode = fs.readFileSync(v3LatestPath, 'utf8');

      return {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': origin,
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
        body: jsCode,
      };
    }
  }

  // Unauthorized access
  return {
    statusCode: 403,
    body: JSON.stringify('Unauthorized'),
  };
};
