const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const studentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  rollNumber : {
    type: Number,
    required : true,
    unique : true,
  },
  class : {
    type: String,
    required : true,
  },
  gender : {
    type : String,
    required : true,
  }
}, {
    timestamps: true,
});

const student = mongoose.model('Student', studentSchema);
module.exports = student;