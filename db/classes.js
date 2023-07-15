const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const classesSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  classStrength: {
    type: String,
    required : true,
  },
  classTeacher:{
    type: String, 
    required: true,
  }
}, {
    timestamps: true,
});

const classes = mongoose.model('Class', classesSchema);
module.exports = classes;