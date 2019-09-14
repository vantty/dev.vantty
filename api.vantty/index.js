const express = require("express"),
  mongoose = require("mongoose"),
  expressValidator = require("express-validator"),
  morgan = require("morgan"),
  cors = require("cors"),
  formData = require("express-form-data"),
  app = express();

const Profile = require("./models/Profile");
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
var whitelist = ["https://vantty.now.sh", "http://localhost:3000"];
var corsOptions = {
  origin: function(origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  }
};

Profile.search(
  {
    query_string: {
      query: "bio"
    }
  },
  function(err, results) {
    console.log(results);
    console.log(err);
  }
);

// Profile.createMapping(function(err, mapping) {
//   if (err) {
//     console.log("err creating mapping");
//     console.log(err);
//   } else {
//     console.log("Mapping Creating");
//     console.log(mapping);
//   }
// });

// var stream = Profile.synchronize();
// var count = 0;

// stream.on("data", function() {
//   count++;
// });

// stream.on("close", function() {
//   console.log("indexes" + count + "documents");
// });

// stream.on("err", function() {
//   console.log(err);
// });

// Init Middleware
app.use(morgan("dev"));
app.use(expressValidator());
app.use(express.json({ extended: false }));
app.use(cors("*"));
app.use(formData.parse());

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
