const allowedDomains = [
  "www.codeadvice.xyz",
  "safelink-pro.netlify.app"
];

exports.handler = async (event, context) => {
  try {
    const { domain } = JSON.parse(event.body);

    if (allowedDomains.includes(domain)) {
      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Domain is authorized.' }),
      };
    } else {
      throw new Error('Unauthorized domain.');
    }
  } catch (error) {
    return {
      statusCode: 403,
      body: JSON.stringify({ message: error.message }),
    };
  }
};
