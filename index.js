// Requerimientos express
const express = require('express');
const app = express();
//importación modulos helpers
const { agregar, lista, eliminar, editar } = require('./helpers/consultas.js');

//middleware para trabajar JSON
app.use(express.json());

//Levantar servidor
const PORT = 3000;

app.listen(PORT, console.log(`Servidor disponible es http://localhost:${PORT}`));

app.get('/', (req,res)=> {
    res.sendFile(`${__dirname}/index.html`);
});

//Agregar cancion
app.post('/cancion', async(req,res)=>{
    try {
        const cancion = await agregar(req.body);
        res.json(cancion.rows ? cancion : { code: cancion.code })
    } catch (error) {
        res.status(500).json({error: "Ha ocurrido un error en el servidor"})
    }   
});

//mostrar en pantalla las canciones
app.get('/canciones', async(req,res) => {
    const resp = await lista();
    res.json(resp);
});

//eliminar canción
app.delete('/cancion', async(req,res) => {
    const id = req.query.id;
    const resp = await eliminar(id)
    res.json( resp.rows ? resp : {code: resp.code})
})

//editar canción
app.put('/cancion/:id', async(req,res)=> {
    const { id } = req.params;
    try {
        const resp = await editar(id, req.body);
        res.json(resp.rows ? resp : { code: resp.code})
    } catch (error) {
        res.json({ error  })
    }
})