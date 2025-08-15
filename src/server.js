const express = require('express');
const app = express();

const route = require('./routes/user/index.route');
const routerAdmin = require('./routes/admin/index.route');

const path = require('path');
const mongodb = require('./config/database');

// method
const methodOverride = require('method-override');
app.use(methodOverride('_method'));

// req body
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded()); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json

// App locals Variables
const systemConfig = require('./config/systems');
app.locals.prefixAdmin = systemConfig.prefixAdmin;

require('dotenv').config();
const port = process.env.PORT || 3001;

app.use(express.static(path.join(__dirname, '../', 'public')));

// view engine
app.set('views', './src/views');
app.set('view engine', 'pug');

// connection DB
mongodb.connection();

// route
routerAdmin(app);
route(app);

app.listen(port, () => {
    console.log(`\nhttp://localhost: ${port} ==================`);
});