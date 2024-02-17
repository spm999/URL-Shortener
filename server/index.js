const express = require('express');
const bodyParser = require('body-parser');
const db = require('./Utils/db');
const cors = require('cors');
// const router=require('./router.js');

const app = express();

// app.use(router);
app.use(cors());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
    // Handle preflight requests
    if ('OPTIONS' === req.method) {
      res.sendStatus(200);
    } else {
      next();
    }
  });

const PORT = process.env.PORT || 5172;

app.use(bodyParser.json());

const userAuthRoutes = require('./Routes/userAuth.js');
const userMe=require('./Routes/userMe.js');


app.use('/user', userAuthRoutes);
app.use('/user', userMe);

const urlshortener=require('./Routes/urlShort.js')
app.use('/', urlshortener);


const urlshort=require('./Routes/urlAuthShort.js')
app.use('/', urlshort);

const dashboard=require('./Routes/userdashboard.js')
app.use('/user', dashboard)

const analytics=require('./Routes/analytics.js')
app.use('/user', analytics)

app.listen(PORT, ()=>{
    console.log(`Server is running on port: ${PORT}`)
})