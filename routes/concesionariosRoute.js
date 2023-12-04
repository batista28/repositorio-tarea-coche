const express = require("express");

const router = express.Router();

// ... Otras rutas ...

// Obtener todos los concesionarios
router.get("/concesionarios", async (req, res) => {
    try {
        const concesionarios = await Concesionario.find();
        res.json(concesionarios);
    } catch (error) {
        console.error("Error al obtener concesionarios:", error.message);
        res.status(500).send("Error interno del servidor");
    }
});

// Añadir un nuevo concesionario
router.post("/concesionarios", async (req, res) => {
    try {
        const nuevoConcesionario = new Concesionario(req.body);
        await nuevoConcesionario.save();
        res.json({ message: "ok" });
    } catch (error) {
        console.error("Error al crear el concesionario:", error.message);
        res.status(500).send("Error interno del servidor");
    }
});

// Obtener un solo concesionario
router.get("/concesionarios/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const concesionario = await Concesionario.findById(id);
        res.json({ result: concesionario });
    } catch (error) {
        console.error("Error al obtener el concesionario:", error.message);
        res.status(500).send("Error interno del servidor");
    }
});

// ... Otras rutas ...

// Obtener todos los coches de un concesionario
router.get("/concesionarios/:id/coches", async (req, res) => {
    const id = req.params.id;
    try {
        const concesionario = await Concesionario.findById(id).populate("coches");
        res.json({ result: concesionario.coches });
    } catch (error) {
        console.error("Error al obtener coches del concesionario:", error.message);
        res.status(500).send("Error interno del servidor");
    }
});

// Añadir un nuevo coche a un concesionario
router.post("/concesionarios/:id/coches", async (req, res) => {
    const id = req.params.id;
    try {
        const concesionario = await Concesionario.findById(id);
        if (!concesionario) {
            return res.status(404).json({ message: "Concesionario no encontrado" });
        }

        const nuevoCoche = new Coche(req.body);
        await nuevoCoche.save();

        concesionario.coches.push(nuevoCoche);
        await concesionario.save();
        res.json({ message: "ok" });
    } catch (error) {
        console.error("Error al añadir el coche:", error.message);
        res.status(500).send("Error interno del servidor");
    }
});

// ... Otras rutas ...

module.exports = router;
