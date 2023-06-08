const Manufacturer = require("../models/manufacturer");

const asyncHandler = require("express-async-handler");

exports.manufacturer_list = asyncHandler(async (req, res, next) => {
  const manufacturers = await Manufacturer.find({}, "name").exec();

  res.render("manufacturer_list", {
    title: "All manufacturers",
    manufacturer_list: manufacturers,
  });
});

exports.manufacturer_create_get = (req, res, next) => {
  res.send(`Not implemented yet. manufacturer CREATE FORM`);
};

exports.manufacturer_create_post = (req, res, next) => {
  res.send(`Not implemented yet. manufacturer CREATE POST`);
};

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

exports.manufacturer_detail = (req, res, next) => {
  res.send(`Not implemented yet. manufacturer DETAILS: ${req.params.id}`);
};
