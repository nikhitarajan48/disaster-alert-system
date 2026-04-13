import express from "express";
import { createAlert, deleteAlert, getAlerts, updateAlert } from "../controllers/alertController.js";
import { adminOnly, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(getAlerts).post(protect, adminOnly, createAlert);
router.route("/:id").put(protect, adminOnly, updateAlert).delete(protect, adminOnly, deleteAlert);

export default router;
