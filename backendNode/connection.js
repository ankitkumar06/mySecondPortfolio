const mongoose = require("mongoose");

require('dotenv').config()
  // .connect("mongodb://localhost:27017/epixWebsite", {
  //   useNewUrlParser: true,
  // })
  mongoose.connect(process.env.MONGO_CONNECTION,{
    useNewUrlParser: "true",
  useUnifiedTopology: "true"
  })
  .then(() => {
    console.log("DB Connection Successfull by Ankit!");
  })
  .catch((error) => {
    console.log("DB Connection Failed!", error);
  });
