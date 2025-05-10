import { Liability } from '../models/liabilityModel.js';

// Controller for Create a new liability
export const postLiability = async (req, res) => {
    try {
        if (
            !req.body.userID ||
            !req.body.liabilityID ||
            !req.body.liabilityName ||
            !req.body.type ||
            !req.body.amount ||
            !req.body.dueDate ||
            !req.body.status
        ) {
            return res.status(400).send({
                message: 'All required fields must be provided'
            });
        }

        const newLiability = {
            userID: req.body.userID,
            liabilityID: req.body.liabilityID,
            liabilityName: req.body.liabilityName,
            type: req.body.type,
            amount: req.body.amount,
            dueDate: req.body.dueDate,
            status: req.body.status,
            description: req.body.description || ''
        };

        const liability = await Liability.create(newLiability);
        return res.status(200).send(liability);
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({ message: error.message });
    }
};

// Routes for view all liabilities
export const getLiabilities = async (req, res) => {
    try {
        const liabilities = await Liability.find({});
        return res.status(200).json({
            count: liabilities.length,
            data: liabilities,
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({ message: error.message });
    }
};

// Routes for get one liability
export const getOneLiability = async (req, res) => {
    try {
        const { id } = req.params;
        const liability = await Liability.findById(id);
        if (!liability) {
            return res.status(404).json({ message: "Liability not found" });
        }
        return res.status(200).json(liability);
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({ message: error.message });
    }
};

// Routes for edit one liability
export const updateLiability = async (req, res) => {
    try {
        const { id } = req.params;
        const liability = await Liability.findById(id);
        if (!liability) {
            return res.status(404).json({ message: "Liability not found" });
        }

        // Update only the fields that are provided
        if (req.body.liabilityID) {
            liability.liabilityID = req.body.liabilityID;
        }
        if (req.body.liabilityName) {
            liability.liabilityName = req.body.liabilityName;
        }
        if (req.body.type) {
            liability.type = req.body.type;
        }
        if (req.body.amount) {
            liability.amount = req.body.amount;
        }
        if (req.body.dueDate) {
            liability.dueDate = req.body.dueDate;
        }
        if (req.body.status) {
            liability.status = req.body.status;
        }
        if (req.body.description !== undefined) {
            liability.description = req.body.description;
        }

        await liability.save();
        return res.status(200).json(liability);
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({ message: error.message });
    }
};

// Routes for delete one liability
export const deleteLiability = async (req, res) => {
    try {
        const { id } = req.params;
        const liability = await Liability.findById(id);
        if (!liability) {
            return res.status(404).json({ message: "Liability not found" });
        }
        await Liability.deleteOne({ _id: id });
        return res.status(200).json({ message: "Liability deleted successfully" });
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({ message: error.message });
    }
};