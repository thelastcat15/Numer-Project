const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const timeout = require("express-timeout-handler").handler;

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  // credentials: true,
}));
app.use(helmet());
app.use(express.json());

app.use(
  timeout({
    timeout: 5000,
    onTimeout: function (req, res) {
      res.status(408).send("Request timed out");
    },
    onDelayedResponse: function (req, res) {
      res.status(503).send("Please try again later");
    },
  }),
);

app.set("trust proxy", 1);

app.use(
  rateLimit({
    windowMs: 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
  }),
);

app.use((req, res, next) => {
  console.log(`${req.method} : ${req.url}`);
  next();
});

app.get("/", (req, res) => {
  return res.status(200).send("Hello World");
});

app.get("*", (req, res) => {
  return res.status(404).send("Not Found");
});

const routesPath = path.join(__dirname, "routes");
fs.readdirSync(routesPath).forEach((folder) => {
  const routeSubPath = path.join(routesPath, folder);
  fs.readdirSync(routeSubPath).forEach((file) => {
    if (file.endsWith(".js")) {
      const route = require(path.join(routeSubPath, file));
      app.use(route);
    }
  });
});

app.listen(port, () => {
  console.log("Server running...");
});
