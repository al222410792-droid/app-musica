import express from 'express';
import { baseDeDatos } from '../database';

const router = express.Router();
router.get('/album/:idAlbum', async (req, res) => {
    try {
        const { idAlbum } = req.params;
        const resultado = await baseDeDatos.query(
            'SELECT * FROM canciones WHERE id_album = $1 ORDER BY  reproducciones DESC',
            [idAlbum]
        );
        res.json(resultado.rows);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener canciones' });
    }
});
router.get('/mas-reproducidas', async (req, res) => {
    try {
        const resultado = await baseDeDatos.query(`
      SELECT c.*, a.nombre as artista, al.titulo as album 
      FROM canciones c
      JOIN albumes al ON c.id_album = al.id_album
      JOIN artistas a ON al.id_artista = a.id_artista
      ORDER BY c.reproducciones DESC 
      LIMIT 10
    `);
        res.json(resultado.rows);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener canciones mas reproducidas' });
    }
});

router.get('/contar-genero',async (req, res) => {
    try {
        const resultado = await baseDeDatos.query(`
        SELECT genero, COUNT(*) as total
        FROM canciones
        GROUP BY genero
        `);
        res.json(resultado.rows);
    } catch (error) {
        res.status(500).json({ error: 'Error al contar canciones por genero' });
    }
});

export default router;