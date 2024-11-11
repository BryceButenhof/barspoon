import { RecipeModel } from "../models/recipeModel.js";
import express from 'express';

const router = express.Router();

//Get all recipes
router.get('/', async (req, res) => {
    try {
        res.json(await RecipeModel.find({}));
    } catch (error) {
        res.json(error);
    }
});

//Get single recipe
router.get('/:slug', async (req, res) => {
    try {
        res.json(await RecipeModel.findOne({ slug: req.params.slug }));
    } catch (error) {
        res.json(error);
    }
});

//Create recipe
router.post('/', async (req, res) => {
    const newRecipe = new RecipeModel(req.body);
    try {
        res.json(await newRecipe.save());
    } catch (error) {
        res.json(error);
    }
});

//Delete single recipe
router.delete('/:slug', async (req, res) => {
    try {
        res.json(await RecipeModel.findOneAndDelete({ slug: req.params.slug }));
    } catch (error) {
        res.json(error);
    }
});

export { router as RecipesRouter };