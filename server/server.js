const http = require("http");
const app = require("./app");

const PORT = process.env.PORT || 8001;

const server = http.createServer(app);

const startServer = async () => {
  server.listen(PORT, () =>
    console.log(`Server listening on port ${PORT}`.cyan.underline)
  );
};

startServer();
