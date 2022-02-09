/** @type {HTMLUListElement?} */
let dataWrapper = document.querySelector("#data-wrapper")
let sse = new EventSource("http://localhost:3000/temperature-stream")

/**
 * 
 * @param {MessageEvent} event 
 */
function addData(event) {
    /** @type {{humidity: number, temperature: number, time: string}} */
    const sensorData = JSON.parse(event.data)

    let dataNode = document.createElement("li")
    let temperatureContent = document.createTextNode(
        `Uhrzeit: ${sensorData.time},
        Wärme: ${sensorData.temperature}°C,
        Luftfeuchtigkeit: ${sensorData.humidity}%`
    );
    dataNode.appendChild(temperatureContent); // füge den Textknoten zum neu erstellten div hinzu.
    dataWrapper?.appendChild(dataNode)
}

sse.onmessage = addData