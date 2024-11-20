import express from "express";

import { getInventory } from "../controllers/inventoryController.js";

const router = express.Router();

router.get('/:pid', getInventory);

export default router;