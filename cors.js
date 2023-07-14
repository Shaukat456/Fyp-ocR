const cors = require("cors");

module.exports = cors({
  origin: "http://localhost:8000",
  allowedHeaders: ["Content-Type", "Authorization"],
});
