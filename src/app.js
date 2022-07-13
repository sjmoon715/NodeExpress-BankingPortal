const fs = require('fs');
const path = require('path');

const express = require('express');
const app = express();

const pathToViews = path.join(__dirname, '/views');
const pathToStatic = path.join(__dirname, '/public');

app.set('views', pathToViews);
app.set('view engine', 'ejs');

app.use(express.static(pathToStatic));

express.static()

app.get('/', (req, res) => res.render('index', {title: 'Index'}));

app.listen(3000, () => console.log('PS Project Running on port 3000!'));