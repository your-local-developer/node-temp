import { createPool } from "mariadb"
export const pool = createPool({
    host: "127.0.0.1",
    user: 'root',
    password: 'hallo1234',
    connectionLimit: 5,
    database: "Temperature",

});