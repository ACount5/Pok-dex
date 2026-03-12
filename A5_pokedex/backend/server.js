require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Database connection pool
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'pokedex_2026',
    port: process.env.DB_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Simple endpoint to test DB connection
app.get('/api/test-db', async (req, res) => {
    try {
        const connection = await pool.getConnection();
        connection.release();
        res.json({ message: 'Conexión a la base de datos exitosa' });
    } catch (error) {
        res.status(500).json({ error: 'Error conectando a la base de datos', details: error.message });
    }
});

// Endpoint to get all pokemons
app.get('/api/pokemons', async (req, res) => {
    try {
        const { search } = req.query;
        // Attempting common table names, prioritizing 'pokemon'
        let query = 'SELECT * FROM pokemon';
        const params = [];

        if (search) {
            // Assuming 'name' or 'nombre' column exists
            query += ' WHERE nombre LIKE ?';
            params.push(`%${search}%`);
        }

        const [rows] = await pool.execute(query, params);

        // Si la tabla no se llama 'pokemon', el error será capturado
        res.json(rows);
    } catch (error) {
        if (error.code === 'ER_NO_SUCH_TABLE') {
            console.error('La tabla "pokemon" no existe. Asegúrate del nombre correcto.');
            res.status(500).json({ error: 'Tabla no encontrada en la base de datos' });
        } else {
            console.error('Error fetching pokemons:', error);
            res.status(500).json({ error: 'Internal server error', details: error.message });
        }
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
