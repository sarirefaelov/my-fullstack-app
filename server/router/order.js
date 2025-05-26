const express = require('express');
const router = express.Router();
const controllerOrder = require('../controller/order')


router.get("/", controllerOrder.get);
router.post("/", controllerOrder.post);
router.get('/:id', controllerOrder.getOrderById);

module.exports = router;