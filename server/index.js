// index.js
const express = require("express");
const next = require("next");
const http = require("http");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");

require("dotenv").config();

const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
const routes = require("./routes/statusRoutes");
const Message = require("./models/messageModel");

const socketModule = require("./socket");
const PORT = process.env.PORT;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const DB = process.env.DATABASE.replace("<PASSWORD>", process.env.PASSWORD);
mongoose
  .connect(DB)
  .then(() => {
    console.log("DB connection successful!");
  })
  .catch((err) => {
    console.log(err);
  });

app
  .prepare()
  .then(() => {
    const server = express();
    const httpServer = http.createServer(server);

    server.use(cors());
    server.use(bodyParser.json());
    server.use(cookieParser());

    const io = socketModule(httpServer);

    server.use("/", routes);

    server.get("*", (req, res) => {
      return handle(req, res);
    });

    server.all("*", (req, res, next) => {
      next(new AppError(`Can't find ${req.originalUrl} on the server`, 404));
    });

    server.use(globalErrorHandler);

    httpServer.listen(PORT, (err) => {
      if (err) throw err;
      console.log(`Running on port ${PORT}`);
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });
