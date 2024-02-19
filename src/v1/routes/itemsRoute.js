const express = require('express');
const router = express.Router();

const itemController = require('../controller/itemsController');
const validateId = require('../middleware/error/validateId');
const validateAdd = require('../middleware/error/validateAdd')
const validateUpdate = require('../middleware/error/validateUpdate')

router.get('/items', itemController.getItems);
router.get('/items/count=:id', validateId, itemController.getItemsByCount);
router.get('/items/limit/start=:start,limit=:limit', itemController.getItemByOffset)
router.get('/items/:id', validateId, itemController.getItemsById);
router.post('/items', validateAdd, itemController.addItems);
router.patch('/items/:id', validateId, validateUpdate, itemController.updateItems);
router.delete('/items/:id', validateId, itemController.deleteItems);    

module.exports = router;
