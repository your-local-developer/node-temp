import Router from "@koa/router";
import { PassThrough } from "node:stream";
import { readDhtSensor } from "../lib/temperature_reader.mjs";
import moment from "moment";
export const router = new Router();
// Route für den Temperatur stream
router.get("/temperature-stream", async (ctx) => {
    // Damit der Browser einen Stream erkennt
    ctx.response.type = "text/event-stream";
    // Stream
    const temperatureStream = new PassThrough();
    // Status okay und Stream in der Antwort
    ctx.status = 200;
    ctx.body = temperatureStream;
    // Jede 10 Sekunden die Temperatur lesen und als Objekt die gerundeten Werte dem Browser übersenden
    setInterval(async () => {
        const { temperature, humidity } = await readDhtSensor(11, 7);
        temperatureStream.write(`data: ${JSON.stringify({ temperature: temperature.toFixed(2), humidity: humidity.toFixed(2), time: moment().format('LTS') })}\n\n`);
    }, 3000);
});
