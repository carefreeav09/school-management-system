const HttpError = require("../utils/HttpError");
const Place = require("../models/place-models");

const { validationResult } = require("express-validator");

const { returnObject, returnArray } = require("../utils/result.js");

const getAllPlaces = async (req, res, next) => {
  let places;

  try {
    places = await Place.find();
  } catch (err) {
    const error = new HttpError(
      "Fetching places failed, please try again",
      500
    );
    return next(error);
  }

  res.json({
    message: "Hello from from all data",
    data: returnArray(places),
  });
};

const getPlaceById = async (req, res, next) => {
  const placeId = req.params.id;
  let place;

  try {
    place = await Place.findById(placeId);
  } catch (err) {
    console.log(err, "err");
    const error = new HttpError(
      "Something went wrong, could not find place.",
      500
    );

    return next(error);
  }

  if (!place) {
    const error = new HttpError(
      "Could not find place for the provided id.",
      404
    );
    return next(error);
  }

  res.json({
    message: "Hello from from single data",
    data: returnObject(place),
    status: 200,
  });
};

const getPlacesByUsers = async (req, res, next) => {
  const userId = req.params.uid;
  let places;

  try {
    places = await Place.find({
      creator: userId,
    });
  } catch (err) {
    console.log(err, "err");
    const error = new HttpError(
      "Something went wrong, could not find place.",
      500
    );

    return next(error);
  }

  if (places.length === 0) {
    let error = new Error("User has no places");
    error.code = 404;

    return next(new HttpError("User has no places", 404));
  }

  res.json({
    message: "Hello from from single data",
    data: returnArray(places),
    status: 200,
  });
};

const createPlace = async (req, res, next) => {
  const { name, description, location, address, creator } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const createdPlace = new Place({
    name,
    description,
    location,
    address,
    creator,
    image: "https://dummyimage.com/600x400/000/fff",
  });

  try {
    await createdPlace.save();
  } catch (err) {
    const error = new HttpError("Creating place failed, try again", 500);
    return next(error);
  }

  res.status(201).json({
    message: "Place created successfully",
    data: createdPlace,
  });
};

const updatePlace = async (req, res, next) => {
  const { id } = req.body;

  let place;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  try {
    place = await Place.findById(id);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find place.",
      500
    );
    return next(error);
  }

  try {
    Object.assign(place, req.body);
    await place.save();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update place.",
      500
    );
    return next(error);
  }

  res.status(200).json({
    message: "Place updated successfully",
    data: place,
    status: 200,
  });
};

const deletePlace = async (req, res, next) => {
  const { id } = req.body;
  let place;

  try {
    place = await Place.findById(id);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find place.",
      500
    );

    return next(error);
  }

  if (!place) {
    const error = new HttpError(
      "Could not find place for the provided id.",
      404
    );
    return next(error);
  }

  try {
    place.remove();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find place.",
      500
    );

    return next(error);
  }

  res.json({
    message: "Place deleted successfully",
    status: 200,
  });
};

module.exports = {
  getAllPlaces,
  getPlaceById,
  getPlacesByUsers,
  createPlace,
  updatePlace,
  deletePlace
};
