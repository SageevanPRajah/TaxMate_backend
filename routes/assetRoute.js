import express from 'express';
import { postAsset, getAssets, getOneAsset, updateAsset, deleteAsset } from '../controllers/assetControllers.js';

const router = express.Router();

    // Routes for Create a new asset
    router.post('/', postAsset);

    // Routes for view all assets
    router.get('/', getAssets);

    // Routes for get one asset
    router.get('/:id', getOneAsset);

    // Routes for edit one asset
    router.put('/:id', updateAsset);

    // Routes for delete one asset
    router.delete('/:id', deleteAsset);

export default router;