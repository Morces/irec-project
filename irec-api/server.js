const cluster = require("cluster");
const numCPUs = require("os");
const app = require("./app");
require("dotenv").config();

const PORT = process.env.PORT || 7000;

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);
  console.log(`Number of CPUs is ${numCPUs.cpus().length}`);

  // Fork workers.
  for (let i = 0; i < numCPUs.cpus().length; i++) {
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
