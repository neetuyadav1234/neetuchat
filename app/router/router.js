const router = require('express').Router();
const controller = require('../controller/userController');
const verify = require('../../middleware')


router.post('/registerPage', controller.registerPage);
router.post('/loginPage', controller.loginPage);
// router.get('/getUserByToken', verify, controller.getUserByToken);
router.post('/updateUser', verify, controller.updateUser);
router.post('/shopCreat', controller.shopCreat);

router.get("/getProduct",controller.getProduct)

module.exports = router;