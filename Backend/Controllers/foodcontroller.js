import Foodmodel from "../Models/Foodmodel.js";

import fs from "fs";




// add new food item

const addFoodItem = async(req,res)=>{

   
    if (!req.file) {
        return res.status(400).json({ success: false, message: "Image not uploaded" });
    }
    let image_filename = `${req.file.filename}`;
   const food=new Foodmodel({
    name:req.body.name,
    description:req.body.description,
    price:req.body.price,
    category:req.body.category,
    image:image_filename
   });
   try {
    await food.save();
    res.status(201).json({ success: true, message: "Food item added successfully" });
   } catch (error) {
    console.log(error);

    res.status(500).json({ success: false, message: "Error adding food item" });
   }
}

//all food list
 const listFood= async( req,res)=>{
try {
    const foods=await Foodmodel.find({});
    res.json({success:true,data:foods});
} catch (error) {
   console.log(error);
   res.json({success:false,message:"Error fetching food items"})
}
 }

 //Remove food item
 const removeFood=async(req,res)=>{
  try {
    const food=await Foodmodel.findById(req.body.id);
    fs.unlinkSync(`./uploads/${food.image}`,()=>{});
    await Foodmodel.findByIdAndDelete(req.body.id);
    res.json({success:true,message:"Food item removed successfully"});
  } catch (error) {
   console.log(error);
   res.json({success:false,message:"Error removing food item"})
  }
 }

export {addFoodItem,listFood,removeFood};
