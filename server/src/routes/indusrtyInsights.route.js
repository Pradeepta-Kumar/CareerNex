import express from "express";
import {getIndustryInsights} from "../controllers/industryInsights.controller.js";

const router = express.Router();

router.post("/fetch/:id", getIndustryInsights);
export default router;
