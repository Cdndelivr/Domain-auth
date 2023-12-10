const sharedSecret = "QWERTY"; // Replace with your actual secret

exports.handler = async (event, context) => {
  const { domain, secret } = JSON.parse(event.body);

  if (secret !== sharedSecret) {
    return {
      statusCode: 403,
      body: JSON.stringify({ message: 'Unauthorized request.' }),
    };
  }

  // Your existing domain verification logic
  // ...

  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Domain is authorized.' }),
  };
};
