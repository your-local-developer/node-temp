# Node Temperatur

## Info

Programm streamt alle 5 Sekunden die aktuelle Temperatur an alle Clients.

![Temperatur Diagramm](./doc/TempChart.png)

## Installieren:

1. (Node.js 16.14.0 LTS oder neuer)[https://nodejs.org/] installieren
2. Ordner im Terminal öffnen
3. Abhängigkeiten installieren: `corepack yarn`
4. Programm starten: `node .` oder `node ./dist/index.mjs`
5. Link öffnen

## Code lesen
1. Hauptdatei ist id src/index.mts Datei.
2. Dateien können module und andere Dateien bzw. Funktionen aus Dateien importieren. Folge einfach dem Pfad. ACHTUNG: *.mts Dateien werden mit *.mjs in den Imports angegeben.
3. Der Quellcode ist mit Kommentaren versehen