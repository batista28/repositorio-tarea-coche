/**
 * Tres formas de almacenar valores en memoria en javascript:
 *      let: se puede modificar
 *      var: se puede modificar
 *      const: es constante y no se puede modificar
 */

// Importamos las bibliotecas necesarias.
// Concretamente el framework express.
const express = require("express");

// Inicializamos la aplicación
const app = express();

// Indicamos que la aplicación puede recibir JSON (API Rest)
app.use(express.json());

// Indicamos el puerto en el que vamos a desplegar la aplicación
const port = process.env.PORT || 8080;

// Arrancamos la aplicación
app.listen(port, () => {
  console.log(`Servidor desplegado en puerto: ${port}`);
});

// Definimos una estructura de datos
// (temporal hasta incorporar una base de datos)
let concesionarios = [
  {
    nombre: "Martinez",
    direccion: "calle ave de paraiso 7",
    coches: [
      { marca: "Toyota", modelo: "Corolla", cv: "140", precio: "40.000" },
      { marca: "Nissan", modelo: "x-trail", cv: "204", precio: "30.000" },
      { marca: "Renault", modelo: "Clio", cv: "160", precio: "29.000" },
      { marca: "Kia", modelo: "Niro", cv: "160", precio: "35.000" },
    ],
  },

  {
    nombre: "Jimenez y familia",
    direccion: "calle aqui mismo",
    coches: [
      { marca: "Toyota", modelo: "Rav4", cv: "180", precio: "45.000" },
      { marca: "Nissan", modelo: "x-trail", cv: "140", precio: "31.000" },
      { marca: "Hyundai", modelo: "Tucson", cv: "190", precio: "33.000" },
      { marca: "Kia", modelo: "Sportage", cv: "220", precio: "38.000" },
    ],
  },

  {
    nombre: "Coches Carabante,el mejor precio al volante",
    direccion: "calle ruina 33",
    coches: [
      { marca: "Toyota", modelo: "Yaris cross", cv: "190", precio: "25.000" },
      { marca: "Nissan", modelo: "x-trail", cv: "177", precio: "55.000" },
      { marca: "Renault", modelo: "Clio", cv: "160", precio: "35.000" },
      { marca: "Honda", modelo: "Civic", cv: "200", precio: "46.000" },
    ],
  },
];

// Lista todos los concesionarios
app.get("/concesionarios", (request, response) => {
  response.json(concesionarios);
});

// Añadir un nuevo concesionario
app.post("/concesionarios", (request, response) => {
  concesionarios.push(request.body);
  response.json({ message: "ok" });
});

// Obtener un solo concesionario
app.get("/concesionarios/:id", (request, response) => {
  const id = request.params.id;
  const result = concesionarios[id];
  response.json({ result });
});

// Actualizar un solo concesionario
app.put("/concesionarios/:id", (request, response) => {
  const id = request.params.id;
  concesionarios[id] = request.body;
  response.json({ message: "ok" });
});

// Borrar un elemento del array concesionarios
app.delete("/concesionarios/:id", (request, response) => {
  const id = parseInt(request.params.id);
  concesionarios = concesionarios.filter((item, index) => index !== id);

  response.json({ message: "ok" });
});
// Devuelve todos los coches del concesionario pasado por id (solo los coches)
app.get("/concesionarios/:id/coches", (request, response) => {
  const id = request.params.id;
  const concesionarios = request.params.coches;
  const result = concesionarios[id].coches;
  response.json({ result });
});

//Añade un nuevo coche al concesionario pasado por id.
app.post("/concesionarios/:id/coches", (request, response) => {
  const id = request.params.id;
  concesionarios[id].coches.push(request.body);

  response.json({ message: "ok" });
});
//Obtiene el coche cuyo id sea cocheId, del concesionario pasado por id
app.get("/concesionarios/:id/coches/:cocheid", (request, response) => {
  const id = request.params.id;
  const cocheid = request.params.cocheid;
  const result = concesionarios[id].coches[cocheid];
  response.json({ result });
});

app.put("/concesionarios/:id/coches/cocheid", (request, response) => {
  const id = request.params.id;
  const cocheid = request.params.cocheid;
  concesionarios[id].coches[cocheid] = request.body;
  response.json({ message: "ok" });
});
app.delete("/concesionarios/:id", (request, response) => {
  const id = parseInt(request.params.id);
  const cocheid = parseInt(request.params.cocheidid);
  concesionarios[i].coches = concesionarios[id].coches.filter(
    (item, index) => index !== id
  );

  response.json({ message: "ok" });
});
