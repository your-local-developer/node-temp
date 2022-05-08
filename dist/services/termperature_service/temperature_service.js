// import moment from "moment";
import { pool } from "../../db/db.js";
import { readDhtSensor } from "../../lib/temperature_reader.mjs";
async function insertTemperature() {
    let conn;
    try {
        const { humidity, temperature } = await readDhtSensor(11, 4);
        // console.log(humidity, temperature)
        // const timestamp = moment().format('YYYY-MM-DD HH-mm-ss')
        // console.log(`Timestamp: ${timestamp}`)
        conn = await pool.getConnection();
        // console.log(`Connection is is valid: ${conn?.isValid()}`)
        await conn.query(
        /*sql*/ `INSERT INTO Temperature(temperature,humidity) VALUE(?,?)`, [temperature, humidity]);
        console.log(humidity, temperature);
        // console.log(res)
    }
    catch (err) {
        console.error(err);
    }
    finally {
        if (conn)
            conn.end();
        // console.log(`Connection is is valid: ${conn?.isValid()}`)
    }
}
while (true) {
    try {
        await insertTemperature();
    }
    catch (error) {
        console.error(error);
    }
    const sleepTime = parseInt(process.env.SLEEP_FOR ?? "9000");
    await new Promise((resolve) => setTimeout(() => resolve(), sleepTime));
}
