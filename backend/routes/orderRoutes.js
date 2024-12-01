import express from "express";
import { getAllOrders, getOrder, getOrders, updateOrder } from "../controllers/orderController.js";

const router = express.Router();

router.get("/:pid", getOrders);
router.get("/", getAllOrders);
router.put("/:oid", updateOrder); 
router.get("/:oid", getOrder);
export default router;
