const {Router} = require('express');
const userController = require('./controllers/userController');
const jwtMW = require('./middlewares/jwtMW');


const router = Router();

router.post('/subscribe', userController.subscribe);

router.post('/login', userController.login);

router.get('/infos', jwtMW, userController.getInfos);

module.exports = router;