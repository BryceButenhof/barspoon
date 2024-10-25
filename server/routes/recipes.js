import { RecipeModel } from "../models/recipeModel.js";
import express from 'express';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        res.json(await RecipeModel.find({}));
    } catch (error) {
        res.json(error);
    }
});

router.get('/preview', async (req, res) => {
    try {
        res.json(await RecipeModel.find({}, 'name description ingredients.name'));
    } catch (error) {
        res.status(500).json(error);
    }
});

router.post('/', async (req, res) => {
    const newRecipe = new RecipeModel(req.body);
    try {
        res.json(await newRecipe.save());
    } catch (error) {
        res.json(error);
    }
});

export { router as RecipesRouter };