const users = require('./users');
const plants = require('./plants');
const greenhouses = require('./greenhouses');
const greenhousesUsers = require('./greenhousesUsers');
const greenhousesPlants = require('./greenhousesPlants');


module.exports = {
    users,
    plants,
    greenhouses,
    greenhousesUsers,
    greenhousesPlants
}


/*
 TODO:
 tabella posizione (tipo, x, y)
 tabella posizione di una pianta all'interno di una serra  (idpianta, idserra, posizione)
 tabella dei sensori collegata ad una serra    (idsensore, idserra, tipo, posizione )
 tabella dei dati dei sensori (idsensore, tipovalore, valore, timestamp)
 tabella dei tipi di valore (tipovalore, unitamisura)

 cambiare endpoint tipo da /mapplants a /api/v1/greenhouse/:greenhouse_id/plants che restituisce la lista delle piante in una serra specifica
*/