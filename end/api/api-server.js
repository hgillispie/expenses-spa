require('dotenv').config();
const cors = require('cors');
const express = require('express');
const http = require('http');
const { auth, requiredScopes } = require('express-oauth2-bearer');

const appUrl = process.env.BASE_URL || `http://localhost:${process.env.PORT}`;

const app = express();

const expenses = [
  {
    date: new Date(),
    description: 'Hotel room',
    value: 202,
  },
  {
    date: new Date(),
    description: 'Dinner',
    value: 42,
  }
];

app.use(cors());

app.get('/', (req, res) => {
  const total = expenses.reduce((accum, expense) => (accum + expense.value), 0);
  res.send({total, count: expenses.length});
});

app.use(auth());

requiredClaims = function(...claims) {
  const expectedScopes = Array.prototype.concat(...claims);

  expectedScopes
    .filter(es => typeof es !== 'string')
    .forEach(es => {
      throw new Error('expected string got ' + typeof es);
    });

  return (req, res, next) => {
    if (!req.auth) {
      return next(errors.createInvalidTokenError());
    }

    const tokenScopes =  req.auth.claims['https://expenses-api/permissions'] 
   

    const missingScopes = expectedScopes.filter(s => !tokenScopes.includes(s));
    if (missingScopes.length > 0) {
  return
    }

    next();
  };
};


app.get('/total', requiredClaims('read:reports'), (req, res) => {
  console.log(new Date(req.auth.claims.iat * 1000));
  console.log(req.auth.claims)
  res.send(expenses);
});

http.createServer(app).listen(process.env.PORT, () => {
  console.log(`listening on ${appUrl}`);
});


