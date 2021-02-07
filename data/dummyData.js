import Zone from "../modals/zone";
import Capteur from "../modals/capteur"
export const ZONES = [
    new Zone("1","zone 1",true),
    new Zone("2","zone 2",false),
    new Zone("3","zone 3",false),
    new Zone("4","zone 4",true),
    new Zone("5","zone 5",false),
    new Zone("6","zone 6",false),
    new Zone("7","zone 7",false),
    new Zone("8","zone 8",false),
];

export const CAPTEUR = [
    new Capteur(
        "1",
        "Capteur de l'humidité de sol",
        "the sensor is not stoping irrigation",
        true
    ),
    new Capteur(
        "2",
        "Capteur de la pluie",
        "the sensor is out of service",
        false
    ),
    new Capteur(
        "3",
        "Capteur du reservoire",
        "le reservoir est plein",
        true
    ),
   
];