// verifyDomain.js
const allowedDomains = ['example.com', 'anotherdomain.com']; // Add your allowed domains

exports.handler = async function (event, context) {
    const { origin } = event.headers;

    // Check if the requesting domain is in the allowedDomains list
    if (allowedDomains.includes(origin)) {
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Domain verified successfully.' }),
            headers: {
                'Access-Control-Allow-Origin': origin,
            },
        };
    } else {
        return {
            statusCode: 403,
            body: JSON.stringify({ error: 'Unauthorized domain.' }),
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
        };
    }
};
