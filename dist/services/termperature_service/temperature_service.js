import moment from "moment";
import { pool } from "../../db/db.js";
import { readDhtSensor } from "../../lib/temperature_reader.mjs";
async function insertTemperature(pool) {
    let conn;
    try {
        const { humidity, temperature } = await readDhtSensor(11, 4);
        const timestamp = moment(Date.now()).format('YYYY-MM-DD HH-mm-ss');
        conn = await pool.getConnection();
        const res = await conn.query(
        /*sql*/ `INSERT INTO Temperature(temperature,humidity,day_of_collection) VALUE(?,?,?)`, [temperature, humidity, timestamp]);
        console.log(res);
    }
    catch (err) {
        throw err;
    }
    finally {
        if (conn)
            return conn.end();
    }
}
while (true) {
    try {
        await insertTemperature(pool);
    }
    catch (error) {
        console.error(error);
    }
    await new Promise((resolve) => setTimeout(() => resolve(), 10000));
}
