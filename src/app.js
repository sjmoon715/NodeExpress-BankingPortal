const fs = require('fs');
const path = require('path');

const express = require('express');
const app = new  express();

const pathToViews = path.join(__dirname, '/views');
const pathToStatic = path.join(__dirname, '/public');

app.set('views', pathToViews);
app.set('view engine', 'ejs');

app.use(express.static(pathToStatic));

app.use(express.urlencoded({extended:true}));

const accountData = fs.readFileSync(path.join(__dirname, 'json', 'accounts.json'), 'utf8');
const accounts = JSON.parse(accountData);

const userData = fs.readFileSync(path.join(__dirname, 'json', 'users.json'), 'utf8');
const users = JSON.parse(userData);

app.get('/', (req, res) => res.render('index', { title: 'Account Summary', accounts : accounts }));

app.get('/savings', (req, res) => res.render('account', {account : accounts.savings}));
app.get('/checking', (req, res) => res.render('account', {account : accounts.checking}));
app.get('/credit', (req, res) => res.render('account', {account : accounts.credit}));

app.get('/profile', (req, res) => res.render('profile', {user: users[0]}));

app.get('/transfer', (req, res) => res.render('transfer'));

app.get('/payment', (req, res) => res.render('payment', {account : accounts.credit}));

app.post('/payment', () => {
    accounts.credit.balance = parseInt(accounts.credit.balance) - parseInt(req.body.amount);
    accounts.credit.available = parseInt(accounts.credit.available) + parseInt(req.body.amount);
    const accountsJSON = JSON.stringify(accounts);
    fs.writeFileSync('json/accounts.json', accountsJSON, {encoding:'utf8'});
    res.render('payment', { message : "payment succesful", account:accounts.credit});
})

app.post('/transfer', (req, res) => {
    accounts[req.from] = accounts[req.from].balance - parseInt(req.amount);
    accounts[req.to] = accounts[req.to].balance + parseInt(req.amount);

    const accountsJSON = JSON.stringify(accounts);
    fs.writeFileSync('json/accounts.json', accountsJSON);
    res.render(transfer, {message : "Transfer Completed"});
});

app.listen(3000, () => { console.log('PS Project Running on port 3000!')});