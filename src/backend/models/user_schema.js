/*
const mongoose = require('mongoose');
const schema = mongoose.Schema({
    username: String,
    password: String,
    level: {type: String, default: 'normal'},
    created: {type: Date, default: Date.now}
});

schema.index({username: 1}, {unique: true});
module.exports = mongoose.model('users', schema);
*/

const mongoose = require("mongoose");
const schema = mongoose.Schema({
  avatars: String,
  username: String,
  email: String,
  first_name: { type: String, default: "" },
  last_name: { type: String, default: "" },
  phone: { type: String, default: "" },
  address: { type: String, default: "" },
  password: String,
  level: { type: String, default: "staff" },
  created: { type: Date, default: Date.now }
});

schema.index({ username: 1 }, { unique: true });
module.exports = mongoose.model("users", schema);
