import express from 'express';
import * as controllers from '../controllers/index.js';

const router = express.Router();

router.get('/items', controllers.getAllItems);
router.get('/items/:id', controllers.getItemById);
router.post('/items', controllers.createItem);
router.put('/items/:id', controllers.updateItem);
router.delete('/items/:id', controllers.deleteItem);

export default router;
