
package Fundamentos.de.Analisis.de.Sistemas.controladores;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/")
public class ConcesionariaController {
    
    @GetMapping("/")
    public String concesionaria(){
        return "vista-principal.html";
    }
    
    
}
