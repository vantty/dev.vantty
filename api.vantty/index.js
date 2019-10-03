const express = require("express"),
  mongoose = require("mongoose"),
  expressValidator = require("express-validator"),
  morgan = require("morgan"),
  cors = require("cors"),
  formData = require("express-form-data"),
  app = express();

// env
const PORT = 5000,
  MONGODB_URI =
    "mongodb+srv://vantty:vantty2019@vanttymain-biwfu.mongodb.net/test?retryWrites=true&w=majority";

// Connect Database
const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
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
connectDB();

// CORS config
var whitelist = ["https://vantty.ca", "http://localhost:3000"];
var corsOptions = {
  origin: function(origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  }
};

// Init Middleware
app.use(morgan("dev"));
app.use(expressValidator());
app.use(express.json({ extended: false }));
// app.use(express.urlencoded());
// app.use(express.multipart());
app.use(cors(corsOptions));
app.use(formData.parse());
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

// Routes
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/profile", require("./routes/profile"));
app.use("/api/review", require("./routes/review"));
app.use("/api/images", require("./routes/images"));

// Connect Server
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
