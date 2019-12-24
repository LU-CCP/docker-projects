
require('dotenv').config()
const express = require('express');
const cors = require('cors');
const { HOST, PORT } = process.env;

const app = express();

app.use(cors({
  origin: function(origin, callback){
    // allow requests with no origin
    // (like mobile apps or curl requests)
    // if(!origin) return callback(null, true);
    // if(allowedOrigins.indexOf(origin) === -1){
    //   const msg = 'The CORS policy for this site does not ' +
    //             'allow access from the specified Origin.';
    //             console.log(msg + " origin:" + origin );
    //   return callback(new Error(msg), false);
    // }
     return callback(null, true);
  }
}));

app.use ((req, res, next) => {
  let data='';
  req.setEncoding('utf8');
  req.on('data', function(chunk) { data += chunk });
  req.on('end', ()=> {req.body = data;next() });
});


app.get('/', (req, res) => {
  res.send('API construida para Lagash University se encuentra arriba!');
});



app.listen(PORT, HOST);
console.log(`Corriendo  API en http://${HOST}:${PORT}`);