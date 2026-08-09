import express from "express";
import { addTocart, removeFromCart, getCart, deletAllCart } from "../Controllers/cartContoller.js";

import authMiddleware from "../middleware/auth.js";



const cartRouter = express.Router();


cartRouter.post("/add", authMiddleware, addTocart);
cartRouter.post("/remove", authMiddleware, removeFromCart);
cartRouter.post("/get", authMiddleware, getCart);
cartRouter.post("/delete", authMiddleware, deletAllCart);



export default cartRouter;
