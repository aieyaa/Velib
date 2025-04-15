// Charger les données JSON au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    loadJsonData(); // Charger et afficher les données JSON
});



// Charger le fichier JSON et peupler le tableau principal
function loadJsonData() {
    fetch('/json/velib-disponibilite-en-temps-reel.json') // Chemin vers le fichier JSON
        .then(response => {
            if (!response.ok) {
                throw new Error('Erreur lors du chargement du fichier JSON');
            }
            return response.json();
        })
        .then(data => {
            console.log('Données JSON chargées avec succès :', data);
            populateTable(data); // Appeler la fonction pour remplir le tableau principal
        })
        .catch(error => console.error('Erreur JSON :', error));
}

// Fonction pour remplir le tableau principal
function populateTable(data) {
    const tableBody = document.querySelector('#stationTable tbody'); // Sélectionner le tbody du tableau principal
    tableBody.innerHTML = ''; // Réinitialiser le contenu du tableau

    data.forEach(item => {
        const row = document.createElement('tr'); // Créer une ligne pour chaque station
        row.setAttribute('data-stationcode', item.stationcode);
        row.setAttribute('data-name', item.name);
        row.setAttribute('data-ville', item.nom_arrondissement_communes);
        row.setAttribute('data-commune', item.code_insee_commune);

        // Remplir la ligne avec les données JSON
        row.innerHTML = `
            <td>${item.stationcode}</td>
            <td>${item.name}</td>
            <td>${item.nom_arrondissement_communes}</td>
            <td>${item.code_insee_commune}</td>
        `;
        row.addEventListener('click', () => showDetails(row)); // Ajouter un événement de clic pour afficher les détails
        tableBody.appendChild(row); // Ajouter la ligne au tableau
    });
}

// Fonction pour afficher les détails dans le tableau au-dessus
function showDetails(row) {
    const stationCode = row.dataset.stationcode;
    const name = row.dataset.name;
    const ville = row.dataset.ville;
    const commune = row.dataset.commune;

    console.log("Station sélectionnée :", { stationCode, name, ville, commune });

    // Mettre à jour le tableau des détails
    document.getElementById("detailsStationCode").textContent = stationCode || "Non disponible";
    document.getElementById("detailsName").textContent = name || "Non disponible";
    document.getElementById("detailsVille").textContent = ville || "Non disponible";
    document.getElementById("detailsCommune").textContent = commune || "Non disponible";

    // Afficher le tableau des détails
    document.getElementById("stationDetailsTable").style.display = "table";
}

