import nodeDht from "node-dht-sensor"
const { initialize, read } = nodeDht.promises

initialize({
    test: {
        fake: {
            temperature: 21,
            humidity: 60
    }
    }
})

export { read as readDhtSensor}
