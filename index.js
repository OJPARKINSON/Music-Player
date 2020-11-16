const express = require('express');

const port = process.env.PORT || 5000;
const app = express();

app.use(express.static('build'));
app.get('/*', (req, res) => {
  res.sendFile('index.html', { root: `/build/` });
});

app.listen(port, () => console.log('App listening on port ' + port));