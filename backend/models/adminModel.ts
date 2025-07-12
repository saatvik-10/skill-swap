import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    username :{
        type: String,
        required: true,
        unique: true,
    },
    password : {
        type: String,
        required: true,
    }
},{timestamps: true});

const Admins = mongoose.model("Admin", adminSchema);
export default Admins;