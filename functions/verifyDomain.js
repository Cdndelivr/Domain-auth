// verifyDomain.js

const allowedDomains = require('./allowedDomains.json');

exports.handler = async (event, context) => {
  const { domain } = JSON.parse(event.body);

  if (allowedDomains.includes(domain)) {
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Domain is authorized.' }),
    };
  } else {
    return {
      statusCode: 403,
      body: JSON.stringify({ message: 'Unauthorized domain.' }),
    };
  }
};
