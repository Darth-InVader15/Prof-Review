require("dotenv").config();

const mongoose = require("mongoose");
const express  = require("express");

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");


const app =express();


//Importing My routes
const authRoute = require('./routes/auth');
const profRoute = require('./routes/professor');

//DB Connection
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => {
    console.log("DB CONNECTED");
  });



//Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

app.use("/api",profRoute)
app.use("/api",authRoute)




//PORT
const port = process.env.PORT || 8000;

//Starting a server
app.listen(port, () => {
  console.log(`app is running at ${port}`);
});
