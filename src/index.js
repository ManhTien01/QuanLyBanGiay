const express = require('express');
const path = require('path');
const morgan = require('morgan');
const methodOverride = require('method-override')
const handlebars = require('express-handlebars');

const sortMiddleWare = require('./app/middlewares/sortMiddleWare')

const app = express();
const port = 3000;

const route = require('./routes');
const db = require('./config/db')

//connect to db
db.connect()

app.use(express.static(path.join(__dirname, 'public')));

app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

//costom middlewares
app.use(sortMiddleWare)

app.use(methodOverride('_method'))

// HTTP logger
app.use(morgan('combined'));

//temple engine
app.engine(
    'hbs',
    handlebars.engine({
        defaultLayout: 'main',
        extname: '.hbs',
        helpers: {
            sum: (a,b) => a+b,
            sortable: (field, sort) => {
                const sortType = field === sort.column ? sort.type : 'default'
                const icons = {
                    default: 'fa-solid fa-sort',
                    asc: 'fa-solid fa-sort-up',
                    desc: 'fa-solid fa-sort-down',
                }

                const types = {
                    default: 'desc',
                    asc: 'desc',
                    desc: 'asc'
                }

                const icon = icons[sortType]
                const type = types[sortType]


                return `<a href="?_sort&column=${field}&type=${type}"><i class="${icon}"></i></a>`
            }
        }
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

route(app);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
