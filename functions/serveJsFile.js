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
      return {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': origin,
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
        body: '',
      };
    }
  }

  // Unauthorized access
  return {
    statusCode: 403,
    body: JSON.stringify('Unauthorized'),
  };
};



// exports.handler = async (event, context) => {
//   const { headers } = event;

//   // List of authorized domains
//   const authorizedDomains = [
//     'https://www.codeadvice.xyz',
//     // 'https://demo-techadvicev4.blogspot.com',
//     // Add more authorized domains as needed
//   ];

//   // Check if the 'Origin' header is present
//   if ('origin' in headers) {
//     const origin = headers['origin'];

//     // Check if the origin is in the list of authorized domains
//     if (authorizedDomains.includes(origin)) {
//       // Fetch and serve your JavaScript code
//       const jsCode = 'console.log("Hello from server-side! - Devil");';

//       return {
//         statusCode: 200,
//         headers: {
//           'Access-Control-Allow-Origin': origin,
//           'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
//           'Access-Control-Allow-Headers': 'Content-Type',
//         },
//         body: jsCode,
//       };
//     }
//   }

//   // Unauthorized access
//   return {
//     statusCode: 403,
//     body: JSON.stringify('Code Is Not Found Here.. 😜'),
//   };
// };
