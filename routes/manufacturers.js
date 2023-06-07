const express = require("express");
const router = express.Router();

/// MANUFACTURER ROUTES ///

// GET manufacturers
router.get("/", (req, res, next) => {});

// GET request for creating manufacturer
router.get("/:id/create", (req, res, next) => {});

// POST request for creating manufacturer
router.post("/:id/create", (req, res, next) => {});

// GET request for updating manufacturer
router.get("/:id/update", (req, res, next) => {});

// POST request for updating manufacturer
router.post("/:id/update", (req, res, next) => {});

// GET request for deleting manufacturer
router.get("/:id/delete", (req, res, next) => {});

// POST request for deleting manufacturer
router.post("/:id/delete", (req, res, next) => {});

// GET request for a manufacturer
router.get("/:id", (req, res, next) => {});

module.exports = router;
