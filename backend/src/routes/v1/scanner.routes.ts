import { Router } from "express";

import { scanFridge } from "../../services/scanner.service";
import { upload } from "../../middleware/upload.middleware";

const router = Router();

router.post("/process", upload.single("image"), scanFridge);


export default router;
