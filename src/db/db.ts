import { createPool } from "mariadb"
export const pool = createPool({
    host: process.env.DB_HOST ?? "127.0.0.1",
    user: process.env.DB_USER ?? 'root',
    password: process.env.DB_PASSWORD ?? 'hallo1234',
    connectionLimit: parseInt(process.env.DB_CONNECTION_LIMIT ?? "5"),
    database: process.env.DB_DATABASE ?? "Temperature",
});