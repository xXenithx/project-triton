module.exports = app => {
    const users = require('../controllers/user.controller');
    const router = require('express').Router();

    router.post('/users', users.create);
    router.get('/users', users.findAll);
    router.get('/users/:userId', users.findOne);
    router.put('/users/:userId', users.update);
    router.delete('/users/:userId', users.delete);
    app.use('/api', router);
}
