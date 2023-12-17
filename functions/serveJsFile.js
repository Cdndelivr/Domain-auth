// functions/serveJsFile.js

exports.handler = async (event, context) => {
  const { headers } = event;

  // Check if the 'Origin' header is present
  if ('origin' in headers) {
    const origin = headers['origin'];

    // Replace 'https://www.codeadvice.xyz' with the actual authorized domain
    if (origin === 'https://www.codeadvice.xyz') {
      // Fetch and serve your JavaScript code
      const jsCode = 'console.log("Hello from server-side!");';

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
    body: JSON.stringify({ error: 'Unauthorized' }),
  };
};
