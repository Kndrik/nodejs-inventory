const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ConstructorSchema = new Schema({
    name: {type: String, required: true},
    address: {type: String, required: true}
});

ConstructorSchema.virtual("url").get(function() {
    return `/inventory/constructors/${this._id}`;
});

// Export model
module.exports = mongoose.model("Constructor", ConstructorSchema);