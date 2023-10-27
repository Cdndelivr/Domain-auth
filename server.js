const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Define your API endpoints here
app.post('/addMapping', (req, res) => {
  // Logic to add a new mapping
});

app.get('/getMappings', (req, res) => {
  // Logic to retrieve mappings
});

app.use((req, res) => {
  // Handle 404 errors
  res.status(404).send('Not Found');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
