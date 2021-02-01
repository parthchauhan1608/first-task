const mongoose = require('mongoose');
const { role,models } = require("./constant");
mongoose.set('useFindAndModify', false);

const userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum : [role.King,role.Queen,role.Male,role.Female], 
      require: true
    },
    image: {
      type: String,
      // required: true
    },
    createdAt : {
      type : Date
    },
    createdBy : {
      type: mongoose.Schema.Types.ObjectId,
      ref: models.user
    },
    editedAt : {
      type : Date
    },
    editedBy : {
      type: mongoose.Schema.Types.ObjectId,
      ref: models.user
    },
    status : {
      type : Boolean,
      default : true
    },
    __v: {
      type: Number,
      select: false
    }
  });
exports.User = mongoose.model(models.user, userSchema);


const token = new mongoose.Schema({
    token: {
        type: String,
        require: true
    }
  });
exports.Token = mongoose.model(models.token, token);
