const mongoose = require("mongoose");


const APIRecords = mongoose.model(
  "APIRecords",
  new mongoose.Schema({
  	_id:{type:String},
  	CreatedBy:{type:String},
  	Version:{type:Number},
  	Swagger:{type:String},
	apiname:{type:String},
	access : {type:String},
  	dateCreated:{type:Date},
  	dateModified:{type:Date},
  	OperationsName:[String],
  	verbsAvailable:[String],
  	Description:{type:String},
	APITerms:[String]
  },{strict:false})
);

module.exports = APIRecords;