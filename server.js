const express = require("express");
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('public'));


// Listar archivos
app.get("/api/files", (req, res) => {

    const dir = path.join(__dirname, 'markdowns');

    fs.readdir(dir, (err, files) => {

        if (err) {
            return res.json({ error: "Error leyendo archivos" });
        }

        const mdFiles = files.filter(f => f.endsWith('.md'));

        res.json(mdFiles);

    });

});


// Mostrar contenido
app.get("/api/files/:name", async (req, res) => {

    const nombre = req.params.name;

    const ruta = path.join(__dirname, 'markdowns', nombre);

    fs.readFile(ruta, 'utf8', async (err, data) => {

        if (err) {
            return res.json({ error: "Archivo no encontrado" });
        }

        const { marked } = await import('marked');

        const html = marked(data);

        res.json({
            html: html
        });

    });

});


// Crear archivo markdown
app.post("/api/files", (req, res) => {

    const { nombre, contenido } = req.body;

    if (!nombre || !contenido) {
        return res.json({ error: "Faltan datos" });
    }

    const ruta = path.join(__dirname, 'markdowns', nombre + '.md');

    fs.writeFile(ruta, contenido, (err) => {

        if (err) {
            return res.json({ error: "No se pudo guardar" });
        }

        res.json({
            mensaje: "Archivo creado"
        });

    });

});

app.listen(PORT, () => {

    console.log(`Servidor corriendo en http://localhost:${PORT}`);

});