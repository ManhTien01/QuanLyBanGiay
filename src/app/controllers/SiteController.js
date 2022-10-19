const Product = require('../models/Product')
const Category = require('../models/Category')
const { mutipleMongooseToObject } = require('../../util/mongoose')

class SiteController {

    // [GET] /
    index(req, res, next) {
        Product.find({})
            .then(products => {
                res.render('home', {
                    products: mutipleMongooseToObject(products)
                })

            })
            .catch(next)
      

    }



    // [GET] /search
    search(req, res) {
        res.render('search');
    }
}


module.exports = new SiteController();
