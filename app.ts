

import express from 'express';
import dotenv from 'dotenv';
import connectDB from './src/config/db';  // Connects to MongoDB
import authRoutes from './src/routes/auth.routes';
import userRoutes from './src/routes/user.routes';
import productRoutes from './src/routes/product.routes';
import cartRoutes from './src/routes/cart.routes';  // Cart routes
import orderRoutes from './src/routes/order.routes';
//import { setupSwagger } from './src/config/swagger';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './src/config/swagger';


// Load environment variables from .env file
dotenv.config();

// Create an Express application
const app = express();

// Middleware to parse JSON
app.use(express.json());
//setupSwagger(app);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);

app.use('/api/orders', orderRoutes);

// Root route
app.get('/', (_req, res) => {
  res.send('🚀 E-commerce API is running!');
});

// Connect to MongoDB
connectDB(); 

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});


