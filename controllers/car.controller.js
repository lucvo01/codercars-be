const mongoose = require("mongoose");
const Car = require("../models/Car");
const { sendResponse, AppError } = require("../helpers/utils");
const carController = {};

carController.createCar = async (req, res, next) => {
  try {
    // YOUR CODE HERE
    const info = req.body;
    if (!info) throw new AppError(401, "Bad Request", "Create car Error");

    const created = await car.create(info);
    sendResponse(
      res,
      200,
      true,
      { car: created },
      null,
      "Create Car Successfully"
    );
  } catch (err) {
    // YOUR CODE HERE
    next(err);
  }
};

carController.getCars = async (req, res, next) => {
  try {
    // YOUR CODE HERE
    const filter = req.query;
    const listOfFound = await Car.find({}).limit(2);
    sendResponse(
      res,
      200,
      true,
      "Get Car List Successfully!",
      { cars: listOfFound, page: 1, total: 11914 },
      null
    );
  } catch (err) {
    // YOUR CODE HERE
    next(err);
  }
};

carController.editCar = async (req, res, next) => {
  try {
    // YOUR CODE HERE
    const targetId = req.body.targetId;
    const updateInfo = req.body.updateInfo;
    const options = { new: true };

    const updated = await car.findByIdAndUpdate(targetId, updateInfo, options);

    sendResponse(
      res,
      200,
      true,
      { car: updated },
      null,
      "Update Car Successfully!"
    );
  } catch (err) {
    // YOUR CODE HERE
    next(err);
  }
};

carController.deleteCar = async (req, res, next) => {
  try {
    // YOUR CODE HERE
    const targetId = req.params.id;
    const options = { new: true };

    const updated = await car.findByIdAndDelete(targetId, options);

    sendResponse(
      res,
      200,
      true,
      { car: updated },
      null,
      "Delete Car Successfully!"
    );
  } catch (err) {
    // YOUR CODE HERE
    next(err);
  }
};

module.exports = carController;
