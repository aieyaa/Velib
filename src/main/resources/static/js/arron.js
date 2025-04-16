/* Javascript pour la fiche arrondissement */

document.querySelectorAll(".btn").forEach(button => {
    button.addEventListener("click", function () {
        const arrondissement = this.getAttribute("data-arrondissement");
        /* console.log("Bouton cliqué pour l'arrondissement :", arrondissement); */

        fetch(`/arrondissement/${arrondissement}`) // Retour au serveur
            .then(response => {
                if (!response.ok) throw new Error("Erreur dans la réponse du serveur");
                return response.json();
            })
            .then(data => {
                /* console.log("Données reçues pour " + arrondissement + " :", data); */

                // Masquer le message par défaut
                const message = document.querySelector("#message");
                if (message) {
                    message.style.display = "none";
                }

                // Mettre à jour le tableau principal
                const tableau = document.querySelector("#tableau-stations tbody");
                tableau.innerHTML = ""; // Vider le tableau avant de le remplir
                data.forEach(station => {
                    const row = document.createElement("tr");

                    // Ajouter les détails de chaque station
                    row.innerHTML = `
                        <td>${station.stationcode}</td>
                        <td>${station.name}</td>
                        <td>${station.nom_arrondissement_communes}</td>
                        <td>${station.code_insee_commune}</td>

                    `;

                    // événement de clic 
                    row.addEventListener("click", function () {
                        afficherDetailsStation(station);
                    });

                    tableau.appendChild(row);
                });
            })
            .catch(error => console.error("Erreur :", error));
    });
});

// Fonction pour afficher les détails d'une station dans un cadre supérieur
function afficherDetailsStation(station) {
    const detailsDiv = document.querySelector("#station-details");
    detailsDiv.style.display = "block"; // Rendre le cadre visible

    // Ajouter une animation de transition
    detailsDiv.classList.add("show");

    // Insérer les détails de la station
    document.querySelector("#station-code span").textContent = station.stationcode;
    document.querySelector("#station-name span").textContent = station.name;
    document.querySelector("#station-city span").textContent = station.nom_arrondissement_communes;
    document.querySelector("#station-commune span").textContent = station.code_insee_commune;
    document.querySelector("#is-renting span").textContent = station.is_renting ? "Oui" : "Non";
    document.querySelector("#num-bikes-available span").textContent = station.numbikesavailable;
    document.querySelector("#is-installed span").textContent = station.is_installed ? "Oui" : "Non";
    document.querySelector("#num-docks-available span").textContent = station.numdocksavailable;
    document.querySelector("#is-returning span").textContent = station.is_returning ? "Oui" : "Non";
}

// Sélectionner le bouton "Fermer"
document.querySelector(".btn-close").addEventListener("click", function () {
    const detailsDiv = document.querySelector("#station-details");
    detailsDiv.style.display = "none"; // Masquer la div
});

