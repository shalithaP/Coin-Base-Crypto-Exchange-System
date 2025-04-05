const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3001;

app.use(bodyParser.json());

const filePath = path.join(__dirname, 'data', 'trades.json');

// Read trades
app.get('/trades', (req, res) => {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Failed to read file' });
    const trades = JSON.parse(data);
    res.json(trades);
  });
});

// Add a trade
app.post('/trades', (req, res) => {
  const newTrade = req.body;

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Failed to read file' });

    let trades = [];
    try {
      trades = JSON.parse(data);
    } catch {
      trades = [];
    }

    trades.push(newTrade);

    fs.writeFile(filePath, JSON.stringify(trades, null, 2), (err) => {
      if (err) return res.status(500).json({ error: 'Failed to write file' });
      res.status(201).json({ message: 'Trade added', trade: newTrade });
    });
  });
});

app.listen(PORT, () => {
  console.log(`Trade service running on port ${PORT}`);
});
