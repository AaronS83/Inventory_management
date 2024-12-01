import express from 'express';
import { addOrder, addProduct, addSale, addSupplier, addSupplierProduct } from '../controllers/addController.js';

const router = express.Router();

router.post('/addSupplier', addSupplier);

router.post('/addSupplierProduct', addSupplierProduct);

router.post('/addProduct', addProduct);

router.post('/addSale', addSale);

router.post('/addOrder', addOrder);
export default router;