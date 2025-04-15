package com.velib.velib.Controller;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;

import java.io.File;
import java.io.IOException;
import java.net.URISyntaxException;
import java.net.URL;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Controller
public class VelibController {
	
	@GetMapping("/")
	public String showVelibPage(Model model) { 
		model.addAttribute("ville", "Paris"); // Attribut dynamique 
		return "Velib"; // Spring va chercher Velib.html dans templates/ 
		} 
	
	// Ne sert pratiquement a rien 
	// Thymleaf ne reconnais pas les données récupérées du tableau principal
    @GetMapping("/arrondissement")
    public String arrondissement(Model model) {
        model.addAttribute("title", "Arrondissement");
    	model.addAttribute("ville", "Paris");

        try {
            // Charger le fichier JSON
            ObjectMapper objectMapper = new ObjectMapper();
            ClassLoader classLoader = getClass().getClassLoader();
            URL resource = classLoader.getResource("json/velib-disponibilite-en-temps-reel.json");

            if (resource == null) {
                throw new IllegalArgumentException("Le fichier JSON est introuvable");
            }

            File jsonFile = new File(resource.toURI());
            List<Map<String, Object>> arrondissements = objectMapper.readValue(
                jsonFile,
                new TypeReference<>() {} // Convertir en liste de Map
            );

            model.addAttribute("arrondissements", arrondissements);
//            System.out.println(arrondissements);

        } catch (IOException | URISyntaxException e) {
            e.printStackTrace();
            model.addAttribute("error", "Impossible de charger les données Velib");
        }

        return "Arrondissement";
    }
    
    @GetMapping("/departement")
    public String departementPage(Model model) {
        model.addAttribute("ville", "Paris");
        return "Departement"; // Departement.html" 
    }


    
    /*
     * Filtrage et affichage des stations
     * code = département 
     * Filtres des stations par leur code postale = code_insee_commune
     * */
    @GetMapping("/departement/{code}")
    @ResponseBody
    public List<Map<String, Object>> getStationsByDepartement(@PathVariable("code") String code) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            ClassLoader classLoader = getClass().getClassLoader();
            URL resource = classLoader.getResource("json/velib-disponibilite-en-temps-reel.json");

            if (resource == null) {
                throw new IllegalArgumentException("Le fichier JSON est introuvable");
            }

            File jsonFile = new File(resource.toURI());
            List<Map<String, Object>> stations = objectMapper.readValue(jsonFile, new TypeReference<>() {});

            // Filtrer les stations par code_insee_commune
            List<Map<String, Object>> filteredStations = stations.stream()
                .filter(station -> station.get("code_insee_commune") != null &&
                                   station.get("code_insee_commune").toString().startsWith(code))
                .collect(Collectors.toList());

//            System.out.println("Stations filtrées pour le département " + code + " : " + filteredStations);

            return filteredStations;

        } catch (Exception e) {
            e.printStackTrace();
            return Collections.emptyList();
        }
    }




    
    
    	
    
}
