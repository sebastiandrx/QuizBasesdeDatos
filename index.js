const express = require('express');
const pool = require('./db');

const app = express();
app.use(express.json());
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});

// API PERSONA

// Crear persona
app.post('/api/persona', async (req, res) => {
    const { nombre, apellido1, apellido2, dni } = req.body;
    const query = 'INSERT INTO persona (nombre, apellido1, apellido2, dni) VALUES ($1, $2, $3, $4) RETURNING *';

    try {
        const result = await pool.query(query, [nombre, apellido1, apellido2, dni]);
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear persona', error: error.message });
    }
});

// Obtener todas las personas
app.get('/api/personas', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM persona');
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener personas', error: error.message });
    }
});

// API COCHE

// Crear coche vinculado a una persona
app.post('/api/coche', async (req, res) => {
    const { matricula, marca, modelo, caballos, persona_id } = req.body;
    const query = 'INSERT INTO coche (matricula, marca, modelo, caballos, persona_id) VALUES ($1, $2, $3, $4, $5) RETURNING *';

    try {
        const result = await pool.query(query, [matricula, marca, modelo, caballos, persona_id]);
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear coche', error: error.message });
    }
});

// Obtener todos los coches con datos de persona
app.get('/api/coches', async (req, res) => {
    const query = `
        SELECT c.*, p.nombre, p.apellido1, p.apellido2
        FROM coche c
        INNER JOIN persona p ON c.persona_id = p.id
    `;

    try {
        const result = await pool.query(query);
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener coches', error: error.message });
    }
});

// Obtener coches por persona específica
app.get('/api/persona/:id/coches', async (req, res) => {
    const personaId = req.params.id;
    const query = 'SELECT * FROM coche WHERE persona_id = $1';

    try {
        const result = await pool.query(query, [personaId]);
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener coches de la persona', error: error.message });
    }
});
