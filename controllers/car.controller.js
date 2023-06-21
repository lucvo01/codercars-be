// const mongoose = require("mongoose");
const Car = require("../models/Car");
const { sendResponse, AppError } = require("../helpers/utils");
const carController = {};

carController.createCar = async (req, res, next) => {
  try {
    // YOUR CODE HERE
    const info = req.body;
    if (!info) throw new AppError(401, "Bad Request", "Create car Error");

    const created = await Car.create(info);
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
    let { page, limit } = req.query;
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;

    //Number of items skip for selection
    let offset = limit * (page - 1);

    const filter = req.query;
    let listOfFound = await Car.find({}).skip(offset).limit(10);
    listOfFound = listOfFound.filter((car) => car.isDeleted === false);
    const count = Car.countDocuments({});
    const totalPage = Math.ceil(11914 / limit);

    sendResponse(
      res,
      200,
      true,
      "Get Car List Successfully!",
      { cars: listOfFound, page: page, total: totalPage },
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
    const targetId = req.params.id;
    const updateInfo = req.body;
    const options = { new: true };

    const updated = await Car.findByIdAndUpdate(targetId, updateInfo, options);

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
    // const options = { new: true };

    // const updated = await Car.findByIdAndDelete(targetId, options);
    const updated = await Car.findByIdAndUpdate(targetId, { isDeleted: true });

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
