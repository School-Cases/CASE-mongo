// const express = require('express');
// const routes = require('./routes/routes.js');

// const app = express();
// console.log('May Node be with you');

// app.set('view engine', 'ejs');
// app.use(express.json());

// app.use(routes.routes);

// app.listen(3000, () => {
//     console.log('listening on 3000');
// });

// Nyhet egen model, collection
// 



// test
const express = require('express');
const routes = require('./routes/routes.js');
const dotenv = require('dotenv');
const path = require('path');
const session = require('express-session');
const bcrypt = require('bcryptjs');
dotenv.config();

const expressLayouts = require('express-ejs-layouts');

const app = express();

const mongoose = require('mongoose');
const connectionString = process.env.MONGODB;

mongoose.connect(connectionString, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true
}).then(() => console.log('mongoDB connected'));

console.log('May Node be with you');

app.set('view engine', 'ejs'); // set ejs as the view engine
app.set('views', path.join(path.dirname('./'), 'views')); // set the folder where the views will be stored
app.set('default layout', 'layouts/main');
app.use(expressLayouts);
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(express.static('views/'));

app.use(session({secret: 'keyboard cat', resave: false,saveUninitialized: true,cookie: { secure: false }}));

app.use(routes.routes);

app.listen(3000, () => {
    console.log('listening on 3000');
});