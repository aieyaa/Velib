
document.getElementById("fetchButton").addEventListener("click", () => {
    fetch('/json/velib-disponibilite-en-temps-reel.json') // Assurez-vous que le chemin est correct
        .then(response => {
            if (!response.ok) {
                throw new Error("Erreur lors de la récupération du fichier JSON");
            }
            return response.json();
        })
        .then(data => {
            console.log("Données JSON récupérées :", data); // Log pour débogage

            // Remplir la liste des arrondissements
            const list = document.getElementById("arrondissementList");
            list.innerHTML = "";
            data.forEach(item => {
                const li = document.createElement("li");
                li.className = "list-group-item";
                li.textContent = item.arrondissement;
                list.appendChild(li);
            });

            // Remplir le tableau avec ID et arrondissement
            const tableBody = document.getElementById("jsonTableBody");
            tableBody.innerHTML = ""; // Vider le tableau existant
            data.forEach(item => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${item.stationcode}</td>
                    <td>${item.arrondissement}</td>
                `;
                tableBody.appendChild(row);
            });
        })
        .catch(error => {
            console.error("Erreur :", error);
        });
});


			//Fonction pour le tableau des détails
		    function showDetails(row) {
		        const stationCode = row.getAttribute("data-stationcode");
		        const name = row.getAttribute("data-name");
		        const ville = row.getAttribute("data-ville");
		        const commune = row.getAttribute("data-commune");

		        console.log("DEBUG >>>", stationCode, name, ville, commune); // debug console

		        document.getElementById("detailsStationCode").textContent = stationCode;
		        document.getElementById("detailsName").textContent = name;
		        document.getElementById("detailsVille").textContent = ville;
		        document.getElementById("detailsCommune").textContent = commune;

		        document.getElementById("stationDetailsTable").style.display = "table";
		    }
