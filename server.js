require("dotenv").config();

const express = require("express");
const app = express();

const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URL);
const db = mongoose.connection;
db.on('error', (err) => console.error(err.msg));
db.on('open', () => console.log("Connected to DB"));

app.use(express.json());

app.use("/subscribers", require("./routes/subscribers"))


app.listen(3500, () => console.log("Server running..."));