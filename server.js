import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import noteRoutes from "./routes/notes.js";
import userRoutes from "./routes/user.js";

dotenv.config();

// express app
const app = express();

// middleware
app.use(express.json());

// Add the logging and CORS middleware here
app.use((req, res, next) => {
  console.log("Request received:", req.method, req.url);
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Define CORS options for specific routes
const corsOptions = {
  origin: ["http://localhost:3000", "https://note-app-six-mu.vercel.app/"],
  methods: "GET,PATCH,POST,DELETE",
  optionsSuccessStatus: 204,
};

// Apply CORS options middleware
app.use(cors(corsOptions));

// routes
app.use("/api/notes", noteRoutes);
app.use("/api/user", userRoutes);

// connect to db
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
