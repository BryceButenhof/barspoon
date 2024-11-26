import express from "express";
import cors from "cors";
import mongoose from 'mongoose';
import 'dotenv/config';
import { RecipesRouter } from './routes/recipes.js';
import { MenusRouter } from "./routes/menus.js";

const PORT = process.env.PORT || 5050;
const app = express();

// Parsing Middleware
app.use(express.json());
app.use(cors());

app.use("/recipes", RecipesRouter);
app.use("/menus", MenusRouter);

mongoose.connect(process.env.ATLAS_URI);

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT} and has been successfully connected to the database!`);
});