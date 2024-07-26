import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import { registerUser , loginUser } from "./controllers/users.js";
import productRoutes from './routes/productRoutes.js';
import { searchProducts,searchNewProducts, searchProductById,searchNewProductById}  from './controllers/search.js';
import uploadRoute from './routes/upload.js';
import {searchNewProductByUserId} from './controllers/search.js';
import {deleteNewProductById} from './controllers/search.js';


dotenv.config(); 


const app = express();
app.use(express.json());
app.use(cors()); // Enable CORS

// Database connection (replace with your actual credentials)
mongoose.connect("mongodb+srv://bestbuyfinder101:hello@cluster0.nvrviwz.mongodb.net/Ecommerce?retryWrites=true&w=majority&appName=Cluster0", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB connected!!');
}).catch(err => {
    console.log('Failed to connect to MongoDB', err);
});

app.get('/', (req, res) => {
  res.send('Hello, world!');
});


app.use('/uploads', express.static('uploads'));


// Use the product routes
app.use('/api/products', productRoutes); 

app.use("/api/register" , registerUser);
app.use("/api/login" , loginUser);
app.use("/api/searchproduct",searchProducts);
app.use('/api', uploadRoute);
app.use("/api/searchProductById",searchProductById);
app.use("/api/searchNewProducts",searchNewProducts);

app.use("/api/searchNewProductById",searchNewProductById);
app.use("/api/searchNewProductByUserId",searchNewProductByUserId);
app.use("/api/deleteNewProductById",deleteNewProductById);


// cron.schedule('0 3 * * *', async () => {
//   try {
//     console.log('Running scheduled task for API 1 at 3 AM...');

//     // Call first API
//     //const response1 = await axios.get('http://localhost:5000/');
//     console.log('API 1 response:', response1.data);
//   } catch (error) {
//     console.error('Error calling API 1:', error);
//   }
// });

// // Schedule task to run at 3:40 AM every day
// cron.schedule('40 3 * * *', async () => {
//   try {
//     console.log('Running scheduled task for API 2 at 3:40 AM...');

//     // Call second API
//     const response2 = await axios.get('http://localhost:5000/api/products');
//     console.log('API 2 response:', response2.data);
//   } catch (error) {
//     console.error('Error calling API 2:', error);
//   }
// });



// Error handling middleware (add this after your routes)
app.use((err, req, res, next) => {
  console.error(err.stack); // Log the error for debugging
  res.status(500).json({ error: 'Something went wrong!' }); // Generic error message to the client
});

const PORT = process.env.PORT || 3001; 
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
