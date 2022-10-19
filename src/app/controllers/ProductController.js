const Product = require('../models/Product')
const {mongooseToObject} = require('../../util/mongoose')


class ProductsController {

    // [GET] /courses/:slug
    show(req, res,next) {
        Product.findOne({ slug: req.params.slug })
            .then(product =>
                res.render('products/show', {product: mongooseToObject(product)})
            )
            .catch(next)

    }

    // [GET] /products/create
    create(req, res,next) {
        res.render('products/create')

    }

    // [Post] /products/store
    store(req, res,next) {
        req.body.price_new = req.body.price_old - req.body.price_old * req.body.discount/100
        const product = new Product(req.body)
        product.save()
            .then(() => res.redirect('/me/stored/products'))
            .catch(next)

    }

    // [GET] /products/:id/edit
    edit(req, res,next) {
        Product.findById(req.params.id)
            .then(product => res.render('products/edit',{
                product: mongooseToObject(product)
            }))
            .catch(next)

    }

    //Put /courses/:id
    update(req, res, next) {
        Product.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/me/stored/products'))
            .catch(next)
    }


    //delete /courses/:id
    destroy(req, res, next) {
        Product.delete({_id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next)

    }

    //delete /courses/:id/force

    forceDestroy(req, res, next) {
        Product.deleteOne({_id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next)

    }

    //patch /courses/:id/restore

    restore(req, res, next) {
        Product.restore({_id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next)
    }

    //post //course/handle-form-actions
    handleFormAction(req, res, next) {
        switch(req.body.action){
            case 'delete': 
                    Product.delete({_id: {$in: req.body.productIDs} })
                        .then(() => res.redirect('back'))
                        .catch(next)
            
                break
            default:
                res.json({message: 'action is invalid!'})
        }
            
    }

}

module.exports = new ProductsController();
