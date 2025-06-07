package Fundamentos.de.Analisis.de.Sistemas;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
// Importa las clases necesarias de Spring Boot

@SpringBootApplication
// Esta anotación indica que es una aplicación Spring Boot.
// Combina @Configuration, @EnableAutoConfiguration y @ComponentScan

public class ProyectoConcesionariaApplication {

	public static void main(String[] args) {
                
		SpringApplication.run(ProyectoConcesionariaApplication.class, args);
                // Ejecuta la aplicación Spring Boot
	}

}
