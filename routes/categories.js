const express = require("express");
const router = express.Router();

const category_controller = require("../controllers/categoryController");

/// CATEGORY ROUTES ///

// GET categories
router.get("/", category_controller.category_list);

// GET request for creating category
router.get("/create", category_controller.category_create_get);

// POST request for creating category
router.post("/create", category_controller.category_create_post);

// GET request for updating category
router.get("/:id/update", category_controller.category_update_get);

// POST request for updating category
router.post("/:id/update", category_controller.category_update_post);

// GET request for deleting category
router.get("/:id/delete", category_controller.category_delete_get);

// POST request for deleting category
router.post("/:id/delete", category_controller.category_delete_post);

// GET request for a category
router.get("/:id", category_controller.category_detail);

module.exports = router;
