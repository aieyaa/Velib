package com.velib.velib.Controller;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.io.File;
import java.io.IOException;
import java.net.URISyntaxException;
import java.net.URL;
import java.util.List;
import java.util.Map;

@Controller
public class VelibController {

    @GetMapping("/arrondissement")
    public String arrondissement(Model model) {
        model.addAttribute("title", "Arrondissement");

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
            System.out.println(arrondissements);

        } catch (IOException | URISyntaxException e) {
            e.printStackTrace();
            model.addAttribute("error", "Impossible de charger les données Velib");
        }

        return "Arrondissement";
    }
}
