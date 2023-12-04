// concesionarioModel.js
const mongoose = require("mongoose");

const concesionarioSchema = new mongoose.Schema({
  nombre: String,
  direccion: String,
  coches: [{ type: mongoose.Schema.Types.ObjectId, ref: "Coche" }],
});

const Concesionario = mongoose.model("Concesionario", concesionarioSchema);

module.exports = Concesionario;
