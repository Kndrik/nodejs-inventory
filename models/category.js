const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    name: String,
    description: String
});

CategorySchema.virtual("url").get(function() {
    return `/inventory/categories/${this._id}`;
});

// Export model
module.exports = mongoose.model(CategorySchema);