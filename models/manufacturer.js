const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ManufacturerSchema = new Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
});

ManufacturerSchema.virtual("url").get(function () {
  return `/inventory/manufacturers/${this._id}`;
});

// Export model
module.exports = mongoose.model("Manufacturer", ManufacturerSchema);
