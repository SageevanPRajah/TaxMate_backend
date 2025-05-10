import { TaxRate } from "../models/taxRateModel.js";

// Create multiple tax rate records (bulk insert)
export const createTaxRates = async (req, res) => {
  try {
    const taxRates = req.body;

    // Validate input
    if (!Array.isArray(taxRates) || taxRates.length === 0) {
      return res.status(400).send({
        message: "Input must be a non-empty array of tax rate records",
      });
    }

    // Validate each record
    for (const record of taxRates) {
      if (!record.incomeTaxSlab || !record.taxRate) {
        return res.status(400).send({
          message: "Each record must contain incomeTaxSlab and taxRate",
        });
      }
    }

    const createdTaxRates = await TaxRate.insertMany(taxRates);
    return res.status(201).send(createdTaxRates);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({ message: error.message });
  }
};

// Get all tax rate records
export const getAllTaxRates = async (req, res) => {
  try {
    const taxRates = await TaxRate.find();
    return res.status(200).send(taxRates);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({ message: error.message });
  }
};

// Update multiple tax rate records (bulk update)
export const updateTaxRates = async (req, res) => {
  const updates = req.body;
  if (!Array.isArray(updates) || updates.length === 0) {
    return res.status(400).send({ message: "Must send a non-empty array" });
  }
  for (const { _id, incomeTaxSlab, taxRate } of updates) {
    if (!_id || !incomeTaxSlab || taxRate === undefined || taxRate === null) {
      return res.status(400).send({
        message: "Each update must have _id, incomeTaxSlab, and taxRate"
      });
    }
    if (isNaN(taxRate)) {
      return res.status(400).send({
        message: "taxRate must be a valid number"
      });
    }
  }
  const bulkOps = updates.map(update => ({
    updateOne: {
      filter: { _id: update._id },
      update: { $set: { incomeTaxSlab: update.incomeTaxSlab, taxRate: update.taxRate } }
    }
  }));
  const result = await TaxRate.bulkWrite(bulkOps);
  return res.status(200).send(result);
};


// Delete all tax rate records
export const deleteAllTaxRates = async (req, res) => {
  try {
    const result = await TaxRate.deleteMany({});
    return res.status(200).send({
      message: `Deleted ${result.deletedCount} tax rate records`,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({ message: error.message });
  }
};