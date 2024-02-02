const { model, Schema } = require("mongoose");

const usersSchema = new Schema({
  joinDate: { type: Date },
  name: { type: String },
  photo: { type: String },
  email: { type: String },
  mobile: { type: String },
  showRoom: { type: String },
  designation: { type: String },
  bloodGroup: { type: String },
  address: { type: String },
});

const Users = model("users", usersSchema);

module.exports = Users;
