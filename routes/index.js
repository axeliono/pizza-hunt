const express = require("express");
const router = express.Router();
const htmlRoutes = require("./html/html-routes.js");
const apiRoutes = require("./api/index.js");

router.use("/api", apiRoutes);
router.use("/", htmlRoutes);

router.use((req, res) => {
  res.status(404).send("<h1>😝 404 Error!</h1>");
});

module.exports = router;
