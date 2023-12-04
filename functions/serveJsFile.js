// functions/serveJsFile.js

const allowedDomains = [
  'https://your-allowed-domain.com',
  // Add more domains as needed
];

exports.handler = async (event, context) => {
  const { referer } = event.headers;

  if (allowedDomains.includes(referer)) {
    // If the requesting domain is whitelisted, serve the JavaScript file
    return {
      statusCode: 200,
      body: `console.log("Your protected JavaScript code");`,
      headers: {
        'Content-Type': 'application/javascript',
      },
    };
  } else {
    // If the requesting domain is not whitelisted, deny access
    return {
      statusCode: 403,
      body: 'Access forbidden. Your domain is not whitelisted.',
    };
  }
};
