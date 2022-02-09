import Router from "@koa/router"
import { PassThrough } from "node:stream"
import { readDhtSensor } from "../lib/temperature_reader.mjs"
import moment from "moment"

export const router = new Router()

router.get("/temperature-stream", async (ctx) => {

    // ctx.request.socket.setTimeout(0)
    // ctx.request.socket.setNoDelay(true);
    // ctx.request.socket.setKeepAlive(true);
    // ctx.response.set({
    //     "Cache-Control": "no-cache",
    //     "Connection": "keep-alive",
    // })

    // Damit der Browser einen Stream erkennt
    ctx.response.type = "text/event-stream"

    // Stream
    const temperatureStream = new PassThrough()

    // Status okay und Stream im Body
    ctx.status = 200
    ctx.body = temperatureStream

    // Jede 10 Sekunden die Temperatur lesen und als Objekt die gerundeten Werte dem Browser übersenden
    setInterval(async () => {
        const { temperature, humidity } = await readDhtSensor(11, 7)
        temperatureStream.write(`data: ${JSON.stringify({ temperature: temperature.toFixed(2), humidity: humidity.toFixed(2), time: moment().format('LTS') })}\n\n`)
    }, 10000)

})