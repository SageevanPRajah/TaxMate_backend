import express from 'express';
import { postProduct, getProducts, getOneProduct, updateProduct, deleteProduct } from '../controllers/productControllers.js';

const router = express.Router();

    // Routes for Create a new product
    router.post('/', postProduct);

    // Routes for view all product
    router.get('/', getProducts);

    // Routes for get one product
    router.get('/:id', getOneProduct);

    // Routes for edit one product
    router.put('/:id', updateProduct);

    // Routes for delete one product
    router.delete('/:id', deleteProduct);

export default router;