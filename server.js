const express = require("express");

const fs = require("fs");
const path = require("path");
const { marked } = require("marked");

const app = express();

const PORT = 3000;

app.use(express.json());

// Ruta principal
app.get("/", (req, res) => {

    res.send("Servidor funcionando");

});


// API - listar archivos
app.get("/api/files", (req, res) => {

    const dir = path.join(__dirname, "markdowns");

    fs.readdir(dir, (err, files) => {

        if (err) {

            return res.json({
                error: "Error leyendo archivos"
            });

        }

        const mdFiles = files.filter(file =>
            file.endsWith(".md")
        );

        res.json(mdFiles);

    });

});
//API - mostrar contenido
app.get("/api/files/:name", (req, res) => {

    const ruta = path.join(
        __dirname,
        "markdowns",
        req.params.name
    );

    fs.readFile(ruta, "utf8", (err, data) => {

        if (err) {

            return res.json({
                error: "Archivo no encontrado"
            });

        }

        const html = marked(data);

        res.json({
            html
        });

    });

});

//API - recibir JSON

app.post("/api/files", (req, res) => {

    const { nombre, contenido } = req.body;

    if (!nombre || !contenido) {

        return res.json({
            error: "Faltan datos"
        });

    }

    const ruta = path.join(
        __dirname,
        "markdowns",
        nombre + ".md"
    );

    fs.writeFile(ruta, contenido, (err) => {

        if (err) {

            return res.json({
                error: "No se pudo guardar"
            });

        }

        res.json({
            mensaje: "Archivo creado"
        });

    });

});

app.listen(PORT, () => {

    console.log(`Servidor corriendo en http://localhost:${PORT}`);

});