import { Worker } from "node:worker_threads";
export function runTemperatureService() {
    const temperatureServiceUrl = new URL("./temperature_service.js", import.meta.url);
    const _worker = new Worker(temperatureServiceUrl);
}
