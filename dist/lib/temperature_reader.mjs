import nodeDht from "node-dht-sensor";
const { read } = nodeDht.promises;
async function mockDhtSensor(_type, _pin) {
    return {
        humidity: Math.floor(Math.random() * (32 - 10 + 1) + 32),
        temperature: Math.floor(Math.random() * (23 - 21 + 1) + 21)
    };
}
const readDhtSensor = process.env.TEST == "true" ? mockDhtSensor : read;
export { readDhtSensor };
