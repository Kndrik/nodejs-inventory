const express = require("express");
const router = express.Router();

const categoriesRouter = require("./categories");
const manufacturersRouter = require("./manufacturers");
const itemsRouter = require("./items");

router.use("/categories", categoriesRouter);
router.use("/manufacturers", manufacturersRouter);
router.use("/items", itemsRouter);

// Get index page
router.get("/", function (req, res, next) {
  res.send("Index page");
});

module.exports = router;
