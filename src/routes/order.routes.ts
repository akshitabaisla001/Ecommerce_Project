
import express from 'express';
import { placeOrder, getOrders } from '../controllers/order.controller';
import { protect } from '../middlewares/auth.middleware';

const router = express.Router();

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Place an order
 *     tags: [Orders]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       description: Order information
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - products
 *             properties:
 *               products:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     product:
 *                       type: string
 *                     quantity:
 *                       type: number
 *             example:
 *               products:
 *                 - product: "60d5f7d1a8b53d2f5f2c0134"
 *                   quantity: 2
 *     responses:
 *       201:
 *         description: Successfully placed order
 *       400:
 *         description: Invalid request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.post('/', protect, placeOrder);

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Get all orders for the logged-in user
 *     tags: [Orders]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of orders for the logged-in user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.get('/', protect, getOrders);

export default router;

