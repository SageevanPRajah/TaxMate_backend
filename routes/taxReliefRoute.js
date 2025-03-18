import express from "express";
import {
  createTaxRelief,
  getAllTaxReliefs,
  getTaxReliefById,
  updateTaxRelief,
  deleteTaxRelief,
} from "../controllers/TaxReliefControllers.js";

const router = express.Router();

// Create a new tax relief record
router.post("/", createTaxRelief);

// Get all tax relief records
router.get("/", getAllTaxReliefs);

// Get a single tax relief record by ID 
router.get("/:id", getTaxReliefById);

// Update a tax relief record by ID
router.put("/:id", updateTaxRelief);

// Delete a tax relief record by ID
router.delete("/:id", deleteTaxRelief);

export default router;