import Router from "@koa/router"
import { PassThrough } from "node:stream"
import { readDhtSensor } from "../lib/temperature_reader.mjs"
import moment from "moment"

export const router = new Router()

// Route für den Temperatur stream
router
    .get("/temperature-stream", async (ctx) => {

        // Damit der Browser einen Stream erkennt
        ctx.response.type = "text/event-stream"

        // Damit nginx den stream nicht schließt und nicht buffert
        ctx.response.set({
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "X-Accel-Buffering": "no"
        })

        // Stream
        const temperatureStream = new PassThrough()

        // Status okay und Stream in der Antwort
        ctx.status = 200
        ctx.body = temperatureStream

        // Jede 10 Sekunden die Temperatur lesen und als Objekt die gerundeten Werte dem Browser übersenden
        setInterval(async () => {
            const { temperature, humidity } = await readDhtSensor(11, 4)
            temperatureStream.write(`data: ${JSON.stringify({ temperature: temperature, humidity: parseFloat(humidity.toFixed(2)), time: moment().format('LTS') })}\n\n`)
        }, 3000)
    })
    .get("/temperature", async (ctx) => {
        const query = ctx.request.query;
        console.log(query)
        
    })