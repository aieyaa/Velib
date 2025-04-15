/* Javascript pour la fiche département*/

document.querySelectorAll(".btn").forEach(button => {
    button.addEventListener("click", function () {
        const departement = this.getAttribute("data-departement");
    /*    console.log("Bouton cliqué pour le département :", departement); */

        fetch(`/departement/${departement}`) // retour au serveur 
            .then(response => {
                if (!response.ok) throw new Error("Erreur dans la réponse du serveur");
                return response.json();
            })
            .then(data => {
               /* console.log("Données reçues pour " + departement + " :", data); */

			   // Masquer le message par défaut
				const message = document.querySelector("#message");
				message.style.display = "none";
			   
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

                    // Ajouter un événement de clic pour afficher les détails dans le tableau supérieur
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
