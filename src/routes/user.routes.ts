



// export default router;
import express from 'express';
import { getProfile } from '../controllers/user.controller';
import { protect } from '../middlewares/auth.middleware';

const router = express.Router();

/**
 * @swagger
 * /users/profile:
 *   get:
 *     summary: Get the profile of the logged-in user
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully fetched the user profile
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: User ID
 *                   example: 60d1ab1f1f2b3b001c8e1a29
 *                 username:
 *                   type: string
 *                   description: Username of the user
 *                   example: john_doe
 *                 email:
 *                   type: string
 *                   description: Email of the user
 *                   example: john@example.com
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: User account creation time
 *                   example: 2023-04-14T08:00:00Z
 *       401:
 *         description: Unauthorized. Token missing or invalid.
 *       500:
 *         description: Internal server error.
 */

router.get('/profile', protect, getProfile);

export default router;




