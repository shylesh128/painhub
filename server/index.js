const express = require("express");
const next = require("next");
const mongoose = require("mongoose");

require("dotenv").config();
const PORT = process.env.PORT;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const bodyParser = require("body-parser");
const cors = require("cors");

const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
const routes = require("./routes/statusRoutes");

app
  .prepare()
  .then(() => {
    const server = express();
    server.use(cors());
    server.use(bodyParser.json());

    server.use("/", routes);

    server.get("*", (req, res) => {
      return handle(req, res);
    });

    server.all("*", (req, res, next) => {
      next(new AppError(`can't find ${req.originalUrl} on the server`, 404));
    });

    server.use(globalErrorHandler);

    server.listen(PORT, (err) => {
      if (err) throw err;
      console.log(`running on the port ${PORT}`);
    });

    const DB = process.env.DATABASE.replace("<PASSWORD>", process.env.PASSWORD);
    mongoose
      .connect(DB, {
        useNewUrlParser: true,
        useUnifiedTopology: false,
      })
      .then(() => {
        console.log("DB connection successful! ");
      })
      .catch((err) => {
        console.log(err);
      });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });
