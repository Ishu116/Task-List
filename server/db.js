const mongoose = require("mongoose");

const connection = () => {
  mongoose.connect("mongodb://127.0.0.1:27017/TaskDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => {
      console.log("Database is connected");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = connection;
