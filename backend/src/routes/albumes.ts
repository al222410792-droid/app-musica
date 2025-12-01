import express from 'express';
import { baseDeDatos } from '../database';
const router = express.Router();

router.get('/artista/:idArtista', async (req, res) => {
    try {
        const { idArtista } = req.params;
        const resultado = await baseDeDatos.query(
            'SELECT * FROM albumes WHERE id_artista = $1',
            [idArtista]
        );
        res.json(resultado.rows);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener albumes' });
    }
});

router.get('/year/:year', async (req, res) => {
    try {
        const { year } = req.params;
        const resultado = await baseDeDatos.query(
            'SELECT*FROM albumes WHERE año=$1',
            [year]
        );
        res.json(resultado.rows);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener albumes por año' });
    }
});

export default router;