import { ensureAuthenticated } from '../auth/auth.js';
import express from 'express';
import * as controllers from '../controllers/index.js';


const router = express.Router();

/**
 * @swagger
 * /api/items:
 *   get:
 *     summary: Get all items
 *     responses:
 *       200:
 *         description: A list of items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get('/items', controllers.getAllItems);

/**
 * @swagger
 * /api/items/{id}:
 *   get:
 *     summary: Get an item by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: An item object
 *       404:
 *         description: Item not found
 */
router.get('/items/:id', controllers.getItemById);

/**
 * @swagger
 * /api/items:
 *   post:
 *     summary: Create a new item
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               category:
 *                 type: string
 *               stock:
 *                 type: number
 *               sku:
 *                 type: string
 *               manufacturer:
 *                 type: string
 *     responses:
 *       201:
 *         description: Item created
 *       400:
 *         description: Invalid item data
 */
router.post('/items', ensureAuthenticated, controllers.createItem);

/**
 * @swagger
 * /api/items/{id}:
 *   put:
 *     summary: Update an item
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Item updated
 *       400:
 *         description: Invalid item data
 *       404:
 *         description: Item not found
 */
router.put('/items/:id', ensureAuthenticated, controllers.updateItem);

/**
 * @swagger
 * /api/items/{id}:
 *   delete:
 *     summary: Delete an item
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Item deleted
 *       404:
 *         description: Item not found
 */
router.delete('/items/:id', ensureAuthenticated, controllers.deleteItem);

export default router;
