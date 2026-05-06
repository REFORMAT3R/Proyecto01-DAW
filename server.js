const express = require("express");
const fs = require('fs');
const path = require('path');
const { marked } = require('marked');

const app = express();
const PORT = 3000;

app.use(express.json());
// Listar archivos markdown
app.get('/archivos', (req, res) => {
    const dir = path.join(__dirname, 'markdown');

    fs.readdir(dir, (err, files) => {
        if (err) {
            return res.json({ error: "Error leyendo archivos" });
        }

        const mdFiles = files.filter(f => f.endsWith('.md'));
        res.json({ archivos: mdFiles });
    });
});

//Leer y convertir markdown a HTML
app.get('/archivo/:nombre', (req, res) => {
    const ruta = path.join(__dirname, 'markdown', req.params.nombre);

    fs.readFile(ruta, 'utf8', (err, data) => {
        if (err) return res.json({ error: "No encontrado" });

        const html = marked(data);

        res.json({ contenido: html });
    });
});

//Crear archivo markdown
app.post('/archivo', (req, res) => {
    const { nombre, contenido } = req.body;

    if (!nombre || !contenido) {
        return res.json({ error: "Faltan datos" });
    }

    const ruta = path.join(__dirname, 'markdown', nombre + '.md');

    fs.writeFile(ruta, contenido, (err) => {
        if (err) return res.json({ error: "No se pudo guardar" });

        res.json({ mensaje: "Archivo creado" });
    });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
