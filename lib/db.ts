import { Pool } from "pg";

// Load environment variables
const pool = new Pool({
  user: process.env.DB_USER,        // Your DB username
  host: process.env.DB_HOST,        // Your DB host (localhost or remote)
  database: process.env.DB_NAME,    // Your DB name
  password: process.env.DB_PASSWORD,// Your DB password
  port: Number(process.env.DB_PORT) || 5432, // Default PostgreSQL port
});

export default pool;
