const express = require("express");
const router = express.Router();

/// ITEM ROUTES ///

// GET items
router.get("/", (req, res, next) => {});

// GET request for creating item
router.get("/:id/create", (req, res, next) => {});

// POST request for creating item
router.post("/:id/create", (req, res, next) => {});

// GET request for updating item
router.get("/:id/update", (req, res, next) => {});

// POST request for updating item
router.post("/:id/update", (req, res, next) => {});

// GET request for deleting item
router.get("/:id/delete", (req, res, next) => {});

// POST request for deleting item
router.post("/:id/delete", (req, res, next) => {});

// GET request for a item
router.get("/:id", (req, res, next) => {});

module.exports = router;
