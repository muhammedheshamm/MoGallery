const mongoose = require("mongoose");

const connectToDB = () => {
  mongoose.set("strictQuery", false);

  mongoose.connect("mongodb://0.0.0.0:27017/myDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  const connection = mongoose.connection;

  connection.on("error", console.error.bind(console, "connection error:"));

  connection.once("open", () => {
    console.log("Connected to MongoDB");
  })
}


module.exports = connectToDB
