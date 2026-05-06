const express = require("express");

const app = express();

const PORT = 3000;

app.use(express.json());

// Ruta principal
app.get("/", (req, res) => {

    res.send("Servidor funcionando");

});


// API - listar archivos
app.get("/api/files", (req, res) => {

    res.json([
        "hola.md",
        "tarea.md",
        "readme.md"
    ]);

});

//API - mostrar contenido
app.get("/api/files/:name", (req, res) => {

    const nombre = req.params.name;

    res.json({
        html: `<h1>Contenido de ${nombre}</h1>`
    });

});

//API - recibir JSON

app.post("/api/files", (req, res) => {

    const { nombre, contenido } = req.body;

    res.json({
        mensaje: "Archivo recibido",
        nombre,
        contenido
    });

});

app.listen(PORT, () => {

    console.log(`Servidor corriendo en http://localhost:${PORT}`);

});