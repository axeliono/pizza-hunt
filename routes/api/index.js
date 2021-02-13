const express = require("express");
const router = express.Router();
const pizzaRoutes = require("./pizza-routes.js");
const commentRoutes = require("./comment-routes.js");

router.use("/comments", commentRoutes);
router.use("/pizza", pizzaRoutes);

module.exports = router;
