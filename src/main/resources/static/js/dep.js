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
    const cadreDetail = document.querySelector("#cadre-detail-station");
    cadreDetail.style.display = "block"; // Rendre le cadre visible

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

function fermerCadre() {
    const cadreDetail = document.querySelector("#cadre-detail-station");
    cadreDetail.style.display = "none"; // Masquer le cadre
}
