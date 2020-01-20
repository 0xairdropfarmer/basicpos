require("dotenv").config({ path: __dirname + "/.env" });
const express = require("express");
const bcrypt = require("bcrypt");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const formidable = require("formidable");
const path = require("path");
const fs = require("fs-extra");
app.use(express.static(__dirname + "/uploaded"));
require("./db");
const Users = require("./models/user_schema");
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const jwt = require("./jwt");
app.put("/profile", async (req, res) => {
  try {
    var form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
      let doc = await Users.findOneAndUpdate({ _id: fields.id }, fields);
      await uploadImage(files, fields);
      res.json({ result: "success", message: "Update Successfully" });
    });
  } catch (err) {
    res.json({ result: "error", message: err.errmsg });
  }
});
uploadImage = async (files, doc) => {
  if (files.avatars != null) {
    var fileExtention = files.avatars.name.split(".").pop();
    doc.avatars = `${Date.now()}+${doc.username}.${fileExtention}`;
    var newpath =
      path.resolve(__dirname + "/uploaded/images/") + "/" + doc.avatars;

    if (fs.exists(newpath)) {
      await fs.remove(newpath);
    }
    await fs.move(files.avatars.path, newpath);

    // Update database
    await Users.findOneAndUpdate({ _id: doc.id }, doc);
  }
};
showPreviewImage = values => {
  return (
    <div class="text-center">
      <img
        id="avatars"
        src={
          values.file_obj != null
            ? values.file_obj
            : "http://localhost:8080/images/user.png"
        }
        class="profile-user-img img-fluid img-circle"
        width={100}
      />
    </div>
  );
};
app.post("/login", async (req, res) => {
  let doc = await Users.findOne({ username: req.body.username });
  if (doc) {
    if (bcrypt.compareSync(req.body.password, doc.password)) {
      const payload = {
        id: doc._id,
        level: doc.level,
        username: doc.username
      };

      let token = jwt.sign(payload);
      console.log(token);
      res.json({ result: "success", token, message: "Login successfully" });
    } else {
      // Invalid password
      res.json({ result: "error", message: "Invalid password" });
    }
  } else {
    // Invalid username
    res.json({ result: "error", message: "Invalid username" });
  }
});
app.post("/register", async (req, res) => {
  try {
    req.body.password = await bcrypt.hash(req.body.password, 8);
    await Users.create(req.body);
    res.json({ result: "success", message: "Register successfully" });
  } catch (err) {
    res.json({ result: "error", message: err.errmsg });
  }
});
const port = 8080;
app.listen(port, () => {
  console.log("Server is running... on port " + port);
});
