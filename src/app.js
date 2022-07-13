const fs = require('fs');
const path = require('path');

const express = require('express');
const { ENGINE_METHOD_ALL } = require('constants');

const app = express();

const pathToViews = path.join(__dirname, '/views');

app.set('views', pathToViews);
app.set('view engine', 'ejs');

express.static('/public');

app.get('/', (req, res) => {
    res.render('index', {title: 'Index'});
});

app.listen(3000, () => {
    console.log('PS Project Running on port 3000!');
});


