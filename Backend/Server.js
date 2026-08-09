import express from "express";
import cors from "cors";
import compression from "compression";
import "dotenv/config";
import { connectDB } from "./config/db.js";
import foodRouter from "./Routes/foodroutes.js";
import userRouter from "./Routes/userRoute.js";
import cartRouter from "./Routes/cartRoute.js";
import orderRouter from "./Routes/orderRoute.js";


//app config
const app = express();
const port = 4000;


//middleware
app.use(compression()); // Gzip compress all responses
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
   res.send("API Working");
})

//database connection
connectDB();

//api endpoint
app.use("/api/food", foodRouter);
app.use("/api/user", userRouter);
app.use("/images", express.static('uploads'));
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);



app.listen(port, () => {
   console.log(`Server started on http://localhost:${port}`);
});

//mongodb+srv://abhaykorain9044_db_user:CVTOd14vCYaEuOy6@cluster0.jgklgha.mongodb.net/?appName=Cluster0