exports.display_inventory = (req, res, next) => {
  res.render("index", {
    title: "Inventory",
  });
};
