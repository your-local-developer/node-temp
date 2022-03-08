import 'dotenv/config';
import Koa from "koa";
import { router } from "./routes/routes.mjs";
import serve from "koa-static";
import { fileURLToPath } from "node:url";
import { runTemperatureService } from "./services/termperature_service/run_service.mjs";
runTemperatureService();
const staticDir = fileURLToPath(new URL("../public", import.meta.url));
const app = new Koa();
// Router und Statische Middleware für die HTML Datei im public Ordner initialisieren
app
    .use(serve(staticDir))
    .use(router.routes())
    .use(router.allowedMethods())
    .listen(3000);
console.log("Listening on http://localhost:3000");
