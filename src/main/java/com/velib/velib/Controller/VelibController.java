package com.velib.velib.Controller;

import java.io.File;
import java.io.IOException;
import java.net.URISyntaxException;
import java.net.URL;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import com.fasterxml.jackson.databind.ObjectMapper;

@Controller
public class VelibController {


	    @GetMapping("/")
	    public String showVelibPage(Model model) {
	        model.addAttribute("ville", "Paris");			// Attribut dynamique
	        return "Velib"; // Spring va chercher Velib.html dans templates/
	    }
	    
	    @GetMapping("/arrondissement")
	    public String arrondissement(Model model) throws URISyntaxException {
	        model.addAttribute("title", "Arrondissement");
	        model.addAttribute("ville", "Paris");

	        try {
	            ObjectMapper objectMapper = new ObjectMapper();
	            ClassLoader classLoader = getClass().getClassLoader();
	            URL resource = classLoader.getResource("json/velib-disponibilite-en-temps-reel.json");

	            if (resource == null) {
	                throw new IllegalArgumentException("Le fichier JSON est introuvable dans le classpath");
	            }

	            File jsonFile = new File(resource.toURI());
	            List<Map<String, String>> arrondissements = objectMapper.readValue(jsonFile, List.class);
	            model.addAttribute("arrondissements", arrondissements);

	        } catch (IOException e) {
	            e.printStackTrace();
	            model.addAttribute("error", "Impossible de lire le fichier JSON");
	        }

	        return "Arrondissement";
	    }

	    
	    @GetMapping("/departement")
	    public String departement() {
	        return "Velib"; 
	    }
	    
	    @GetMapping("/mobile")
	    public String mobile() {
	        return "Velib"; 
	    }
	}

