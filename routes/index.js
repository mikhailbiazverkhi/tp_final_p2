const router = require("express").Router();
const videos = require("./videos");

router.use("/videos", videos);

router.get("/", (req, res) => {
  res.redirect("/videos");
});

module.exports = router;
