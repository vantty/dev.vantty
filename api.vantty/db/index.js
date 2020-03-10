const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    if (process.env.NODE_ENV === "test") {
      const { Mockgoose } = require("mockgoose");
      const mockgoose = new Mockgoose(mongoose);
      mockgoose.prepareStorage().then(() => {
        mongoose.connect(process.env.MONGODB_URI, {
          useUnifiedTopology: true,
          useNewUrlParser: true,
          useCreateIndex: true,
          useFindAndModify: false
        });
      });
    } else {
      await mongoose.connect(process.env.MONGODB_URI, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false
      });
      console.log("DB Connected...");
    }
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = { connectDB };
