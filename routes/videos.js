// Importe le routeur Express et le modèle de tweet de Mongoose
const router = require("express").Router();

// Importe les fonctions du controllers
const {
  videoNew,
  videoList,
  videoUpload,
  videoStreaming,
  upload,
} = require("../controllers/videos.controller");

//form "upload video"
router.get("/upload", videoNew);

//show video-list
router.get("/", videoList);

//Add Video info to MongoDB and upload video to folder "uploads"
router.post("/uploadvideo", upload.single("chemin"), videoUpload);

//Streaming video
router.get("/stream/:filename", videoStreaming);

module.exports = router;
