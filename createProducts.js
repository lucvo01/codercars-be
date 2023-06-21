const fs = require("fs");
const csv = require("csvtojson");

const createProduct = async () => {
  let newData = await csv().fromFile("data.csv");

  newData = newData.map((car) => {
    const transformedCar = {
      make: car.Make,
      model: car.Model,
      release_date: parseInt(car.Year),
      transmission_type: car["Transmission Type"],
      size: car["Vehicle Size"],
      price: parseInt(car["MSRP"]),
      style: car["Vehicle Style"],
      isDeleted: false
    };

    return transformedCar;
  });

  let data = JSON.parse(fs.readFileSync("data.json", "utf-8"));
  data = newData;

  fs.writeFileSync("data.json", JSON.stringify(data));
};

createProduct();
