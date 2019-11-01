require("dotenv").config();
const server = require("./server/server");

const PORT = process.env.PORT || 8000;

server.listen(PORT, () => {
  console.log("Server is currently running on port", PORT);
});
