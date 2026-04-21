//La capa de controladores gestiona las solicitudes del cliente y llama
//a la capa de servicios para realizar las operaciones necesarias

import { obtenerTodosLosSuperheroes, crearSuperHeroe, actualizarSuperHeroe, 
    eliminarSuperHeroeporID, eliminarSuperHeroeporNombre}
    from "../services/superheroesService.mjs";

import { renderizarListaSuperheroes }
    from '../views/responseViews.mjs'

export async function obtenerTodosLosSuperheroesController(req, res) {
    try {
        const superheroes = await obtenerTodosLosSuperheroes();
        const superheroesFormateados = renderizarListaSuperheroes(superheroes);
        res.status(200).json(superheroesFormateados);

    } catch (error) {

        res.status(500).send({
            mensaje: 'Error al obtener los superheroes',
            error: error.message
        });
    }
}
export async function crearSuperHeroeController(req, res) {
    try {
        const superheroe = req.body;
        const nuevoSuperheroe = await crearSuperHeroe(superheroe);
        
        // Respondemos con el objeto creado y un código 201 (Creado)
        res.status(201).send({
            mensaje: 'Superhéroe creado con éxito',
            datos: nuevoSuperheroe
        });
    } catch (error) {
        res.status(500).send({
            mensaje: 'Error al crear el superhéroe',
            error: error.message
        });
    }
}

export async function actualizarSuperHeroeController(req, res) {
    try {
        const { id } = req.params; // Toma el ID que viene en la URL /api/heroes/:id
        const datosActualizados = req.body;
        
        const superheroe = await actualizarSuperHeroe(id, datosActualizados);

        if (!superheroe) {
            return res.status(404).send({ mensaje: "Superhéroe no encontrado" });
        }
        // Respondemos con el objeto actualizado y un código 200 (Actualizado)
        res.status(200).send({
            mensaje: 'Superhéroe actualizado con éxito',
            datos: superheroe
        });
    } catch (error) {
        res.status(500).send({
            mensaje: 'Error al actualizar el superhéroe',
            error: error.message
        });
    }
}
export async function eliminarSuperHeroeporIdController(req, res) {
    try {
        const { id } = req.params; // Toma el ID que viene en la URL /api/heroes/id/:id
        
        const superheroe = await eliminarSuperHeroeporID(id);

        if (!superheroe) {
            return res.status(404).send({ mensaje: "Superhéroe no encontrado" });
        }
        // Respondemos con el objeto actualizado y un código 200 (Actualizado)
        res.status(200).send({
            mensaje: 'Superhéroe eliminado con éxito',
            datos: superheroe
        });
    } catch (error) {
        res.status(500).send({
            mensaje: 'Error al eliminar el superhéroe',
            error: error.message
        });
    }
}
export async function eliminarSuperHeroeporNombreController(req, res) {
    try {
        const { nombre } = req.params; // Toma el nombre que viene en la URL /api/heroes/nombre/:nombre
        
        const superheroe = await eliminarSuperHeroeporNombre(nombre);

        if (!superheroe) {
            return res.status(404).send({ mensaje: "Superhéroe no encontrado" });
        }
        // Respondemos con el objeto actualizado y un código 200 (Actualizado)
        res.status(200).send({
            mensaje: 'Superhéroe eliminado con éxito',
            datos: superheroe
        });
    } catch (error) {
        res.status(500).send({
            mensaje: 'Error al eliminar el superhéroe',
            error: error.message
        });
    }
}


