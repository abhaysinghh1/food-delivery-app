import userModel from "../Models/userModel.js";




// add items to user cart
const addTocart = async (req, res) => {
   try {
   let  userData = await userModel.findOne({id:req.body.userId})
   let cartData=await userData.cartData;

   if(!cartData[req.body.itemId]){
      cartData[req.body.itemId]=1
   }
   else{
      cartData[req.body.itemId]+=1;
   }
   await userModel.findByIdAndUpdate(req.body.userId,{cartData});
   res.json({success:true,message:"Added To Cart"  });
   } catch (error) {
      console.log(error);
      res.json({success:false,message:"Error"});
   }
}



// remove items from user cart
const removeFromCart = async (req, res) => {
   try {

      let userData=await userModel.findById(req.body.userId)
      let cartData=await userData.cartData;
      
      if(cartData[req.body.itemId]>0){
         cartData[req.body.itemId]-=1;
      }
      else{
         delete cartData[req.body.itemId];
      }
      await userModel.findByIdAndUpdate(req.body.userId,{cartData});
      res.json({success:true,message:"Removed From Cart"});

   } catch (error) {
      console.log(error);
      res.json({success:false,message:"Error"});
   }
}

// fetch user cart

const getCart = async (req, res) => {
   try {

      let userData=await userModel.findById(req.body.userId)
      let cartData=await userData.cartData;
      res.json({success:true,cartData});

   } catch (error) {
      console.log(error);
      res.json({success:false,message:"Error"});
   }
}

// delete all items from cart

const deletAllCart = async (req, res) => {
   try {

   } catch (error) {

   }
}


export { addTocart, removeFromCart, getCart, deletAllCart }