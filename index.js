const express = require("express");
const { MongoClient } = require("mongodb");

const app = express();

// Configuración de la conexión a MongoDB
const mongoURI = "mongodb://localhost:27017/concesionario";
const client = new MongoClient(mongoURI);

// Indicamos el puerto en el que vamos a desplegar la aplicación
const port = process.env.PORT || 8080;

// Arrancamos la aplicación
app.listen(port, () => {
    console.log(`Servidor desplegado en puerto: ${port}`);
});
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
app.get("/concesionarios", async (request, response) => {
    try {
        //conectamos la base de datos
        const client = await MongoClient.connect(mongoURI);
        const db = client.db("concesionarios");
        const collection = db.collection("concesionario");

        //hacemos la consulta
        const resultado = await collection.find().toArray();

        //mostramos la consulta
        response.json(resultado);
    } catch (error) {
        console.error("Error de conexión a la base de datos:", error.message);
        res.status(500).send("Error interno del servidor");
    } finally {
        await client.close();
    }
    response.json(concesionarios);
});

// Añadir un nuevo concesionario
app.post("/concesionarios", async (request, response) => {
    try {
        // Conectamos a la base de datos
        const client = await MongoClient.connect(mongoURI);
        const db = client.db("concesionarios");
        const collection = db.collection("concesionario");

        // Insertamos el nuevo concesionario en la base de datos
        const result = await collection.insertOne(request.body);

        response.json({ message: "Concesionario añadido correctamente" });
    } catch (error) {
        console.error("Error de conexión a la base de datos:", error.message);
        response.status(500).json({ error: "Error interno del servidor" });
    } finally {
        await client.close();
    }
});

// Obtener un solo concesionario
app.get("/concesionarios/:id", async (request, response) => {
    const id = request.params.id;

    try {
        // Conectamos a la base de datos
        const client = await MongoClient.connect(mongoURI);
        const db = client.db("concesionarios");
        const collection = db.collection("concesionario");

        // Buscamos el concesionario por su ID
        const result = await collection.findOne({ id: id });
    } catch (error) {
        console.error("Error de conexión a la base de datos:", error.message);
        response.status(500).json({ error: "Error interno del servidor" });
    } finally {
        await client.close();
    }
});
// Actualizar un solo concesionario
app.put("/concesionarios/:id", async (request, response) => {
    const id = request.params.id;

    try {
        // Conectamos a la base de datos
        const client = await MongoClient.connect(mongoURI);
        const db = client.db("concesionarios");
        const collection = db.collection("concesionario");

        // Actualizamos el concesionario por su ID
        const result = await collection.updateOne({ id: id }, { $set: request.body });
    } catch (error) {
        console.error("Error de conexión a la base de datos:", error.message);
        response.status(500).json({ error: "Error interno del servidor" });
    } finally {
        await client.close();
    }
});
// Borrar un concesionario
app.delete("/concesionarios/:id", async (request, response) => {
    const id = request.params.id;

    try {
        // Conectamos a la base de datos
        const client = await MongoClient.connect(mongoURI);
        const db = client.db("concesionarios");
        const collection = db.collection("concesionario");

        // Borramos el concesionario por su ID
        const result = await collection.deleteOne({ id: id });

        if (result.deletedCount > 0) {
            response.json({ message: "Concesionario eliminado correctamente" });
        } else {
            response.status(404).json({ error: "Concesionario no encontrado" });
        }
    } catch (error) {
        console.error("Error de conexión a la base de datos:", error.message);
        response.status(500).json({ error: "Error interno del servidor" });
    } finally {
        await client.close();
    }
});

// Obtener todos los coches de un concesionario por ID
app.get("/concesionarios/:id/coches", async (request, response) => {
    const id = request.params.id;

    try {
        // Conectamos a la base de datos
        const client = await MongoClient.connect(mongoURI);
        const db = client.db("concesionarios");
        const collection = db.collection("concesionario");

        // Buscamos el concesionario por su ID
        const concesionario = await collection.findOne({ id: id });

        if (concesionario) {
            // Devolvemos solo los coches del concesionario
            response.json({ coches: concesionario.coches });
        } else {
            response.status(404).json({ error: "Concesionario no encontrado" });
        }
    } catch (error) {
        console.error("Error de conexión a la base de datos:", error.message);
        response.status(500).json({ error: "Error interno del servidor" });
    } finally {
        await client.close();
    }
});

