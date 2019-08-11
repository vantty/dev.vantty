const express = require("express"),
  mongoose = require("mongoose"),
  expressValidator = require("express-validator"),
  morgan = require("morgan"),
  cors = require("cors"),
  formData = require("express-form-data"),
  app = express();

// Connect Database
const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://vantty:vantty2019@vanttymain-biwfu.mongodb.net/test?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false
      }
    );
    console.log("DB Connected...");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};
connectDB();

// Init Middleware
app.use(morgan("dev"));
app.use(expressValidator());
app.use(express.json({ extended: false }));
app.use(cors({ origin: "https://vantty.now.sh" }));
app.use(formData.parse());

// Routes
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/profile", require("./routes/profile"));
app.use("/api/review", require("./routes/review"));
app.use("/api/images", require("./routes/images"));

// Connect Server
app.listen(5000, () => {
  console.log("Listening on port 5000");
});
