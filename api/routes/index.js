const users = require('./users');
const plants = require('./plants');
const greenhouse = require('./greenhouse');
const greenhouseUsers = require('./greenhouseUsers');


module.exports = {
    users,
    plants,
    greenhouse,
    greenhouseUsers
}


//damettere in api.js
//ROUTES
/*
const routes = require('./routes/index.js');

app.use(routes.users);
app.use(routes.plants);
app.use(routes.greenhouse);
*/
