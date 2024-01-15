const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const urunSchema=new Schema({
    ad:{
        type: String,
        required:true,
    },
    img:{
        type: String,
        required:true,
    },
    fiyat:{
        type: String,
        required:true,
    },
    tur:{
        type:String,
        required:true,
    }
},{timestamps:true});

const Urun = mongoose.model('Urun',urunSchema);
module.exports=Urun;