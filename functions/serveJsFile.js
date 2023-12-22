const fs = require('fs');
const path = require('path');
const authorizedDomains = require('./domains');

exports.handler = async (event, context) => {
  const { headers } = event;

  if ('origin' in headers) {
    const origin = headers['origin'];

    if (authorizedDomains.includes(origin)) {
      const jsFilePath = path.join(__dirname, 'src/V3-Latest.js');

      try {
        // Read the content of the JavaScript file asynchronously
        const jsCode = await fs.promises.readFile(jsFilePath, 'utf8');

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
        console.error('Error reading JavaScript file:', error);
        return {
          statusCode: 500,
          headers: {
            'Access-Control-Allow-Origin': origin,
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
          },
          body: JSON.stringify({
            error: 'Internal Server Error',
            details: error.message, // Include the error message for debugging
          }),
        };
      }
    }
  }

  console.warn('Unauthorized access attempt. Origin not found in authorized domains.');

  return {
    statusCode: 403,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
    body: JSON.stringify('Unauthorized website access. 😜'),
  };
};
