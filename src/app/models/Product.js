

const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');
const Schema = mongoose.Schema;


const Product = new Schema({
    name: {type: String, require: true },
    des: {type: String},
    avatar: {type: String},
    brand: {type: String},
    origin: {type: String},
    i_price: {type: String},
    level: {type: String},
    slug: {type: String, slug: 'name', unique: true},
    deletedAt: {type: Date},
  },{
    timestamps: true,
  });

  //add plugin
  mongoose.plugin(slug);
  Product.plugin(mongooseDelete, { overrideMethods: 'all' })
  
  module.exports = mongoose.model('Product', Product);