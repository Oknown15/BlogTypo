require('dotenv').config();
const { URL } = require('whatwg-url');
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const connectDB = require('./servers/config/db');
const app = express();
const cookieParser = require('cookie-parser')

app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(expressLayouts);
app.use(express.static('public'));



app.use((req, res, next) => {
    res.header('Content-Security-Policy', "default-src 'self'; script-src 'self' https://vercel.live");
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Pragma', 'no-cache');
    res.header('Expires', '-1');
    next();
});

app.use("/", express.static('./node_modules/bootstrap/dist/'));
app.set('layout', './layouts/main');

app.use('/', require('./servers/routes/main'));
app.use('/', require('./servers/routes/post'));

app.use((req, res, next) => { 
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Pragma', 'no-cache');
    res.header('Expires', '-1');
    next();     
});

     
app.set('view engine', 'ejs');
 

const PORT = process.env.PORT || 5000;
  

app.get('/', function (req, res) {
    res.send('Hello World');
})

connectDB();



app.listen(PORT, () => {
    console.log(`server connected sucessfully : ${PORT}`);
    console.log(`http://localhost:${PORT}`);
})  