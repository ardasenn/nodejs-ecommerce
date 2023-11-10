require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const connectDB = require("./config/dbConn");
const corsOptions = require("./config/corsOptions");
const cors = require("cors");
const morgan = require("morgan");
connectDB();

const api = process.env.API_URL;
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
//middlewares
app.use(express.json());
app.use(morgan("tiny"));
//routes
app.use(`${api}/products`, require("./routes/products"));
app.use(`${api}/categories`, require("./routes/categories"));
app.use(`${api}/orderItems`, require("./routes/orderItems"));
app.use(`${api}/users`, require("./routes/users"));
app.use(`${api}/orders`, require("./routes/orders"));

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(3500);
  console.log("Server running on 3500");
});
