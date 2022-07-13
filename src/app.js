const fs = require('fs');
const path = require('path');

const { accounts, users, WriteJSON, writeJSON } = require('./data.js');
const accountRoutes = require('./routes/accounts.js');
const servicesRoutes = require('./routes/services.js');

const express = require('express');
const app = new  express();



const pathToViews = path.join(__dirname, '/views');
const pathToStatic = path.join(__dirname, '/public');

app.set('views', pathToViews);
app.set('view engine', 'ejs');

app.use(express.static(pathToStatic));

app.use(express.urlencoded({extended:true}));

app.get('/', (req, res) => res.render('index', { title: 'Account Summary', accounts : accounts }));

app.get('/profile', (req, res) => res.render('profile', {user: users[0]}));

app.use('/account', accountRoutes);

app.use('/services', servicesRoutes);

app.listen(3000, () => { console.log('PS Project Running on port 3000!')});