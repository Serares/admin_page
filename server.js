const express = require('express');
const serveStatic = require('serve-static');
const PORT = process.env.PORT || 5100;
const path = require('path');
const app = express();

app.use('/', serveStatic(path.join(__dirname, '/frontend/build')));
// this * route is to serve project on different page routes except root `/`
app.get(/.*/, function (req, res) {
    res.sendFile(path.join(__dirname, '/frontend/build/index.html'))
})

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
