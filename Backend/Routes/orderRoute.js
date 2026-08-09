import express from "express";
import { authMiddleware, requireRole } from "../middleware/auth.js";
import { placeOrder, userOrders, listOrders, updateStatus } from "../Controllers/orderController.js";

const orderRouter = express.Router();

// Customer routes
orderRouter.post("/place", authMiddleware, placeOrder);
orderRouter.post("/userorders", authMiddleware, userOrders);

// Owner-only routes
orderRouter.get("/list", authMiddleware, requireRole('owner'), listOrders);
orderRouter.post("/status", authMiddleware, requireRole('owner'), updateStatus);

export default orderRouter;