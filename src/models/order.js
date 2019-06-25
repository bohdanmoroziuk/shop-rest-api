const { Schema, model } = require('mongoose');

const orderSchema = new Schema(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    quantity: {
      type: Number,
      default: 1
    }
  },
  {
    collection: 'orders'
  }
);

const orderModel = model('Order', orderSchema);

module.exports = orderModel;
