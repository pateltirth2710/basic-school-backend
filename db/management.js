const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const managementSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  id : {
    type: String,
    required : true,
    unique : true,
  },
  level : {
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

const management = mongoose.model('Management', managementSchema);
module.exports = management;