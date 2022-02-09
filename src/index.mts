import 'dotenv/config'
import Koa from "koa"
import { router } from "./routes/routes.mjs"
import serve from "koa-static"
import { fileURLToPath } from "node:url"

const staticDir = fileURLToPath(new URL("../public", import.meta.url))

const app = new Koa()

// Router und Middleware initialisieren
app
    .use(serve(staticDir))
    .use(router.routes())
    .use(router.allowedMethods())
    .listen(3000)

console.log("Listening on http://localhost:3000")