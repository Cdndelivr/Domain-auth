const fs = require('fs');
const path = require('path');
const authorizedDomains = require('./domains');

exports.handler = async (event, context) => {
  const { headers } = event;

  if ('origin' in headers) {
    const origin = headers['origin'];

    if (authorizedDomains.includes(origin)) {
      
       const jsFilePath = path.join(__dirname, 'functions/bundle.js');

      try {
        // Read the content of the JavaScript file
        const jsCode = fs.readFileSync(jsFilePath, 'utf8');

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
          body: JSON.stringify('Internal Server Error'),
        };
      }
    }
  }

  return {
    statusCode: 403,
    body: JSON.stringify('Code Is Not Found Here.. 😜'),
  };
};











// const authorizedDomains = require('./domains');

// exports.handler = async (event, context) => {
//   const { headers } = event;

//   if ('origin' in headers) {
//     const origin = headers['origin'];
    
//     if (authorizedDomains.includes(origin)) {
//       const jsCode = `
//         console.log("Successfully Connected With Server");
//         fetch(feedUrl)
//           .then(response => response.json())
//           .then(data => {
//             links.push(...(data.feed.entry || []).map(entry => entry.link.find(link => link.rel === "alternate").href));
//           })
//           .catch(error => console.error("Error fetching Posts:", error));
//       `;

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

//   return {
//     statusCode: 403,
//     body: JSON.stringify('Code Is Not Found Here.. 😜'),
//   };
// };
