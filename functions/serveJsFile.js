exports.handler = async (event, context) => {
  // Fetch and serve your JavaScript code
  const jsCode = 'console.log("Hello from server-side!");';

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': 'https://www.codeadvice.xyz',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
    body: jsCode,
  };
};
