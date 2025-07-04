const express = require('express');
const router = express.Router();
const controllerProduct = require('../controller/product')

router.get("/", controllerProduct.get);
router.get("/:id", controllerProduct.getById);
router.post("/", controllerProduct.post);
router.delete('/:id', controllerProduct.delete);
router.put('/:id', controllerProduct.put); 
router.put('/:id/quantity', controllerProduct.putQuantity);
module.exports = router;