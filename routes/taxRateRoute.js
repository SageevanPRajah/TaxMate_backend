import express from "express";
import {
  createTaxRates,
  getAllTaxRates,
  updateTaxRates,
  deleteAllTaxRates,
} from "../controllers/taxRateController.js";

const router = express.Router();

// Create multiple tax rate records (bulk insert)
router.post("/", createTaxRates);

// Get all tax rate records
router.get("/", getAllTaxRates);

// Update multiple tax rate records (bulk update)
router.put("/", updateTaxRates);

// Delete all tax rate records
router.delete("/", deleteAllTaxRates);

export default router;