//Define las rutas necesarias para cada operación del controlador
//La capa de ruta define los endpoints y mapea cada uno a su respectivo controlador
//permitiendo que las solicitudes HTTP se manejen de forma estructurada y predecible


import express from 'express';
import { body,validationResult } from 'express-validator';
//body:declara las reglas de validación sobre los campos del req. body. Devuelve un middleware.
//validationResult: lee los errores que body()acumulóen la rquest y los epone.
import {
    obtenerTodosLosSuperheroesController, crearSuperHeroeController,actualizarSuperHeroeController, 
    eliminarSuperHeroeporIdController,eliminarSuperHeroeporNombreController} 
    from '../controllers/superheroesControllers.mjs';

const router = express.Router();

//Rutas fijas:
//Todos los superheroes
//GET- Mostrar todos los superheroes
// http://localhost:3000/api/heroes
router.get('/heroes', obtenerTodosLosSuperheroesController);

//POST- Crear un superheroe (sin validacion)
//http://localhost:3000/api/heroes
// router.post('/heroes', crearSuperHeroeController);

//POST- Crear un superheroe (con validación)
//http://localhost:3000/api/heroes
router.post('/heroes', 
    body("nombreSuperHeroe")
    .trim() //validar que no tenga espacios en blanco
    .notEmpty().withMessage("Nombre de superheroe es requerido")
    .isLength({min:3, max:60}).withMessage("El nombre debe tener al menos 3 caracteres y no mas de 60 caracteres"),//isLenght permite validar longitud mínima y/o maxima

    body("nombreReal")
    .trim() //validar que no tenga espacios en blanco
    .notEmpty().withMessage("Nombre Real del superheroe es requerido")
    .isLength({min:3, max:60}).withMessage("El nombre debe tener al menos 3 caracteres y no mas de 60 caracteres"),//isLenght permite validar longitud mínima y/o maxima
    
    body("edad")
    .trim() // Elimina espacios en blanco al inicio y final
    .notEmpty().withMessage("El campo edad es requerido") // No esté vacío
    .isNumeric().withMessage("Debe ser un valor numérico") // Es numérico
    .isInt({ min: 1 }).withMessage("El valor mínimo es 1 y no se admiten negativos"),

    body("poderes")
        .isArray({min:1}).withMessage("El campo debe ser un array no vacío"),
    //valido cada elemento del array poderes
    body("poderes.*")
    .isString().withMessage("Cada elemento debe ser una cadena de texto")
    .trim()//elimina espacios en blanco
    .isLength({min:3, max:60}).withMessage("cada elemento debe tener entre 3 y 6o caracteres"),
        (req,res)=>{
        const errors=validationResult(req);
        if (!errors.isEmpty()){
            console.log(errors.array());
            return res.status(400).json({errors:errors.array()});
        }
        //si llegamos hasta aca todas las validaciones pasaron. Procesamos normalmente.
        const{nombreSuperHeroe,nombreReal,edad,poderes}=req.body;
        console.log("validación exitosa",req.body);
        res.send(req.body);
    })


    
    //crearSuperHeroeController);

//PUT- Actualizar un superheroe por id
//http://localhost:3000/api/heroes/:id
router.put('/heroes/:id', actualizarSuperHeroeController);

/********
 Requerimiento: Agregar un endpoint que al realizarle una peticion
Borre un superheroe por ID en la base de datos, y nos devuelva el superheroe borrado
*********/
//DELETE- Elimnar un superheroe por id
//http://localhost:3000/api/heroes/:id
//http://localhost:3000/api/heroes/69e00b5f98572b8f21c7876d
router.delete('/heroes/id/:id', eliminarSuperHeroeporIdController);

//DELETE- Elimnar un superheroe por nombre
router.delete('/heroes/nombre/:nombre', eliminarSuperHeroeporNombreController);


export default router;
