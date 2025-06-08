
# Concesionaria-F.A.S

El sistema gestiona una concesionaria de vehículos, permitiendo operaciones CRUD sobre autos, vendedores, clientes y ventas.

## Tecnologías utilizadas

- **Lenguaje:** Java 17
- **Framework:** Spring Boot 3.4.5
- **ORM:** Spring Data JPA (con Hibernate)
- **Base de datos:** MySQL
- **Gestor de dependencias:** Maven
- **Control de versiones:** Git

## Requisitos previos

- Java Development Kit (JDK) 17
- Maven 3.x
- Servidor MySQL
- IDE compatible (IntelliJ IDEA, Eclipse, VS Code)

## Instalación y ejecución

1. **Clonar el repositorio:**

   ```bash
   git clone <URL-del-repo>
   ```

2. **Crear la base de datos en MySQL:**

   ```sql
   CREATE DATABASE concesionaria;
   ```

3. **Configurar el archivo `application.properties`:**

   Ubicado en `src/main/resources/application.properties`

   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/concesionaria
   spring.datasource.username=tu_usuario
   spring.datasource.password=tu_contraseña

   

4. **Ejecutar la aplicación:**

   ```bash
   ./mvnw spring-boot:run
   ```

## Estructura del proyecto

```
src
├── main
│   ├── java
│   │   └── Fundamentos.de.Analisis.de.Sistemas
│   │       ├── controladores      # Controladores MVC para manejar las vistas
│   │       ├── modelos            # Clases entidad: Auto, Cliente, Vendedor, Venta, etc.
│   │       ├── repositorios       # Interfaces JpaRepository
│   │       └── servicios          # Lógica de negocio y reglas de validación
│   └── resources
│       ├── templates              # Vistas HTML
│       ├── static                 # Archivos CSS, JS
│       └── application.properties # Configuración principal del proyecto
└── test                           # Pruebas automatizadas (si se agregan)
```

## Funcionalidades implementadas

- ABM de:
  - Vehículos (marca, modelo, año, precio, etc.)
  - Clientes (nombre, DNI, contacto)
  - Vendedores (nombre, DNI, contacto, fecha de nacimiento)
- Listado de registros
- Formularios con validación en el servidor
- Conexión a base de datos relacional
- Interfaz web dinámica 
- Separación en capas (MVC): Controlador, Servicio, Repositorio

## Posibles mejoras futuras

- Agregar relaciones entre entidades (ventas -> cliente, vendedor, vehículo).
- Exportar reportes (PDF/Excel).
- Migrar a arquitectura REST con frontend SPA.
- Implementar autenticación (Spring Security).
- Realizar pruebas unitarias y de integración.