// Importation du modèle 'Video' depuis le dossier
const Video = require("../database/models/video.model");

// Fonction pour récupérer toutes les vidéos de la base de données.
exports.getVideos = () => {
  return Video.find({}).exec();
};

// Fonction pour upload une nouvelle vidéo dans la base de données.
exports.uploadVideo = (video) => {
  const newVideo = new Video(video);
  return newVideo.save();
};
