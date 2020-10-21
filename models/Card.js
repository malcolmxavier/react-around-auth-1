const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
name:{
  type: String,
  required: true,
  minlength: 2,
  maxlength: 30},
link:{
  type: String,
  required: true,
  validate: /http(s?):\/\/[\w\-\/\.]{1,}\.(jpg|gif|png)/gi
},
owner:{
  type: mongoose.Schema.Types.ObjectId,
  ref:'user',
  required: true
},
likes:{
  type: [mongoose.Schema.Types.ObjectId],
  default:[]
},
createdAt:{
  type: Date,
  default: Date.now
}
})
module.exports = mongoose.model('Card', cardSchema)