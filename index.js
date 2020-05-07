const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const config = require("./config/db");
const PORT = process.env.PORT || 3030;
const app = express();

//configure database and mongoose
mongoose.set("useCreateIndex", true);

mongoose
    .connect(config.database, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("MongoDB Atlas is connected");
    })
    .catch((err) => {
        console.log({ database_error: err });
    });

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan("dev"));

// define first route
app.get("/", (req, res) => {
    console.log("Hello MEVN Soldier");
});

const userRoutes = require("./api/user/route/user");

app.use("/user", userRoutes);

app.listen(PORT, () => {
    console.log(`Listeing on port: ${PORT}`);
});
