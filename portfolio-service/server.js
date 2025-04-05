const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3002; // Use a different port

app.use(bodyParser.json());

const DATA_FILE = './data/portfolios.json';


// Read portfolios
app.get('/portfolios', (req, res) => {
  fs.readFile(DATA_FILE, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Could not read data' });
    res.json(JSON.parse(data));
  });
});

// Create portfolio
app.post('/portfolios', (req, res) => {
  const { name, assets } = req.body;
  const newPortfolio = { id: Date.now(), name, assets };

  fs.readFile(DATA_FILE, 'utf8', (err, data) => {
    if (err && err.code !== 'ENOENT') return res.status(500).json({ error: 'Error reading file' });

    const portfolios = data ? JSON.parse(data) : [];
    portfolios.push(newPortfolio);

    fs.writeFile(DATA_FILE, JSON.stringify(portfolios, null, 2), err => {
      if (err) return res.status(500).json({ error: 'Error saving data' });
      res.status(201).json({ message: 'Portfolio created', portfolio: newPortfolio });
    });
  });
});

app.listen(PORT, () => {
  console.log(`Portfolio service running on port ${PORT}`);
});
