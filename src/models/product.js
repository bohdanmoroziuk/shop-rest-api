const { Schema, model } = require('mongoose');

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true,
    }
  },
  {
    collection: 'products'
  }
);

const productModel = model('Product', productSchema);

module.exports = productModel;
