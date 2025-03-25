import{TaxRelief} from "../models/taxReliefModel.js";

// Create a new tax relief entry
export const createTaxRelief = async (req, res) => {
    try {
      const { userID, year, income, deduction, taxReliefs,  status } = req.body;
  
      console.log("Request Body:", req.body); // Debugging
      console.log("userID type:", typeof userID); // Debugging
      console.log("income type:", typeof income); // Debugging
  
      // Validate required fields
      if (
        !userID ||
        !income ||
        deduction === undefined ||
        !taxReliefs ||
        !Array.isArray(taxReliefs) ||
        taxReliefs.length === 0 
        
      ) {
        return res.status(400).send({
          message: "userID, income, deduction, taxReliefs,  are required",
        });
      }
  
      const newTaxRelief = {
        userID,
        year,
        income,
        deduction,
        taxReliefs,
        status: status || "not paid",
      };
  
      const taxRelief = await TaxRelief.create(newTaxRelief);
      return res.status(201).json(taxRelief);
    } catch (error) {
      console.error("Error creating tax relief:", error.message);
      return res.status(500).send({ message: error.message });
    }
  };

// Retrieve all tax relief entries
export const getAllTaxReliefs = async (req, res) => {
  try {
    const taxReliefs = await TaxRelief.find({});
    return res.status(200).json({
      count: taxReliefs.length,
      data: taxReliefs,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).send({ message: error.message });
  }
};

// Retrieve a single tax relief entry by ID
export const getTaxReliefById = async (req, res) => {
  try {
    const { id } = req.params;
    const taxRelief = await TaxRelief.findById(id);
    if (!taxRelief) {
      return res.status(404).json({ message: "Tax Relief not found" });
    }
    return res.status(200).json(taxRelief);
  } catch (error) {
    console.error(error.message);
    if (error.name === "CastError") {
      return res.status(400).send({ message: "Invalid ID format" });
    }
    return res.status(500).send({ message: error.message });
  }
};

// Update an existing tax relief entry by ID
export const updateTaxRelief = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).send({ message: "ID parameter is required" });
    }

    const updatedData = req.body;

    // Ensure taxReliefs is an array and not empty if provided
    if (updatedData.taxReliefs && (!Array.isArray(updatedData.taxReliefs) || updatedData.taxReliefs.length === 0)) {
      return res.status(400).send({ message: "taxReliefs must be a non-empty array" });
    }

    const updatedTaxRelief = await TaxRelief.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    if (!updatedTaxRelief) {
      return res.status(404).json({ message: "Tax Relief not found" });
    }
    return res.status(200).json(updatedTaxRelief);
  } catch (error) {
    console.error("Update error:", error.message);
    if (error.name === "CastError") {
      return res.status(400).send({ message: "Invalid ID format" });
    }
    return res.status(500).send({ message: error.message });
  }
};

// Delete a tax relief entry by ID
export const deleteTaxRelief = async (req, res) => {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).send({ message: "ID parameter is required" });
      }
      const deletedTaxRelief = await TaxRelief.findByIdAndDelete(id);
      if (!deletedTaxRelief) {
        return res.status(404).json({ message: "Tax Relief not found" });
      }
      return res.status(200).json({ message: "Tax Relief deleted successfully" });
    } catch (error) {
      console.error("Delete error:", error.message);
      if (error.name === "CastError") {
        return res.status(400).send({ message: "Invalid ID format" });
      }
      return res.status(500).send({ message: error.message });
    }
  };