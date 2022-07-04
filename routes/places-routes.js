const express = require("express");

const router = express.Router();

const {
  getPlaceById,
  getPlacesByUsers,
  createPlace,
  getAllPlaces,
  updatePlace,
  deletePlace,
} = require("../controllers/places.controller");

router.get("/", getAllPlaces);
router.get("/:id", getPlaceById);
router.get("/user/:uid", getPlacesByUsers);

router.post("/", createPlace);
router.patch("/", updatePlace);
router.delete("/", deletePlace);

module.exports = router;
