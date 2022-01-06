const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://CJ:1234@cluster0.uuqiy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
);

const Schema = mongoose.Schema;

const Post = new Schema({
  authorId: String,
  author: String,
  title: String,
  content: String,
  date: Date,
  tags: Array,
  like: Array,
  comment: Array,
});

const User = new Schema({
  userName: String,
  password: String,
});

const PostModel = mongoose.model("post", Post);
const UserModel = mongoose.model("user", User);

module.exports = { PostModel, UserModel };
