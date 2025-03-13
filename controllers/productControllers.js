import { Product } from '../models/productModel.js';

    // Controller for Create a new product
    export const postProduct = async (req, res) => {
        try {
            if(
                !req.body.productID ||
                !req.body.name ||
                !req.body.category ||
                !req.body.price ||
                !req.body.quantity ||
                !req.body.address 
            ) {
                return res.status(400).send({
                    message: 'All fields are required'
                });
            }
            const newProduct = {
                productID: req.body.productID,
                name: req.body.name,
                category: req.body.category,
                price: req.body.price,
                quantity: req.body.quantity,
                address: req.body.address
            };
            const product = await Product.create(newProduct);
            return res.status(200).send(product);
        } catch (error) {
            console.log(error.message);
            return res.status(500).send({message: error.message});
        }
    };

    // Routes for view all product
    export const getProducts = async (req, res) => {
        try {
            const products = await Product.find({});
            return res.status(200).json({
                count: products.length,
                data: products,
            })
        } catch (error) {
            console.log(error.message);
            return res.status(500).send({message: error.message});
        }
    };

    // Routes for get one product
    export const getOneProduct = async (req, res) => {
        try {
            const { id } = req.params;
            const product = await Product.findById(id);
            if (!product) {
                return res.status(404).json({ message: "Product not found" });
            }
            return res.status(200).json(product);
        } catch (error) {
            console.log(error.message);
            return res.status(500).send({message: error.message});
        }
    };

    // Routes for edit one product
    export const updateProduct = async (req, res) => {
        try {
            if(
                !req.body.productID ||
                !req.body.name ||
                !req.body.category ||
                !req.body.price ||
                !req.body.quantity ||
                !req.body.address 
            ){
                return res.status(400).send({
                    message: 'All fields are required'
                });
            }
            const { id } = req.params;
            const result = await Product.findByIdAndUpdate(id,req.body);
            if (!result) {
                return res.status(404).json({ message: "Product not found" });
            }
            return res.status(200).send({message: 'Product updated successfully'});
        } catch (error) {
            console.log(error.message);
            return res.status(500).send({message: error.message});
        }
    };

    // Routes for delete one product
    export const deleteProduct = async (req, res) => {
        try {
            const { id } = req.params;
            const result = await Product.findByIdAndDelete(id);
            if (!result) {
                return res.status(404).json({ message: "Product not found" });
            }
            return res.status(200).send({message: 'Product deleted successfully'});
        } catch (error) {
            console.log(error.message);
            return res.status(500).send({message: error.message});
        }
    };