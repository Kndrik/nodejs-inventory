const express = require("express");
const router = express.Router();

const manufacturer_controller = require("../controllers/manufacturerController");

/// MANUFACTURER ROUTES ///

// GET manufacturers
router.get("/", manufacturer_controller.manufacturer_list);

// GET request for creating manufacturer
router.get("/create", manufacturer_controller.manufacturer_create_get);

// POST request for creating manufacturer
router.post("/create", manufacturer_controller.manufacturer_create_post);

// GET request for updating manufacturer
router.get("/:id/update", manufacturer_controller.manufacturer_update_get);

// POST request for updating manufacturer
router.post("/:id/update", manufacturer_controller.manufacturer_update_post);

// GET request for deleting manufacturer
router.get("/:id/delete", manufacturer_controller.manufacturer_delete_get);

// POST request for deleting manufacturer
router.post("/:id/delete", manufacturer_controller.manufacturer_delete_post);

// GET request for a manufacturer
router.get("/:id", manufacturer_controller.manufacturer_detail);

module.exports = router;
