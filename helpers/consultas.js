const { Pool } = require('pg')

const pool = new Pool({
    user: 'postgres',
    database: 'repertorio',
    host: 'localhost',
    password: '', //completar con password
    port: 5432
})

//agregar canción
const agregar = async(cancion) => {
    try {
        const { titulo, artista, tono } = cancion; 
        const config = {
            text: "INSERT INTO canciones( titulo, artista, tono ) VALUES($1, $2, $3 ) RETURNING *",
            values: [ titulo, artista, tono ]
        };
        const resp = await pool.query(config);
        return resp;
    } catch (error) {
        return error
    }
};

//mostrar lista de canciones
const lista = async() => {
    const sql = "SELECT * FROM canciones";
    const resp = await pool.query(sql);
    return resp.rows;
};

//eliminar canción de la lista
const eliminar = async(id) => {
    try {
        const config = {
            text: "DELETE FROM canciones WHERE id=$1 RETURNING *",
            values: [ id ]
        }
        const resp = await pool.query(config);
        return resp;
    } catch (error) {
        return error;
    }   
};

const editar = async(id, cancion) => {
    const { titulo, artista, tono} = cancion;
    const config = {
        text:"UPDATE canciones SET titulo=$2, artista=$3, tono=$4 WHERE id=$1 RETURNING *",
        values: [id, titulo, artista, tono]
    }
    try {
        const resp = await pool.query(config);
        return resp;
    } catch (error) {
        return error;
    }
}


//exportacion de modulos
module.exports = { agregar, lista, eliminar, editar }