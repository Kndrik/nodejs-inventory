const Category = require("../models/category");
const Item = require("../models/item");
const Manufacturer = require("../models/manufacturer");

const asyncHandler = require("express-async-handler");

exports.display_inventory = asyncHandler(async (req, res, next) => {
  const [numCategories, numItems, numManufacturers] = await Promise.all([
    Category.countDocuments().exec(),
    Item.countDocuments().exec(),
    Manufacturer.countDocuments().exec(),
  ]);

  res.render("index", {
    title: "Index",
    category_count: numCategories,
    item_count: numItems,
    manufacturer_count: numManufacturers,
  });
});
