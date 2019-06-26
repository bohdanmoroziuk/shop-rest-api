const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true
    },
    password: {
      type: String,
      required: true
    }
  },
  {
    collection: 'users',
    timestamps: true
  }
);

const userModel = model('User', userSchema);

module.exports = userModel;
