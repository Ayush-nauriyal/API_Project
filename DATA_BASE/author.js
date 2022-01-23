const mongoose = require("mongoose");

//authorschema

const AuthorSchema = mongoose.Schema({
    id: Number,
  name: String,
  books: [String]
  });


  const Authormodel =mongoose.model("authors",AuthorSchema);

  module.exports = Authormodel;
