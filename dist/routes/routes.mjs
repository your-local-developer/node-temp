import Router from "@koa/router";
import { PassThrough } from "node:stream";
import moment from "moment";
import { pool } from "../db/db.js";
export const router = new Router();
// Route für den Temperatur stream
router
    .get("/temperature-stream", async (ctx) => {
    // Damit der Browser einen Stream erkennt
    ctx.response.type = "text/event-stream";
    // Damit nginx den stream nicht schließt und nicht buffert
    ctx.response.set({
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
        "X-Accel-Buffering": "no"
    });
    // Stream
    const temperatureStream = new PassThrough();
    // Status okay und Stream in der Antwort
    ctx.status = 200;
    ctx.body = temperatureStream;
    // Jede 10 Sekunden die Temperatur lesen und als Objekt die gerundeten Werte dem Browser übersenden
    setInterval(async () => {
        // Datenbankanfrage vorbereiten
        let conn;
        let data = { data: [], error: [] };
        try {
            conn = await pool.getConnection();
            // SQL Statements erstellen und abfrage durchführen
            const queryNoParams = /*sql*/ `SELECT temperature, humidity, time_of_collection FROM Temperature ORDER BY time_of_collection DESC LIMIT 1;`;
            const dbQuery = queryNoParams;
            const res = await conn.query(dbQuery);
            // Daten zum Datenobjekt hinzufügen und das Datum format von SQL zu einem besser lesbarem ändern
            if (res && Array.isArray(res)) {
                const dbRes = res;
                // Jedes element dem Data Objekt hinzufügen aber Schlüssel ändern 
                dbRes.forEach((x) => {
                    data.data.push({
                        temperature: x.temperature,
                        humidity: x.humidity,
                        time_of_collection: moment(x["time_of_collection"]).format("YYYY-MM-DD HH:mm:ss")
                    });
                });
            }
        }
        catch (err) {
            // Errors fangen und zur Antwort hinzufügen
            console.error(err);
            data.error.push("Query went wrong");
        }
        finally {
            // Datenbankverbindung nach Gebrauch schließen
            if (conn)
                conn.end();
        }
        console.log(data);
        temperatureStream.write(`data: ${JSON.stringify(data)}\n\n`);
    }, 3000);
})
    .get("/history", async (ctx) => {
    // Parameter von der Anfrage holen
    const queryParams = ctx.request.query;
    const from = queryParams.from ?? undefined;
    const until = queryParams.until ? queryParams.until : moment().format('YYYY-MM-DD HH:mm:ss');
    // Nummer aus String holen
    const amountParam = queryParams.amount;
    let amount = 20;
    if (!Array.isArray(amountParam) && amountParam) {
        let parsedAmount = parseInt(amountParam);
        amount = (isNaN(parsedAmount)) ? 20 : parsedAmount;
    }
    // Datenbankanfrage vorbereiten
    let conn;
    let data = { data: [], error: [] };
    try {
        conn = await pool.getConnection();
        // SQL Statements erstellen und abfrage durchführen
        const queryNoParams = /*sql*/ `SELECT temperature, humidity, time_of_collection FROM Temperature WHERE time_of_collection <= '${until}' ORDER BY time_of_collection DESC LIMIT ${amount};`;
        const queryWithParams = /*sql*/ `SELECT temperature, humidity, time_of_collection FROM Temperature WHERE time_of_collection >= '${from}' AND time_of_collection <= '${until}' ORDER BY time_of_collection DESC LIMIT ${amount};`;
        const dbQuery = from ? queryWithParams : queryNoParams;
        const res = await conn.query(dbQuery);
        // Daten zum Datenobjekt hinzufügen und das Datum format von SQL zu einem besser lesbarem ändern
        if (res && Array.isArray(res)) {
            data.data = res;
        }
        data.data.map((x) => x.time_of_collection = moment(x.time_of_collection).format("YYYY-MM-DD HH:mm:ss"));
    }
    catch (err) {
        // Errors fangen und zur Antwort hinzufügen
        console.error(err);
        data.error.push("Query went wrong");
    }
    finally {
        // Datenbankverbindung nach Gebrauch schließen
        if (conn)
            conn.end();
    }
    // Datenobjekt zurückgeben
    ctx.response.body = data;
});
