import type { Pool, PoolConnection } from "mariadb";
import moment from "moment";
import { pool } from "../../db/db.js"
import { readDhtSensor } from "../../lib/temperature_reader.mjs"

async function insertTemperature(pool: Pool) {
    let conn: PoolConnection | undefined;
    try {
        const { humidity, temperature } = await readDhtSensor(11, 4)
        console.log(humidity, temperature)
        const timestamp = moment().format('YYYY-MM-DD HH-mm-ss')
        console.log(`Timestamp: ${timestamp}`)
        conn = await pool.getConnection();
        console.log(`Connection is is valid: ${conn?.isValid()}`)
        const res = await conn.query(
            /*sql*/`INSERT INTO Temperature(temperature,humidity) VALUE(?,?)`,
            [temperature, humidity]
        );

        console.log(res)

    } catch (err) {
        console.error(err)
    } finally {
        if (conn) conn.end();
        console.log(`Connection is is valid: ${conn?.isValid()}`)
    }
}

while (true) {
    try {
        await insertTemperature(pool)
    } catch (error) {
        console.error(error)
    }
    await new Promise<void>((resolve) => setTimeout(() => resolve(), 10000))
}