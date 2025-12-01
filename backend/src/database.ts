import {Pool} from 'pg';

export const baseDeDatos = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'musica_db',
    password: 'pass',
    port: 5432,
});