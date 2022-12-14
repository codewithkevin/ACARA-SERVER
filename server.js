require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");


//Require Service
const userRoute = require("./routes/user");

//env
const port = process.env.PORT;
const mongo = process.env.MONG_URI;

//express app
const app = express();


//Middleware
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//Use Routes 
app.use("/api/user", userRoute);



//connect db 
mongoose
  .connect(mongo)
  .then(() => {
    app.listen(port, () => {
      console.log(
        `Connted to server and running on port http://localhost:${port}`
      );
    });
  })
  .catch((error) => {
    console.log(error);
  });
