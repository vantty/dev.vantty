require("dotenv-flow").config();
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
    await mongoose.connect(process.env.MONGODB_URI, {
      useUnifiedTopology: true,
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
var whitelist = [
  "http://localhost:3000",
  "https://vantty.ca",
  "https://www.vantty.ca"
];
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
// app.use(cors(corsOptions));
app.use(cors("*"));
app.use(formData.parse());

// Routes
app.use("/api/user", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/profile", require("./routes/profile"));
app.use("/api/review", require("./routes/review"));
app.use("/api/images", require("./routes/images"));
app.use("/api/book", require("./routes/book"));

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

// Connect Server
app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
