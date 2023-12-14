// functions/serveJsFile.js

const fs = require('fs');
const jwt = require('jsonwebtoken');

exports.handler = async function (event, context) {
  const secretKey = 'QWERTY123';

  const token = event.headers.authorization;

  try {
    const decoded = jwt.verify(token, secretKey);

    const jsCode = fs.readFileSync('./src/V3-Latest.js', 'utf-8');

    return {
      statusCode: 200,
      body: jsCode,
      headers: {
        'Content-Type': 'application/javascript',
        'Access-Control-Allow-Origin': '*', // Allow requests from any origin for testing purposes
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'Authorization',
      },
    };
  } catch (error) {
    return {
      statusCode: 401,
      body: JSON.stringify({ error: 'Unauthorized' }),
    };
  }
};
