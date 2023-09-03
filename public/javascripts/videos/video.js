// Ajout d'un écouteur d'événements sur l'objet `window` pour détecter quand le contenu du DOM est entièrement chargé
window.addEventListener("DOMContentLoaded", () => {
  //Sélectionne tous les éléments avec la classe '.btn-danger'
  const elements = document.querySelectorAll(".btn-danger");

  //Sélectionne le conteneur qui affiche la list des vidéos
  const videoContainer = document.querySelector("#video-list-container");

  // Pour chaque élément avec la classe '.btn-danger'
  elements.forEach((e) => {
    // Ajoute un écouteur d'événment 'click'
    e.addEventListener("click", ($event) => {
      // Récupère l'ID de la vidéo depuis l'attribut 'videoid' de l'élément sur lequel l'utilisateur a cliqué
      const videoId = $event.target.getAttribute("videoid");
      // console.log(videoId);

      // Envoie une requête DELETE au server pour supprimer la vidéo avec l'ID correspondant
      axios
        .delete("/videos/" + videoId)
        .then(function (response) {
          //Si la requête est traitée avec succès, met à jour le conteneur de vidéos avec les nouvelles données par le serveur
          videoContainer.innerHTML = response.data;
        })
        .catch(function (err) {
          //En cas d'erreur lors de l'envoi de la requête, affiche l'erreur dans la console
          console.log(err);
        });
    });
  });
});
