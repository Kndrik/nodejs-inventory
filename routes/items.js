const express = require("express");
const router = express.Router();

const item_controller = require("../controllers/itemController");

/// ITEM ROUTES ///

// GET items
router.get("/", item_controller.item_list);

// GET request for creating item
router.get("/:id/create", item_controller.item_create_get);

// POST request for creating item
router.post("/:id/create", item_controller.item_create_post);

// GET request for updating item
router.get("/:id/update", item_controller.item_update_get);

// POST request for updating item
router.post("/:id/update", item_controller.item_update_post);

// GET request for deleting item
router.get("/:id/delete", item_controller.item_delete_get);

// POST request for deleting item
router.post("/:id/delete", item_controller.item_delete_post);

// GET request for a item
router.get("/:id", item_controller.item_detail);

module.exports = router;
