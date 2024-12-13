var mongoose=require('mongoose');
var schema=mongoose.Schema({
     question:String,
     answer:[String],
})

var quiz1Mod=mongoose.model("detaails",schema);

module.exports=quiz1Mod;