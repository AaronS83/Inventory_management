import express from "express";
import { getSuppliers } from "../controllers/supplierCotroller.js";

const router = express.Router();

router.get('/', getSuppliers);

export default router;