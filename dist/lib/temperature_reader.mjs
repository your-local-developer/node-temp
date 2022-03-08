import nodeDht from "node-dht-sensor";
const { read } = nodeDht.promises;
export { read as readDhtSensor };
