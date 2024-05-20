const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const noteRoutes = require("./routes/notes");
const userRoutes = require("./routes/user");
const cors = require("cors");
// express app
const app = express();

// middleware
app.use(express.json());

//routes
app.use("/api/notes", noteRoutes);
app.use("/api/user", userRoutes);

const corsOptions = {
  origin: "https://noteapp-frontend-production.up.railway.app",
  methods: "GET,PATCH,POST,DELETE",
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

//connect to db
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log("connected to db listening on port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
