import express from 'express';
import { baseDeDatos } from '../database';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const resultado = await baseDeDatos.query('SELECT * FROM artistas');
        res.json(resultado.rows);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener artistas' });
    }
});

router.get('/activos', async (req, res) => {
    try {
         const resultado = await baseDeDatos.query(`
      SELECT * FROM artistas 
      WHERE fecha_inicio_carrera > CURRENT_DATE - INTERVAL '5 years'
    `);
        res.json(resultado.rows);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener artistas activos' });
    }
});
router.get('/pais/:pais', async (req, res) => {
    try {
        const { pais } = req.params;
        const resultado = await baseDeDatos.query(
           'SELECT * FROM artistas WHERE pais = $1',
      [pais]
    );
        res.json(resultado.rows);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener artistas por país' });
    }  
});

export default router;
 
