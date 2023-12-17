const fs = require('fs');
const path = require('path');

exports.handler = async (event, context) => {
  const { headers } = event;

  // List of authorized domains
  const authorizedDomains = [
    'https://www.codeadvice.xyz',
    // Add more authorized domains as needed
  ];

  // Check if the 'Origin' header is present
  if ('origin' in headers) {
    const origin = headers['origin'];

    // Check if the origin is in the list of authorized domains
    if (authorizedDomains.includes(origin)) {
      try {
        // Load the content of the bundled JavaScript file
        const jsCode = fs.readFileSync(path.resolve(__dirname, 'bundle.js'), 'utf8');

        return {
          statusCode: 200,
          headers: {
            'Access-Control-Allow-Origin': origin,
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
          },
          body: jsCode,
        };
      } catch (error) {
        console.error('Error reading bundle.js:', error);
        return {
          statusCode: 500,
          body: JSON.stringify({ error: 'Internal Server Error' }),
        };
      }
    }
  }

  // Unauthorized access
  return {
    statusCode: 403,
    body: JSON.stringify({ error: 'Unauthorized' }),
  };
};
