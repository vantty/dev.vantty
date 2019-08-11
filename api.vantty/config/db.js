const mongoose = require("mongoose"),
  config = require("config");
// db = config.get("mongoURI");
// db =
// "mongodb+srv://vantty:vantty@2019@vanttymain-biwfu.mongodb.net/test?retryWrites=true&w=majority";
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false
    });
    console.log("DB Connected...");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
