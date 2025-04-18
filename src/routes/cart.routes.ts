

import express from 'express';
import { getCart, addItem, removeItem, clearUserCart } from '../controllers/cart.controller';
import { protect } from '../middlewares/auth.middleware';

const router = express.Router();

/**
 * @swagger
 * /cart:
 *   get:
 *     summary: Get the user's cart
 *     tags: [Cart]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: User's cart data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: string
 *                 products:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       product:
 *                         type: string
 *                       quantity:
 *                         type: number
 *             example:
 *               user: "60d5f7d1a8b53d2f5f2c0134"
 *               products:
 *                 - product: "60d5f7d1a8b53d2f5f2c0123"
 *                   quantity: 2
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.get('/', protect, getCart);

/**
 * @swagger
 * /cart:
 *   post:
 *     summary: Add item to the cart
 *     tags: [Cart]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       description: Product and quantity to add to the cart
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productId
 *               - quantity
 *             properties:
 *               productId:
 *                 type: string
 *               quantity:
 *                 type: number
 *             example:
 *               productId: "60d5f7d1a8b53d2f5f2c0123"
 *               quantity: 2
 *     responses:
 *       200:
 *         description: Cart updated successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.post('/', protect, addItem);

/**
 * @swagger
 * /cart/{productId}:
 *   delete:
 *     summary: Remove an item from the cart
 *     tags: [Cart]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the product to remove
 *     responses:
 *       200:
 *         description: Product removed successfully from the cart
 *       400:
 *         description: Invalid product ID
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.delete('/:productId', protect, removeItem);

/**
 * @swagger
 * /cart:
 *   delete:
 *     summary: Clear the user's cart
 *     tags: [Cart]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Cart cleared successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.delete('/', protect, clearUserCart);

export default router;
