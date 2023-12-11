const express = require('express');
const app = express();

app.use((req, res, next) => {
  const allowedDomains = ['https://www.codeadvice.xyz', 'https://subdomain.example.com'];
  const origin = req.get('Origin');
  
  if (allowedDomains.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    next();
  } else {
    res.status(403).json({ error: 'Unauthorized domain' });
  }
});

app.get('/your-protected-endpoint', (req, res) => {
  // Your code here
  res.json({ message: 'Success' });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
