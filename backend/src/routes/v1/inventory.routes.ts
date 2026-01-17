import { Router } from "express";

import {
  deleteFromInventory,
  getInventory,
  saveToInventory,
  updateInventoryItem,
} from "../../services/inventory.service";

const router = Router();

router.post("/add", saveToInventory);
router.get("/", getInventory);
router.put("/:id", updateInventoryItem);
router.delete("/:id", deleteFromInventory);

export default router;
