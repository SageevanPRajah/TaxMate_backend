import TaxRelief from "../models/TaxReliefModel.js"; 

// Create a new tax relief record
export const createTaxRelief = async (req, res) => {
  try {
    const {
      income,
      deduction,
      taxReliefDescription,
      taxReliefID,
      reliefAmount,
    } = req.body;

    // Validate required fields
    if (
      !income ||
      !deduction ||
      !taxReliefDescription ||
      !taxReliefID ||
      !reliefAmount
    ) {
      return res.status(400).send({
        message: "All fields are required: income, deduction, taxReliefDescription, taxReliefID, reliefAmount",
      });
    }

    const newTaxRelief = {
      income,
      deduction,
      taxReliefDescription,
      taxReliefID,
      reliefAmount,
    };

    const taxRelief = await TaxRelief.create(newTaxRelief);
    return res.status(201).send(taxRelief);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({ message: error.message });
  }
};



// Get all tax relief records
export const getAllTaxReliefs = async (req, res) => {
  try {
    const taxReliefs = await TaxRelief.find();
    return res.status(200).send(taxReliefs);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({ message: error.message });
  }
};

// Get a single tax relief record by ID
export const getTaxReliefById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).send({
        message: "Tax relief ID is required",
      });
    }

    const taxRelief = await TaxRelief.findById(id);

    if (!taxRelief) {
      return res.status(404).send({
        message: "Tax relief record not found",
      });
    }

    return res.status(200).send(taxRelief);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({ message: error.message });
  }
};

// Update a tax relief record by ID
export const updateTaxRelief = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      income,
      deduction,
      taxReliefDescription,
      taxReliefID,
      reliefAmount,
      status,
    } = req.body;

    // Validate required fields
    if (
      !income ||
      !deduction ||
      !taxReliefDescription ||
      !taxReliefID ||
      !reliefAmount ||
      !status
    ) {
      return res.status(400).send({
        message:
          "All fields are required: income, deduction, taxReliefDescription, taxReliefID, reliefAmount, status",
      });
    }

    const updatedTaxRelief = await TaxRelief.findByIdAndUpdate(
      id,
      {
        income,
        deduction,
        taxReliefDescription,
        taxReliefID,
        reliefAmount,
        status,
      },
      { new: true }
    );

    if (!updatedTaxRelief) {
      return res.status(404).send({
        message: "Tax relief record not found",
      });
    }

    return res.status(200).send(updatedTaxRelief);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({ message: error.message });
  }
};

// Delete a tax relief record by ID
export const deleteTaxRelief = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).send({
        message: "Tax relief ID is required",
      });
    }

    const deletedTaxRelief = await TaxRelief.findByIdAndDelete(id);

    if (!deletedTaxRelief) {
      return res.status(404).send({
        message: "Tax relief record not found",
      });
    }

    return res.status(200).send({
      message: "Tax relief record deleted successfully",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({ message: error.message });
  }
};