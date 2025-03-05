import sql from 'mssql';


const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    server: process.env.DB_HOST.trim(),
    port: parseInt(process.env.DB_PORT) || 1433,
    options: {
      encrypt: false,
      trustServerCertificate: false,
    },
  };
  

let poolPromise;

export async function getDBConnection() {
  if (!poolPromise) {
    try {
        console.log(config,'config')
      poolPromise = await sql.connect(config);
      console.log('✅ MSSQL Connected');
    } catch (err) {
      console.error('❌ Database Connection Failed:', err.message);
      throw err;
    }
  }
  return poolPromise;
}


