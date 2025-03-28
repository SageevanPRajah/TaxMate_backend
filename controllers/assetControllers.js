import { Asset } from '../models/assetModel.js';

// Controller for Create a new asset
export const postAsset = async (req, res) => {
    try {
        if (
            !req.body.assetID ||
            !req.body.assetName ||
            !req.body.assetValue ||
            !req.body.category ||
            !req.body.changeType ||
            !req.body.percentage ||
            !req.body.amount ||
            !req.body.date
        ) {
            return res.status(400).send({
                message: 'All fields are required'
            });
        }

        const newAsset = {
            assetID: req.body.assetID,
            assetName: req.body.assetName,
            assetValue: req.body.assetValue,
            category: req.body.category,
            changeType: req.body.changeType,
            percentage: req.body.percentage,
            amount: req.body.amount,
            date: req.body.date
        };

        const asset = await Asset.create(newAsset);
        return res.status(200).send(asset);
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({ message: error.message });
    }
};

// Routes for view all assets
export const getAssets = async (req, res) => {
    try {
        const assets = await Asset.find({});
        return res.status(200).json({
            count: assets.length,
            data: assets,
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({ message: error.message });
    }
};

// Routes for get one asset
export const getOneAsset = async (req, res) => {
    try {
        const { id } = req.params;
        const asset = await Asset.findById(id);
        if (!asset) {
            return res.status(404).json({ message: "Asset not found" });
        }
        return res.status(200).json(asset);
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({ message: error.message });
    }
};

// Routes for edit one asset
export const updateAsset = async (req, res) => {
    try {
        const { id } = req.params;
        const asset = await Asset.findById(id);
        if (!asset) {
            return res.status(404).json({ message: "Asset not found" });
        }

        // Update only the fields that are provided
        if (req.body.assetID) {
            asset.assetID = req.body.assetID;
        }
        if (req.body.assetName) {
            asset.assetName = req.body.assetName;
        }
        if (req.body.assetValue) {
            asset.assetValue = req.body.assetValue;
        }
        if (req.body.category) {
            asset.category = req.body.category;
        }
        if (req.body.changeType) {
            asset.changeType = req.body.changeType;
        }
        if (req.body.percentage) {
            asset.percentage = req.body.percentage;
        }
        if (req.body.amount) {
            asset.amount = req.body.amount;
        }
        if (req.body.date) {
            asset.date = req.body.date;
        }

        await asset.save();
        return res.status(200).json(asset);
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({ message: error.message });
    }
};

// Routes for delete one asset
export const deleteAsset = async (req, res) => {
    try {
        const { id } = req.params;
        const asset = await Asset.findById(id);
        if (!asset) {
            return res.status(404).json({ message: "Asset not found" });
        }
        await Asset.deleteOne({ _id: id });
        return res.status(200).json({ message: "Asset deleted successfully" });
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({ message: error.message });
    }
};

