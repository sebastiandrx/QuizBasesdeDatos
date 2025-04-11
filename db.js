const { Pool } = require('pg');

const pool = new Pool({
    host: 'aws-0-us-east-1.pooler.supabase.com', 
    port: 5432,
    user: 'postgres.vgzecvuspoddouyqyqqt',
    password: 'SebasDrx05*',
    database: 'postgres',
    ssl: {
        rejectUnauthorized: false
    }
});

pool.connect((err) => {
    if (err) {
        console.error('❌ Error en la conexión con Supabase:', err);
    } else {
        console.log('✅ Conectado a la base de datos de Supabase');
    }
});

module.exports = pool;
