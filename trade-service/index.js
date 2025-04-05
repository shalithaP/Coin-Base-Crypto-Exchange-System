const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const mockTrades = [
  { id: 1, symbol: 'BTC', amount: 0.5, price: 27000 },
  { id: 2, symbol: 'ETH', amount: 2, price: 1800 }
];

app.get('/trades', (req, res) => {
  res.json({ trades: mockTrades });
});

app.listen(PORT, () => {
  console.log(`Trade service running on port ${PORT}`);
});
