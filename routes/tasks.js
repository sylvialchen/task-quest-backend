const express = require('express');
const router = express.Router();
const {dataController, apiController} = require('../controllers/taskCtrl');

// Index not completed
router.get('/', dataController.indexNotComplete, apiController.index);
// Index completed
router.get('/completed', dataController.indexComplete, apiController.index);
// Delete
router.delete('/:id', dataController.destroy, apiController.show);
// Update
router.put('/:id', dataController.update, apiController.show);
// Create
router.post('/', dataController.create, apiController.show);
// Show 
router.get(':/id', dataController.show, apiController.show);

module.exports = router;
