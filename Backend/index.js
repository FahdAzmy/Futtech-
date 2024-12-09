const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
app.use(express.json());
const {
  NotFoundRoutes,
  GlobalErrorHandler,
} = require("./middlewares/ErrorHandling");
// Error Handling
app.use(NotFoundRoutes);
app.use(GlobalErrorHandler);
const Port = process.env.PORT || 4000;
app.listen(Port, () => {
  console.log("Server listening on Port", Port);
});
