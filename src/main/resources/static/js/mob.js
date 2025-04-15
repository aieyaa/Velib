document.addEventListener("DOMContentLoaded", function () {
    // Récupérer le tableau des stations et celui des détails
    const stationTable = document.getElementById("stationTable");
    const detailTable = document.getElementById("tableau-detail-station");
    const detailBody = detailTable.querySelector("tbody");

    // Ajout d'événements sur chaque ligne du tableau principal
    stationTable.querySelectorAll("tbody tr").forEach(row => {
        row.addEventListener("click", function () {
            const stationCode = this.cells[0].textContent.trim();
            const stationName = this.cells[1].textContent.trim();
            const stationVille = this.cells[2].textContent.trim();
            const stationCommune = this.cells[3].textContent.trim();

            // Remplir le tableau des détails
            detailBody.innerHTML = `
                <tr>
                    <td>${stationCode}</td>
                    <td>${stationName}</td>
                    <td>${stationVille}</td>
                    <td>${stationCommune}</td>
                </tr>
            `;

            // Afficher le tableau des détails
            detailTable.style.display = "table";
        });
    });
});

// Fonction pour afficher les détails de manière modulaire (optionnel)
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
