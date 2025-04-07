package com.velib.velib.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class VelibController {


	    @GetMapping("/velib")
	    public String showVelibPage(Model model) {
	        model.addAttribute("ville", "Paris");			// Attribut dynamique
	        return "Velib"; // Spring va chercher Velib.html dans templates/
	    }
	    
	    @GetMapping("/arrondissement")
	    public String arrondissement() {
	        return "Velib"; 
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


// Gérer les pages 
// Les pages ne renvoient rien, revoir les routes 
// gérer le coté client avec javascript ajax /templates/component