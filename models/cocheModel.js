const mongoose = require("mongoose");

const cocheSchema = new mongoose.Schema({
  marca: String,
  modelo: String,
  cv: String,
  precio: String,
});

const Coche = mongoose.model("Coche", cocheSchema);

module.exports = Coche;
