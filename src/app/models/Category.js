
const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');
const Schema = mongoose.Schema;


const Category = new Schema({
    category: {type: String, require: true },
   
    slug: {type: String, slug: 'name', unique: true},
    deletedAt: {type: Date},
  },{
    timestamps: true,
  });


  //add plugin
  mongoose.plugin(slug);
  Category.plugin(mongooseDelete, { overrideMethods: 'all' })
  
  module.exports = mongoose.model('Category', Category);