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
$ npm run startDev
```

### Para la ejecución
- Solicitar el archivo .env
```
$ npm start
```
    
## Endpoints
| | EMPLEADOS |
| --------| -------------- |
| **GET** | /api/empleados |
| **POST**| /api/empleados |
| **GET** | /api/empleados/[ id ] |
| **PUT** | /api/empleados/[ id ] |
| **DELETE** | /api/empleados/[ id ] |

| | CLIENTES | 
| --------| -------------- |
| **GET** | /api/clientes |
| **POST**| /api/clientes |
| **GET** | /api/clientes/[ id ] |
| **PUT** | /api/clientes/[ id ] |
| **DELETE** | /api/clientes/[ id ] |

| | PRODUCTOS |
| --------| -------------- |
| **GET** | /api/productos |
| **POST**| /api/productos |
| **GET** | /api/productos/[ id ] |
| **PUT** | /api/productos/[ id ] |
| **DELETE** | /api/productos/[ id ] |

| | PEDIDOS |
| --------| -------------- |
| **GET** | /api/pedidos |
| **POST**| /api/pedidos |
| **GET** | /api/pedidos/[ id ] |
| **PUT** | /api/pedidos/[ id ] |
| **DELETE** | /api/pedidos/[ id ] |
| **GET** | /api/pedidos/generatorPDF/[ id ] |

