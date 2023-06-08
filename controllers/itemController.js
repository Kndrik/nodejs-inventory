const Item = require("../models/item");

const asyncHandler = require("express-async-handler");

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

exports.item_create_get = (req, res, next) => {
  res.send(`Not implemented yet. item CREATE FORM`);
};

exports.item_create_post = (req, res, next) => {
  res.send(`Not implemented yet. item CREATE POST`);
};

exports.item_update_get = (req, res, next) => {
  res.send(`Not implemented yet. item UPDATE FORM: ${req.params.id}`);
};

exports.item_update_post = (req, res, next) => {
  res.send(`Not implemented yet. item UPDATE POST: ${req.param.id}`);
};

exports.item_delete_get = (req, res, next) => {
  res.send(`Not implemented yet. item DELETE FORM: ${req.params.id}`);
};

exports.item_delete_post = (req, res, next) => {
  res.send(`Not implemented yet. item DELETE POST: ${req.params.id}`);
};

exports.item_detail = (req, res, next) => {
  res.send(`Not implemented yet. item DETAILS: ${req.params.id}`);
};
