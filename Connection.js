const express = require('express');
const app = express();
const port = 3002;

app.get('/', (req, res) => {
  res.send('Hallo wereld!');
});

app.listen(port, () => {
  console.log(`Server draait op http://localhost:${port}`);
});