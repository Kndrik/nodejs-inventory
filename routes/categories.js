const express = require("express");
const router = express.Router();

/// CATEGORY ROUTES ///

// GET categories
router.get("/", (req, res, next) => {});

// GET request for creating category
router.get("/:id/create", (req, res, next) => {});

// POST request for creating category
router.post("/:id/create", (req, res, next) => {});

// GET request for updating category
router.get("/:id/update", (req, res, next) => {});

// POST request for updating category
router.post("/:id/update", (req, res, next) => {});

// GET request for deleting category
router.get("/:id/delete", (req, res, next) => {});

// POST request for deleting category
router.post("/:id/delete", (req, res, next) => {});

// GET request for a category
router.get("/:id", (req, res, next) => {});

module.exports = router;
