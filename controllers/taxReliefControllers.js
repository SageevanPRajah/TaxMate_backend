import TaxRelief from '../models/taxReliefModel.js';

// Create a new tax relief entry
export const createTaxRelief = async (req, res) => {
  try {
    const { userID, year, income, deduction, taxReliefs, finalTaxAmount, status } = req.body;

    // Validate required fields
    if (
      !userID ||
      !income ||
      deduction === undefined ||
      !taxReliefs ||
      !Array.isArray(taxReliefs) ||
      taxReliefs.length === 0 ||
      finalTaxAmount === undefined
    ) {
      return res.status(400).send({
        message: 'userID, income, deduction, taxReliefs, and finalTaxAmount are required',
      });
    }

    const newTaxRelief = {
      userID,
      year, // if not provided, the schema default will be used.
      income,
      deduction,
      taxReliefs,
      finalTaxAmount,
      status: status || 'not paid',
    };

    const taxRelief = await TaxRelief.create(newTaxRelief);
    return res.status(200).json(taxRelief);
  } catch (error) {
    console.error(error.message);
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
      return res.status(404).json({ message: 'Tax Relief not found' });
    }
    return res.status(200).json(taxRelief);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send({ message: error.message });
  }
};

// Update an existing tax relief entry by ID
export const updateTaxRelief = async (req, res) => {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).send({ message: 'ID parameter is required' });
      }
  
      const { userID, year, income, deduction, taxReliefs, finalTaxAmount, status } = req.body;
  
      if (
        !userID ||
        !income ||
        deduction === undefined ||
        !taxReliefs ||
        !Array.isArray(taxReliefs) ||
        taxReliefs.length === 0 ||
        finalTaxAmount === undefined
      ) {
        return res.status(400).send({
          message: 'userID, income, deduction, taxReliefs, and finalTaxAmount are required',
        });
      }
  
      const updatedData = {
        userID,
        year,
        income,
        deduction,
        taxReliefs,
        finalTaxAmount,
        status: status || 'not paid',
      };
  
      const updatedTaxRelief = await TaxRelief.findByIdAndUpdate(id, updatedData, {
        new: true,
      });
      if (!updatedTaxRelief) {
        return res.status(404).json({ message: 'Tax Relief not found' });
      }
      return res.status(200).json(updatedTaxRelief);
    } catch (error) {
      console.error("Update error:", error.message);
      return res.status(500).send({ message: error.message });
    }
  };
  
  export const deleteTaxRelief = async (req, res) => {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).send({ message: 'ID parameter is required' });
      }
      const deletedTaxRelief = await TaxRelief.findByIdAndDelete(id);
      if (!deletedTaxRelief) {
        return res.status(404).json({ message: 'Tax Relief not found' });
      }
      return res.status(200).json({ message: 'Tax Relief deleted successfully' });
    } catch (error) {
      console.error("Delete error:", error.message);
      return res.status(500).send({ message: error.message });
    }
  };