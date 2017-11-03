const pgp = require('pg-promise')({});
const express = require('express');
const app = express();

console.log("express server active");

app.get('/', (req, res) => {
  res.send('express node test: active');
});

app.listen(3000, () => {
  console.log('listening on 3000');
});

const cn = {
    host: 'localhost', // 'localhost' is the default;
    port: 5432, // 5432 is the default;
    database: 'name',
    user: 'username',
    password: 'admin'
};

var db = pgp(cn);

function ret(req, res, next){
db.any('SELECT * FROM tablename LIMIT 50')
  .then((results) => {
  	res.status(200)
        .json({
          status: 'success',
          data: results,
          message: 'Retrieved 50 rows'
        });
  })
  .catch((err) => next(err));
}

app.get('/pull', ret);