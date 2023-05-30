
# Test Suti

Este proyecto es una aplicación Angular que muestra una tabla de empleados con opciones de búsqueda, ordenamiento y paginación. A continuación, se detallan las diferentes partes del proyecto y sus funcionalidades.

## Estructura del Proyecto

El proyecto está estructurado de la siguiente manera:

- **app.component.ts**: Componente raíz de la aplicación.
- **app.module.ts**: Módulo principal de la aplicación.
- **app-routing.module.ts**: Módulo de enrutamiento para la aplicación.
- **employe-table**: Carpeta que contiene los archivos relacionados con la tabla de empleados.
  - **employe-table.component.ts**: Componente que muestra la tabla de empleados y maneja las funcionalidades.
  - **employe-table.component.html**: Plantilla HTML para el componente de la tabla de empleados.
  - **employe-table.component.scss**: Estilos SCSS para el componente de la tabla de empleados.
- **models**: Carpeta que contiene las interfaces de datos.
- **services**: Carpeta que contiene los servicios para obtener los datos de los empleados.

## Funcionalidades Principales

### Tabla de Empleados

La tabla de empleados muestra los siguientes campos para cada empleado:

- ID
- First Name
- Last Name
- Email
- Gender
- Date In

Los empleados se cargan desde un servicio y se muestran en la tabla.

### Búsqueda por Nombre

La función de búsqueda permite filtrar los empleados por su nombre. Para realizar la búsqueda, se ingresa un término en el campo de búsqueda y se presiona Enter. Los empleados que coincidan con el término de búsqueda se mostrarán en la tabla.

### Ordenamiento por Nombre o ID

Se pueden ordenar los empleados por nombre o por ID. Al hacer clic en los botones "Ordenar por Nombre" o "Ordenar por ID", la tabla se actualizará para mostrar los empleados ordenados según la opción seleccionada.

### Paginación

La tabla de empleados utiliza la paginación para mostrar solo un número limitado de empleados por página. Los botones "Anterior" y "Siguiente" permiten navegar entre las diferentes páginas de empleados.

## Código Relevante

A continuación, se muestran fragmentos de código relevantes para entender algunas de las funcionalidades clave del proyecto:

### Filtrado de Empleados

```typescript
// Filtra los empleados según el término de búsqueda
filterEmployees(): Employee[] {
  return this.employees.filter((employee: Employee) => {
    const fullName = `${employee.first_name} ${employee.last_name}`.toLowerCase();
    return fullName.includes(this.searchTerm.toLowerCase());
  });
}
```
### Ordenamiento de Empleados
```typescript
// Ordena los empleados si se selecciona la opción de ordenamiento por nombre o ID
sortEmployees(employees: Employee[]): Employee[] {
  if (this.sortByName) {
    return employees.sort((a, b) => a.first_name.localeCompare(b.first_name));
  } else if (this.sortByID) {
    return employees.sort((a, b) => a.id - b.id);
  } else {
    return employees;
  }
}
```
### Paginación de Empleados
```typescript
// Establece los empleados filtrados para mostrar en la página actual
getPageItems(employees: Employee[]): Employee[] {
  const startIndex = (this.currentPage - 1) * this.pageSize;
  const endIndex = startIndex + this.pageSize;
  return employees.slice(startIndex, endIndex);
}
```

## Ejecución del Proyecto

Para ejecutar el proyecto, se deben seguir los siguientes pasos:

1. Clonar el repositorio del proyecto.
2. Navegar a la carpeta raíz del proyecto.
3. Ejecutar el comando `npm install` para instalar las dependencias.
4. Ejecutar el comando `npm start` para iniciar la aplicación.
5. Abrir un navegador y acceder a la URL `http://localhost:4200`.

