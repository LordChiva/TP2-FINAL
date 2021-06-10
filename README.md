# Taller de Programacion 2 - Trabajo Final 
     Grupo 12
     Alumnos: Espinola Julieta, Jamschon Martin, Mendivil Jerónimo, Perez Ariel
     Profesor: Fernandez Pablo

## Descripción
Api para la realización de pedidos en una casa de comidas. 
Permite crear , almacenar e imprimir los pedidos. 
Login de empleados con autenticación y autorización, quienes podrán registrar clientes y productos con los datos pertinentes.

## Funcionalidades 
1. Login de empleado
2. Registro de producto
3. Registro de cliente
4. Ejecución de un pedido
    - Registro de solicitud 
    - Almacenar el pedido
    - Generar y almacenar una copia en PDF
## Actores 
- Usuario final (empleado)
- Admin

## Entidades
- Cliente
- Empleado
- Producto
- Pedido

## Instrucciones técnicas

### Para la instalación de un entorno de desarrollo
```
$ git clone https://github.com/LordChiva/TP2-FINAL
$ cd ../path/to/the/file
$ npm install
```

### Para la ejecución
- Solicitar el archivo .env
```
$ npm start
```
    
## Endpoints
- /api/empleados
- /api/clientes
- /api/productos
- /api/pedidos
