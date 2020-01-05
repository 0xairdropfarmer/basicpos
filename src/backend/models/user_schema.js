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
  username: String,
  email: String,
  password: String,
  level: { type: String, default: "normal" },
  created: { type: Date, default: Date.now }
});

schema.index({ username: 1 }, { unique: true });
module.exports = mongoose.model("users", schema);
