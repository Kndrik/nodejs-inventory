const Item = require("../models/item");
const Category = require("../models/category");
const Manufacturer = require("../models/manufacturer");

const asyncHandler = require("express-async-handler");

const { body, validationResult } = require("express-validator");

exports.item_list = asyncHandler(async (req, res, next) => {
  const itemList = await Item.find({}, "name manufacturer")
    .sort({ name: 1 })
    .populate("manufacturer")
    .exec();

  res.render("item_list", {
    title: "All items",
    item_list: itemList,
  });
});

exports.item_create_get = asyncHandler(async (req, res, next) => {
  const [allCategories, allManufacturers] = await Promise.all([
    Category.find({}, "name").exec(),
    Manufacturer.find({}, "name").exec(),
  ]);

  res.render("item_form", {
    title: "New Item",
    category_list: allCategories,
    manufacturer_list: allManufacturers,
  });
});

exports.item_create_post = [
  body("name", "Name must not be empty.").trim().isLength({ min: 1 }).escape(),
  body("description", "Must contain a description.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("price").escape(),
  body("in_stock", "The number in stock must be greater than 0.")
    .isInt({
      min: 0,
    })
    .escape(),
  body("category").escape(),
  body("manufacturer").escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const item = new Item({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      number_in_stock: req.body.in_stock,
      category: req.body.category,
      manufacturer: req.body.manufacturer,
    });

    if (!errors.isEmpty()) {
      // There are errors

      // Get categories and manufacturers to re render the form
      const [allCategories, allManufacturers] = await Promise.all([
        Category.find({}, "name").exec(),
        Manufacturer.find({}, "name").exec(),
      ]);

      res.render("item_form", {
        title: "New Item",
        category_list: allCategories,
        manufacturer_list: allManufacturers,
        item: item,
        errors: errors.array(),
      });
    } else {
      await item.save();
      res.redirect(item.url);
    }
  }),
];

exports.item_update_get = asyncHandler(async (req, res, next) => {
  const [item, allCategories, allManufacturers] = await Promise.all([
    Item.findById(req.params.id).exec(),
    Category.find({}, "name").exec(),
    Manufacturer.find({}, "name").exec(),
  ]);

  res.render("item_form", {
    title: "Update item",
    item: item,
    category_list: allCategories,
    manufacturer_list: allManufacturers,
  });
});

exports.item_update_post = [
  body("name", "Name must not be empty.").trim().isLength({ min: 1 }).escape(),
  body("description", "Must contain a description.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("price").escape(),
  body("in_stock", "The number in stock must be greater than 0.")
    .isInt({
      min: 0,
    })
    .escape(),
  body("category").escape(),
  body("manufacturer").escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const item = new Item({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      number_in_stock: req.body.in_stock,
      category: req.body.category,
      manufacturer: req.body.manufacturer,
      _id: req.params.id,
    });

    if (!errors.isEmpty()) {
      // There are errors

      // Get categories and manufacturers to re render the form
      const [allCategories, allManufacturers] = await Promise.all([
        Category.find({}, "name").exec(),
        Manufacturer.find({}, "name").exec(),
      ]);

      res.render("item_form", {
        title: "New Item",
        category_list: allCategories,
        manufacturer_list: allManufacturers,
        item: item,
        errors: errors.array(),
      });
    } else {
      await Item.findByIdAndUpdate(req.params.id, item);
      res.redirect(item.url);
    }
  }),
];

exports.item_delete_get = (req, res, next) => {
  res.send(`Not implemented yet. item DELETE FORM: ${req.params.id}`);
};

exports.item_delete_post = (req, res, next) => {
  res.send(`Not implemented yet. item DELETE POST: ${req.params.id}`);
};

exports.item_detail = asyncHandler(async (req, res, next) => {
  const item = await Item.findById(req.params.id)
    .populate("category manufacturer")
    .exec();

  res.render("item_detail", {
    title: "Item details",
    item: item,
  });
});
