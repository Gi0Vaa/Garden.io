const users = require('./users');
const plants = require('./plants');
const greenhouses = require('./greenhouses');
const greenhousesUsers = require('./greenhousesUsers');
const greenhousesPlants = require('./greenhousesPlants');
const sensors = require('./sensors');


module.exports = {
    users,
    plants,
    greenhouses,
    greenhousesUsers,
    greenhousesPlants,
    sensors
}


/*
 TODO:
 tabella posizione (idposizione, x, y)
 tabella posizione di una pianta all'interno di una serra  (idpianta, idserra, idposizione)

 tabella dei sensori collegata ad una serra    (idsensore, idserra, tipo, posizione )
 tabella dei dati dei sensori (idsensore, tipovalore, valore, timestamp)
 tabella dei tipi di valore (tipovalore, unitamisura)
*/