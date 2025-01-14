const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const instrumentsRoutes = require("./Routes/instruments.route");
const {
  NotFoundRoutes,
  GlobalErrorHandler,
} = require("./middlewares/ErrorHandling");
const connecToDB = require("./db/connectToDB");
//cors
app.use(
  cors({
    origin: "https://futtech-lvmfsqjxr-fahd-azmys-projects.vercel.app/",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(express.json());
//Routes
app.use("/api", instrumentsRoutes);
// Error Handling
app.use(GlobalErrorHandler);
app.use(NotFoundRoutes);
const Port = process.env.PORT || 4000;
app.listen(Port, () => {
  connecToDB();
  console.log("Server listening on Port", Port);
});
