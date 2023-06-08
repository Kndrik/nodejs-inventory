const Category = require("../models/category");
const Item = require("../models/item");

const asyncHandler = require("express-async-handler");

exports.category_list = asyncHandler(async (req, res, next) => {
  const categories = await Category.find({}, "name").exec();

  res.render("category_list", {
    title: "All categories",
    category_list: categories,
  });
});

exports.category_create_get = (req, res, next) => {
  res.send(`Not implemented yet. CATEGORY CREATE FORM`);
};

exports.category_create_post = (req, res, next) => {
  res.send(`Not implemented yet. CATEGORY CREATE POST`);
};

exports.category_update_get = (req, res, next) => {
  res.send(`Not implemented yet. CATEGORY UPDATE FORM: ${req.params.id}`);
};

exports.category_update_post = (req, res, next) => {
  res.send(`Not implemented yet. CATEGORY UPDATE POST: ${req.param.id}`);
};

exports.category_delete_get = (req, res, next) => {
  res.send(`Not implemented yet. CATEGORY DELETE FORM: ${req.params.id}`);
};

exports.category_delete_post = (req, res, next) => {
  res.send(`Not implemented yet. CATEGORY DELETE POST: ${req.params.id}`);
};

exports.category_detail = asyncHandler(async (req, res, next) => {
  const [category, itemsInCategory] = await Promise.all([
    Category.findById(req.params.id).exec(),
    Item.find({ category: req.params.id }, "name").exec(),
  ]);

  res.render("category_detail", {
    title: "Category details",
    category: category,
    item_list: itemsInCategory,
  });
});
