const express = require('express');
const njk = require('nunjucks');

const app = express();

njk.configure('views/', {
  express: app,
  autoscape: true,
  watch: true
});

app.use(express.static('static'));

app.get('/', ({ res }) => res.redirect('index.html'));

app.get("/*.html$/", function(req, res) {
  res.render(`pages/${req.params[0]}.njk`);
});

var listener = app.listen(9902);
console.log(`listening on port ${listener.address().port}`);