const Manufacturer = require("../models/manufacturer");
const Item = require("../models/item");

const asyncHandler = require("express-async-handler");

const { body, validationResult } = require("express-validator");

exports.manufacturer_list = asyncHandler(async (req, res, next) => {
  const manufacturers = await Manufacturer.find({}, "name").exec();

  res.render("manufacturer_list", {
    title: "All manufacturers",
    manufacturer_list: manufacturers,
  });
});

exports.manufacturer_create_get = (req, res, next) => {
  res.render("manufacturer_form", {
    title: "New manufacturer",
  });
};

exports.manufacturer_create_post = [
  body("name", "Name must not be empty.").trim().isLength({ min: 1 }).escape(),
  body("address", "Address must not be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const manufacturer = new Manufacturer({
      name: req.body.name,
      address: req.body.address,
    });

    req.newManufacturer = manufacturer;

    if (!errors.isEmpty()) {
      res.render("manufacturer_form", {
        title: "New manufacturer",
        manufacturer: manufacturer,
        errors: errors.array(),
      });
    } else {
      next();
    }
  }),

  asyncHandler(async (req, res, next) => {
    // Check if manufacturer already exists
    const existingManufacturer = await Manufacturer.findOne({
      name: req.body.name,
    }).exec();

    if (existingManufacturer !== null) {
      res.render("manufacturer_form", {
        title: "New manufacturer",
        manufacturer: req.newManufacturer,
        errors: [{ msg: "A manufacturer with this name already exists." }],
      });
    } else {
      await req.newManufacturer.save();
      res.redirect(req.newManufacturer.url);
    }
  }),
];

exports.manufacturer_update_get = (req, res, next) => {
  res.send(`Not implemented yet. manufacturer UPDATE FORM: ${req.params.id}`);
};

exports.manufacturer_update_post = (req, res, next) => {
  res.send(`Not implemented yet. manufacturer UPDATE POST: ${req.param.id}`);
};

exports.manufacturer_delete_get = (req, res, next) => {
  res.send(`Not implemented yet. manufacturer DELETE FORM: ${req.params.id}`);
};

exports.manufacturer_delete_post = (req, res, next) => {
  res.send(`Not implemented yet. manufacturer DELETE POST: ${req.params.id}`);
};

exports.manufacturer_detail = asyncHandler(async (req, res, next) => {
  const [manufacturer, itemsByManufacturer] = await Promise.all([
    Manufacturer.findById(req.params.id).exec(),
    Item.find({ manufacturer: req.params.id }).sort({ category: 1 }).exec(),
  ]);

  res.render("manufacturer_detail", {
    title: "Manufacturer",
    manufacturer: manufacturer,
    item_list: itemsByManufacturer,
  });
});
