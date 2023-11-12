require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const connectDB = require("./config/dbConn");
const corsOptions = require("./config/corsOptions");
const cors = require("cors");
const morgan = require("morgan");
const authJwt = require("./utils/jwt");
const errorHandling = require("./middleware/errorHandling");
connectDB();

const api = process.env.API_URL;
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));

//middlewares
app.use(express.json());
app.use(morgan("tiny"));
app.use(authJwt());
app.use(errorHandling);
//routes
app.use(`${api}/auth`, require("./routes/auth"));
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
