const express = require('express');
const app = express();

const route = require('./routes/user/index.route');
const routerAdmin = require('./routes/admin/index.route');

const path = require('path');
const mongodb = require('./config/database');

// method
const methodOverride = require('method-override');
app.use(methodOverride('_method'));

var cookieParser = require('cookie-parser');
var session = require('express-session');
// flash mess
const flash = require('express-flash');
app.use(cookieParser('keyboard cat'));
app.use(session({ cookie: { maxAge: 60000 } }));
app.use(flash());

// req body
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded()); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json

// TinyMCE
app.use('/tinymce', express.static(path.join(__dirname, '..', 'node_modules', 'tinymce')));
app.use(express.static(path.join(__dirname, '..', 'public')));


// App locals Variables
const systemConfig = require('./config/systems');
app.locals.prefixAdmin = systemConfig.prefixAdmin;

require('dotenv').config();
const port = process.env.PORT || 3001;

// public static file
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
    console.log(`\n ================== http://localhost: ${port} ==================`);
});