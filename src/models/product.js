const { Schema, model } = require('mongoose');

const productSchema = new Schema(
  {
    name: String,
    price: Number
  },
  {
    collection: 'products'
  }
);

const productModel = model('Product', productSchema);

module.exports = productModel;