// Añadir un nuevo coche al concesionario por ID
app.post("/concesionarios/:id/coches", async (request, response) => {
    const id = request.params.id;

    try {
        // Conectamos a la base de datos
        const client = await MongoClient.connect(mongoURI);
        const db = client.db("concesionarios");
        const collection = db.collection("concesionario");

        // Agregamos un nuevo coche al concesionario por su ID
        const result = await collection.updateOne({ id: id }, { $push: { coches: request.body } });

        if (result.modifiedCount > 0) {
            response.json({ message: "Coche añadido correctamente al concesionario" });
        } else {
            response.status(404).json({ error: "Concesionario no encontrado" });
        }
    } catch (error) {
        console.error("Error de conexión a la base de datos:", error.message);
        response.status(500).json({ error: "Error interno del servidor" });
    } finally {
        await client.close();
    }
});

// Obtener un coche específico de un concesionario por ID
app.get("/concesionarios/:id/coches/:cocheid", async (request, response) => {
    const concesionarioId = request.params.id;
    const cocheId = request.params.cocheid;

    try {
        // Conectamos a la base de datos
        const client = await MongoClient.connect(mongoURI);
        const db = client.db("concesionarios");
        const collection = db.collection("concesionario");

        // Buscamos el concesionario por su ID
        const concesionario = await collection.findOne({ id: concesionarioId });

        if (concesionario) {
            // Buscamos el coche por su ID en el array de coches del concesionario
            const coche = concesionario.coches.find((c) => c._id.toString() === cocheId);

            if (coche) {
                response.json(coche);
            } else {
                response.status(404).json({ error: "Coche no encontrado en el concesionario" });
            }
        } else {
            response.status(404).json({ error: "Concesionario no encontrado" });
        }
    } catch (error) {
        console.error("Error de conexión a la base de datos:", error.message);
        response.status(500).json({ error: "Error interno del servidor" });
    } finally {
        await client.close();
    }
});

// Actualizar un coche específico de un concesionario por ID
app.put("/concesionarios/:id/coches/:cocheId", async (request, response) => {
    const concesionarioId = request.params.id;
    const cocheId = request.params.cocheId;

    try {
        // Conectamos a la base de datos
        const client = await MongoClient.connect(mongoURI);
        const db = client.db("concesionarios");
        const collection = db.collection("concesionario");

        // Actualizamos el coche por su ID en el array de coches del concesionario
        const result = await collection.updateOne(
            {
                id: concesionarioId,
                "coches._id": cocheId,
            },
            { $set: { "coches.$": request.body } }
        );

        if (result.modifiedCount > 0) {
            response.json({ message: "Coche actualizado correctamente en el concesionario" });
        } else {
            response.status(404).json({ error: "Coche no encontrado en el concesionario" });
        }
    } catch (error) {
        console.error("Error de conexión a la base de datos:", error.message);
        response.status(500).json({ error: "Error interno del servidor" });
    } finally {
        await client.close();
    }
});
// Eliminar un coche específico de un concesionario por ID
app.delete("/concesionarios/:id/coches/:cocheId", async (request, response) => {
    const concesionarioId = request.params.id;
    const cocheId = request.params.cocheId;

    try {
        // Conectamos a la base de datos
        const client = await MongoClient.connect(mongoURI);
        const db = client.db("concesionarios");
        const collection = db.collection("concesionario");

        // Eliminamos el coche por su ID en el array de coches del concesionario
        const result = await collection.updateOne({ id: concesionarioId }, { $pull: { coches: { id: cocheId } } });

        if (result.modifiedCount > 0) {
            response.json({ message: "Coche eliminado correctamente del concesionario" });
        } else {
            response.status(404).json({ error: "Coche no encontrado en el concesionario" });
        }
    } catch (error) {
        console.error("Error de conexión a la base de datos:", error.message);
        response.status(500).json({ error: "Error interno del servidor" });
    } finally {
        await client.close();
    }
});
