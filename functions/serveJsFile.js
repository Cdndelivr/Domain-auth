const fs = require('fs');
const path = require('path');

exports.handler = async (event, context) => {
  try {
    const jsFilePath = path.join(__dirname, 'src/V3-Latest.js');
    const jsCode = await fs.promises.readFile(jsFilePath, 'utf8');

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
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
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      body: JSON.stringify({
        error: 'Internal Server Error',
        details: error.message,
      }),
    };
  }
};
