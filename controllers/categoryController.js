const { body, validationResult } = require("express-validator");
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
  res.render("category_form", {
    title: "New category",
  });
};

exports.category_create_post = [
  body("name", "Name must not be empty.").trim().isLength({ min: 1 }).escape(),
  body("description", "Must contain a description.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const category = new Category({
      name: req.body.name,
      description: req.body.description,
    });

    req.newCategory = category;

    if (!errors.isEmpty()) {
      // There are errors
      // Re render form
      res.render("category_form", {
        title: "New category",
        category: category,
        errors: errors.array(),
      });
    } else {
      next();
    }
  }),
  asyncHandler(async (req, res, next) => {
    // Check if category already exists
    const existingCategory = await Category.findOne({
      name: req.body.name,
    }).exec();

    if (existingCategory !== null) {
      // Category already exists
      res.render("category_form", {
        title: "New category",
        category: req.newCategory,
        errors: [{ msg: "A category with this name already exists." }],
      });
    } else {
      await req.newCategory.save();
      res.redirect(req.newCategory.url);
    }
  }),
];

exports.category_update_get = asyncHandler(async (req, res, next) => {
  const category = await Category.findById(req.params.id);

  res.render("category_form", {
    title: "Update category",
    category: category,
  });
});

exports.category_update_post = [
  body("name", "Name must not be empty.").trim().isLength({ min: 1 }).escape(),
  body("description", "Must contain a description.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const category = new Category({
      name: req.body.name,
      description: req.body.description,
      _id: req.params.id,
    });

    req.newCategory = category;

    if (!errors.isEmpty()) {
      // There are errors
      // Re render form
      res.render("category_form", {
        title: "New category",
        category: category,
        errors: errors.array(),
      });
    } else {
      next();
    }
  }),
  asyncHandler(async (req, res, next) => {
    // Check if category already exists
    const existingCategory = await Category.findOne({
      name: req.body.name,
    }).exec();

    if (
      existingCategory !== null &&
      existingCategory._id.toString() !== req.params.id.toString()
    ) {
      // Category already exists
      res.render("category_form", {
        title: "New category",
        category: req.newCategory,
        errors: [{ msg: "A category with this name already exists." }],
      });
    } else {
      await Category.findByIdAndUpdate(req.params.id, req.newCategory);
      res.redirect(req.newCategory.url);
    }
  }),
];

exports.category_delete_get = asyncHandler(async (req, res, next) => {
  const category = await Category.findById(req.params.id, "name");
  res.render("category_delete", {
    title: "Delete category",
    category: category,
  });
});

exports.category_delete_post = asyncHandler(async (req, res, next) => {
  const linkedItems = await Item.find(
    { category: req.params.id },
    "name"
  ).exec();

  if (linkedItems.length > 0) {
    const category = await Category.findById(req.params.id);
    // There are linked items
    res.render("category_delete", {
      title: "Delete category",
      errors: [
        {
          msg: "Please delete these items before trying to delete this category",
        },
      ],
      category: category,
      item_list: linkedItems,
    });
  } else {
    await Category.findByIdAndRemove(req.params.id);
    res.redirect("/inventory/categories");
  }
});

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
