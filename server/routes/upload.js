// routes/upload.js
import express from 'express';
import upload from '../Middleware/multer.js';
import { addProduct } from '../controllers/AddNewProduct.js';

const router = express.Router();

router.post('/newProduct', upload, addProduct);

export default router;
