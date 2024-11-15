import { RecipeModel } from "../models/recipeModel.js";
import express from 'express';

const router = express.Router();

//Get all recipes
router.get('/', async (_, res) => {
    try {
        res.status(200).json(await RecipeModel.find({}));
    } catch (error) {
        res.status(404).json(error);
    }
});

//Create recipe
router.post('/', async (req, res) => {
    const newRecipe = new RecipeModel(req.body);
    try {
        res.status(201).json(await newRecipe.save());
    } catch (error) {
        res.status(400).json(error);
    }
});

//Get single recipe
router.get('/:slug', async (req, res) => {
    try {
        const recipe = await RecipeModel.findOne({ slug: req.params.slug });
        recipe ? res.status(200).json(recipe) : res.status(404).json();
    } catch (error) {
        res.status(404).json(error);
    }
});

router.patch('/:slug', async (req, res) => {
    try {
        res.status(204).json(await RecipeModel.findOneAndUpdate({ slug: req.params.slug }, new RecipeModel(req.body)));
    } catch (error) {
        res.status(400).json(error);
    }
});

//Delete single recipe
router.delete('/:slug', async (req, res) => {
    try {
        res.status(204).json(await RecipeModel.findOneAndDelete({ slug: req.params.slug }));
    } catch (error) {
        res.status(400).json(error);
    }
});

export { router as RecipesRouter };