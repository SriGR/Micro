import sql from "mssql";

// const config = {
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   server: process.env.DB_SERVER, // Example: "localhost"
//   database: process.env.DB_NAME,
//   port: 1433,
//   options: {
//     encrypt: false, // Required for Azure
//     trustServerCertificate: true, 
//     connectionTimeout: 30000,// Required for local development
//   },
// };
// console.log(config,"13")

const config = 'Server=sql5113.site4now.net,1433;Database=db_9e515d_latha;User Id=db_9e515d_latha_admin;Password=Password123;Encrypt=false;TrustServerCertificate=true;';
let dbPool;

export async function connectDB() {
  try {
    if (!dbPool) {
      dbPool = await sql.connect(config);
      console.log("✅ Connected to MSSQL database");
    }
    return dbPool;
  } catch (error) {
    // console.error("❌ Database connection error:", error);
    throw new Error("Database connection failed");
  }
}
