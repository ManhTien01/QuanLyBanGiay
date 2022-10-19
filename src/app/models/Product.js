

const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');
const Schema = mongoose.Schema;


const ProductSchema = new Schema({
  name: { type: String, require: true },
  des: { type: String },
  avatar: { type: String },
  brand: { type: String },
  origin: { type: String },
  price_old: { type: Number, default: 0, require: true },
  price_new: { type: Number, default: 0 },
  discount: { type: Number, default: 0 },
  slug: { type: String, slug: 'name', unique: true },
  deletedAt: { type: Date },
}, {
  timestamps: true,
});

//add plugin
mongoose.plugin(slug);
ProductSchema.plugin(mongooseDelete, { overrideMethods: 'all' })

Product = mongoose.model('Product', ProductSchema)

module.exports =  Product