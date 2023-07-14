const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const teacherSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  id : {
    type: String,
    required : true,
    unique : true,
  },
  teachesClass : [{
    type : String,
    required : true,
  }],
  teachesSubject : [{
    type : String,
    required : true,
  }],
  experience : {
    type : Number,
    required : true,
    validate : {
        validator : Number.isInteger,
        message : "Experience is not an integer",
    },
  },
  gender : {
    type : String,
    required : true,
  }
}, {
    timestamps: true,
});

const teacher = mongoose.model('Teacher', teacherSchema);
module.exports = teacher;