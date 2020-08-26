const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const PersonSchema=new Schema({
    name:{
        type:String,
        required: true
    },

    email:{
        type:String,
        required:true
    },

    password:{
        type:String,
        required:true
    },

    profilepic:{
        type:String,
        default:'https://pixabay.com/photos/ballet-dancer-oudoors-elegant-5415806/'
    },

    gender:{
        type:String,
        required:true
    },

    date:{
        type: Date,
        default: Date.now()
    }
})

module.exports=Person=mongoose.model("myPerson",PersonSchema);