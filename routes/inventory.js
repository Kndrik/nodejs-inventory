const express = require("express");
const router = express.Router();

const inventory_controller = require("../controllers/inventoryController");

const categoriesRouter = require("./categories");
const manufacturersRouter = require("./manufacturers");
const itemsRouter = require("./items");

router.use("/categories", categoriesRouter);
router.use("/manufacturers", manufacturersRouter);
router.use("/items", itemsRouter);

// Get index page
router.get("/", inventory_controller.display_inventory);

module.exports = router;
