import express from "express";
import { addFoodItem, listFood, removeFood } from "../Controllers/foodcontroller.js";
import { authMiddleware, requireRole } from "../middleware/auth.js";
import multer from "multer";

const foodRouter = express.Router();

// Image storage configuration
const storage = multer.diskStorage({
    destination: "uploads/",
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({ storage: storage });

// Public route — anyone can view the food list
foodRouter.get("/list", listFood);

// Owner-only routes — must be logged in AND have the 'owner' role
foodRouter.post("/add", authMiddleware, requireRole('owner'), upload.single("image"), addFoodItem);
foodRouter.post("/remove", authMiddleware, requireRole('owner'), removeFood);

export default foodRouter;
