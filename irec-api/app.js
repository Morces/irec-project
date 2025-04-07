require("dotenv").config();
const express = require("express");
const cors = require("cors");

// Set up Cluster
const cluster = require("cluster");
const numCPUs = require("os");

// Middlewares
// const error = require("./API/Middleware/error");
// const Auth = require("./API/Middleware/Auth");
//

const PORT = process.env.PORT || 6000;
const LESS_CPU = process.env.CPU || 0;
const app = express();

// ROUTES

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json({ limit: "500mb" }));
app.use(express.urlencoded({ limit: "500mb", extended: true }));

BigInt.prototype.toJSON = function () {
  return this.toString();
};

app.get("/", (req, res) => {
  res.send("IRECS API WORKING");
});

// app.use(Auth);

// All Routes

// app.use(error);

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);
  console.log(`Number of CPUs is ${numCPUs.cpus().length}`);

  // Fork workers.
  for (let i = 0; i < numCPUs.cpus().length - LESS_CPU; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
    cluster.fork();
  });
} else {
  app.listen(PORT, () =>
    console.log(
      `Worker ${process.pid} started and  server starting on port ${PORT} `
    )
  );
}
