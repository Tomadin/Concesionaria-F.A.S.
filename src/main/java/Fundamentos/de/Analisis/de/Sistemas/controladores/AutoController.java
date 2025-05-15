
package Fundamentos.de.Analisis.de.Sistemas.controladores;

import Fundamentos.de.Analisis.de.Sistemas.modelos.Auto;
import Fundamentos.de.Analisis.de.Sistemas.servicios.AutoServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;


@Controller
@RequestMapping("/autos")
public class AutoController {
    
    @Autowired
    private AutoServicio autoServicio;
    
    @GetMapping("/nuevo")
    public String mostrarFormularioAuto(Model model){
        model.addAttribute("auto",new Auto());
        return "formulario-cargar-vehiculo";
    }
    
    @PostMapping("/guardar")
    public String guardarAuto(@ModelAttribute Auto auto){
        autoServicio.guardarAuto(auto);
        return "redirect:/autos/listar";
        
    }
    @GetMapping("/listar")
    
    public String listarAutos(Model model){
        model.addAttribute("autos",autoServicio.obtenerTodos());
        return "lista-autos";
    }
}
