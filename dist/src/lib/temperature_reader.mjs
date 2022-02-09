import nodeDht from "node-dht-sensor";
const { read } = nodeDht.promises;
/**
 * Generiert zufällige Sensordaten für Tests ohne Gerät
 * @param type DHT Sensor typ
 * @param pin Pinnummer
 * @returns Zufällig generierte Sensordaten
 */
async function readDhtSensorTest(type, pin) {
    return {
        humidity: Math.random() * (80 - 20 + 1) + 20,
        temperature: Math.random() * (29 - 0 + 1) + 0,
    };
}
// Wenn Test ist aktiviert, die Testfunktion wird genutzt
export const readDhtSensor = process.env.TEST ? readDhtSensorTest : read;
