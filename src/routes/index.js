const newsRouter = require('./news');
const meRouter = require('./me');
const productsRouter = require('./products');
const siteRouter = require('./site');
const authRouter = require('./auth')
const postRouter = require('./posts')

function route(app) {
    app.use('/api/users', authRouter)
    app.use('/api/posts', postRouter)
    app.use('/news', newsRouter);
    app.use('/me', meRouter);
    app.use('/products', productsRouter);
    app.use('/', siteRouter);

}

module.exports = route;
