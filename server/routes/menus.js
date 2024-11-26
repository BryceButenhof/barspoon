import { MenuModel } from "../models/menuModel.js";
import express from 'express';

const router = express.Router();

//Get all menus
router.get('/', async (_, res) => {
    try {
        res.status(200).json(await MenuModel.find({}).collation({ locale: "en" }).sort({ name: 1 }));
    } catch (error) {
        res.status(404).json(error);
    }
});

// Create menu
router.post('/', async (req, res) => {
    const newMenu = new MenuModel(req.body);
    try {
        res.status(201).json(await newMenu.save());
    } catch (error) {
        res.status(400).json(error);
    }
});

// Get single menu
router.get('/:slug', async (req, res) => {
    try {
        const menu = await MenuModel.findOne({ slug: req.params.slug });
        menu ? res.status(200).json(menu) : res.status(404).json();
    } catch (error) {
        res.status(404).json(error);
    }
});

// Update menu
router.patch('/:slug', async (req, res) => {
    try {
        res.status(204).json(await MenuModel.findOneAndUpdate({ slug: req.params.slug }, new MenuModel(req.body)));
    } catch (error) {
        res.status(400).json(error);
    }
});

// Delete single menu
router.delete('/:slug', async (req, res) => {
    try {
        res.status(204).json(await MenuModel.findOneAndDelete({ slug: req.params.slug }));
    } catch (error) {
        res.status(400).json(error);
    }
});

export { router as MenusRouter };

