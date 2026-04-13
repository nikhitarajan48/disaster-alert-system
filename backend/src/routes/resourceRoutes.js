import express from "express";
import {
  createResource,
  deleteResource,
  getNearestResources,
  getResources,
  updateResource
} from "../controllers/resourceController.js";
import { adminOnly, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/nearest", getNearestResources);
router.route("/").get(getResources).post(protect, adminOnly, createResource);
router.route("/:id").put(protect, adminOnly, updateResource).delete(protect, adminOnly, deleteResource);

export default router;
