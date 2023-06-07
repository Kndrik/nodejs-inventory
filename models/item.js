const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, min: 0, required: true },
  number_in_stock: { type: Number, min: 0, required: true },
  category: { type: Schema.Types.ObjectId, ref: "Category" },
  manufacturer: { type: Schema.Types.ObjectId, ref: "Manufacturer" },
});

ItemSchema.virtual("url").get(function () {
  return `/inventory/items/${this._id}`;
});

module.exports = mongoose.models.Item || mongoose.model("Item", ItemSchema);
