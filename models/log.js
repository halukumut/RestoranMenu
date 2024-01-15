const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const logSchema=new Schema({
    logId:{
        type: String,
        required:true,
    },
    password:{
        type: String,
        required:true,
    }
},{timestamps:true});

const Log = mongoose.model('Log',logSchema);
module.exports=Log;