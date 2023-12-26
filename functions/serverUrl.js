 const authorizedDomains = require('./domains');

exports.handler = async (event, context) => {
  const { headers } = event;

  if ('origin' in headers) {
    const origin = headers['origin'];
    
    if (authorizedDomains.includes(origin)) {
      const jsCode = `
        function hideMessage() {
            safelinkMessage.textContent = '';
        }

        function isValidUrl(url) {
            var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
                '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
                '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
                '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
                '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
                '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
            return !!pattern.test(url);
        }

        btngenerate.addEventListener('click', function () {
            generatelink.classList.add('hidden');
            var userInput = generateUrlInput.value;
          
            if (isValidUrl(userInput)) {
                generateloading.classList.remove('hidden');
                generatelink.classList.add('hidden');
                safelinkMessage.textContent = '';
              
                var base64UserInput = btoa(userInput);
                var currentDomain = window.location.origin;
                var base64Url = currentDomain + '/?token=' + base64UserInput;
              
                shortenUrlWithShortIO(base64Url);
            } else {
                safelinkMessage.textContent = 'Invalid URL. Please enter a valid URL.';
                safelinkMessage.style.color = '#D8000C';
                setTimeout(hideMessage, 5000);
            }
        });
      
        generateUrlInput.addEventListener('keypress', function (event) {
            if (event.key === 'Enter') {
                var userInput = generateUrlInput.value;
                if (userInput.trim() !== '') {
                    btngenerate.click();
                }
            }
        });

        function shortenUrlWithShortIO(url) {
            var data = {
                "domain": "pro.codeadvice.xyz",
                "originalURL": url,
                "allowDuplicates": false,
            };
            fetch('https://api.short.cm/links/public', {
                method: 'post',
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json',
                    'authorization': 'pk_IPjyQVfFGC9IZnnD'
                },
                body: JSON.stringify(data)
            }).then(function (response) {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Error : ' + response.statusText);
                }
            }).then(function (data) {
                resultUrlInput.value = data.shortURL;
                generateloading.classList.add('hidden');
                generatelink.classList.remove('hidden');
                safelinkMessage.textContent = '';
            }).catch(function (error) {
                console.error('API Error:', error);
                safelinkMessage.textContent = 'Error communicating with API: ' + error.message;
                safelinkMessage.style.color = '#D8000C';
                setTimeout(hideMessage, 5000);
            });

        }
      `;

      return {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': origin,
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
        body: jsCode,
      };
    }
  }

  return {
    statusCode: 403,
    body: JSON.stringify('Code Is Not Found Here.. 😜'),
  };
};
