import { ensureAuthenticated } from '../auth/auth.js';
import express from 'express';
import * as controllers from '../controllers/index.js';
import { User } from '../models/index.js';



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
router.post('/items', controllers.createItem);

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
router.put('/items/:id', controllers.updateItem);

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
router.delete('/items/:id', controllers.deleteItem);

/**
 * @swagger
 * /auth/me:
 *   get:
 *     summary: Get the currently logged-in and registered user
 *     responses:
 *       200:
 *         description: User is logged in and registered
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *       401:
 *         description: Not logged in
 *       404:
 *         description: User not registered
 */
router.get('/auth/me', ensureAuthenticated, async (req, res) => {
  if (req.user && req.user.emails && req.user.emails[0] && req.user.emails[0].value) {
    const email = req.user.emails[0].value;
    const user = await User.findOne({ email });
    if (user) {
      res.send(`Logged in and registered as ${user.name} (${user.email})`);
    } else {
      res.status(404).send('User not registered');
    }
  } else {
    res.status(401).send('Not logged in');
  }
});

export default router;
