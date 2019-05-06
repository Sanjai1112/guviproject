const mongoose=require("mongoose");
const UserSchema=new mongoose.Schema({
    username:String,
    password:String,
    name:String,
    dob:String,
    age:String,
    phone:String
})
module.exports=mongoose.model("User",UserSchema);