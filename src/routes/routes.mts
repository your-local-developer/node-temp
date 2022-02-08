import Router from "@koa/router"
import { PassThrough } from "node:stream"
import { readDhtSensor } from "../lib/temperature_reader.mjs"

export const router = new Router()

router.get("/temperature-stream", async (ctx) => {

    // ctx.request.socket.setTimeout(0)
    // ctx.request.socket.setNoDelay(true);
    // ctx.request.socket.setKeepAlive(true);

    ctx.response.type = "text/event-stream"
    // ctx.response.set({
    //     "Cache-Control": "no-cache",
    //     "Connection": "keep-alive",
    // })

    const temperatureStream = new PassThrough()
    ctx.status = 200
    ctx.body = temperatureStream

    setInterval(async () => {
        const { temperature } = await readDhtSensor(11, 7)
        temperatureStream.write(`data: ${temperature.toFixed(2)}\n\n`)
    }, 1000)

})