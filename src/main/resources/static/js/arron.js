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

// Fonction pour afficher les détails d'une station dans le tableau supérieur
function afficherDetailsStation(station) {
    const tableauDetail = document.querySelector("#tableau-detail-station");
    tableauDetail.style.display = "table"; // Rendre le tableau visible

    const tbody = tableauDetail.querySelector("tbody");
    tbody.innerHTML = ""; // Vider les anciennes données

    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${station.stationcode}</td>
        <td>${station.name}</td>
        <td>${station.nom_arrondissement_communes}</td>
        <td>${station.code_insee_commune}</td>
    `;
    tbody.appendChild(row);
}
