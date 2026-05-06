const express = require("express");
const fs = require('fs');
const path = require('path');

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

app.get('/md/:nombre', async(req, res)=>{
    const { marked } = await import('marked');
    const nombreArchivo= req.params.nombre;
    const ruta = path.join(__dirname, 'markdowns', nombreArchivo + '.md')

    fs.readFile(ruta, 'utf-8',(err,  data)=>{
        if(err){
            return res.send("Archivo no encontrado");
        }
        const html = marked(data);
        res.send(html);
    })
})

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

