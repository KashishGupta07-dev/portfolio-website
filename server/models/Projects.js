const mongoose = require("mongoose");
const projectsSchema = new mongoose.Schema({
  tag: {
    type: String,
    required: true,
    enum:["Mern","Web","React","All"],
  },
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  imgUrl: {
    type: String,
    required: true,
  },
  repository: {
    type: String,
    required: true,
  },
  domain: {
    type: String,
    required: true,
  },
});


module.exports = mongoose.model("Projects",projectsSchema);