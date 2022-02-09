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
        temperature: Math.random() * (20 - 10 + 1) + 10,
    };
}
// Wenn Test ist aktiviert, die Testfunktion wird genutzt
export const readDhtSensor = process.env.TEST ? readDhtSensorTest : read;
