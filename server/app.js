const dotenv = require('dotenv');
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const cors = require("cors");
const authRoute = require("./router/auth-router");
const PitchRoute = require("./router/pitch-router");
dotenv.config({ path: './config.env' });
const errorMiddleWare = require("./middlewares/error-middleware");

const corsOptions = {
    origin: "http://localhost:5173",
    methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

require('./db/conn');
app.use("/api/auth", authRoute);
app.use("/api/pitches", PitchRoute);
app.use(errorMiddleWare);

app.listen(3000, function (req, res) {
    console.log("server running on port 3000");
});

