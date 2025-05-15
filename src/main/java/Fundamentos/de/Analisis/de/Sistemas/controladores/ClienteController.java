
package Fundamentos.de.Analisis.de.Sistemas.controladores;

import Fundamentos.de.Analisis.de.Sistemas.modelos.Cliente;
import Fundamentos.de.Analisis.de.Sistemas.servicios.ClienteServicio;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;

@Controller
@RequestMapping("/clientes")
public class ClienteController {
    
    @Autowired
    private ClienteServicio clienteServicio;
    
    @GetMapping ("/nuevo")
    public String mostrarFormularioCliente(Model model){
        model.addAttribute("cliente",new Cliente());
        return "formulario-cargar-cliente";
    }
    @GetMapping("/guardar")
    public String guardarCliente(@ModelAttribute Cliente cliente){
        clienteServicio.guardarCliente(cliente);
        return "redirect:/clientes/listar";
    }
    
    @GetMapping("/listar")
    public String listarClientes(Model model){
        model.addAttribute("clientes",clienteServicio.obtenerTodos());
        return "lista-clientes";
    }
    
}
