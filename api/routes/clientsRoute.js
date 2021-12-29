var Clients = require('../controllers/clientController');

module.exports = function(router){
    router.post('/create', Clients.createClient);
    router.get('/get', Clients.getClients);
    router.get('/get/:name', Clients.getClient);
    router.put('/update/:id', Clients.updateClient);
    router.delete('/remove/:id', Clients.removeClient);
}