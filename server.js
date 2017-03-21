const express = require('express');
const compression = require('compression');
const path = require('path');

const app = express();
app.use(compression(9));
app.use(express.static(path.join(__dirname, 'dist')));
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname + '/dist/index.html')));

app.listen(8000, () => console.log('🥅 RDN Listening on %j', 8000));
