//Implementa los metodos definidos en la Interfaz,
//interactuando directamente con MongoDB a traves de Mongoose

import SuperHero from '../models/SuperHero.mjs';
import IRepository from './IRepository.mjs'

class SuperHeroRepository extends IRepository {
    async obtenerTodos() {
        return await SuperHero.find({});
    }
    async crearSuperHeroe(datosHeroe) {
        try {
            // Usamos 'datosHeroe' que es lo que recibe la función
            const nuevoSuperheroe = new SuperHero(datosHeroe);

            // Lo guardamos en MongoDB
            console.log('Superheroe creado con exito');
            console.log(datosHeroe);
            return await nuevoSuperheroe.save();

        } catch (error) {
            // Es buena idea imprimir el error real en consola para debuguear
            console.error("Error en Repository:", error);
            throw new Error('Error al guardar el superhéroe en la base de datos');
        }
        
    }
    async actualizarSuperHeroe(id, datosActualizados) { 
        try {
            return await SuperHero.findByIdAndUpdate(
                id, 
                { $set: datosActualizados }, 
                { new: true } // { new: true } sirve para que nos devuelva el objeto ya modificado
            );
        } catch (error) {
             throw new Error('Error al actualizar el superhéroe en la base de datos');
        }
    }
    async eliminarSuperHeroeporID(id) { 
        try {
            return await SuperHero.findByIdAndDelete(id);
        } catch (error) {
             throw new Error('Error al eliminar el superhéroe en la base de datos');
        }
    }
    async eliminarSuperHeroeporNombre(nombre) { 
        try {
            return await SuperHero.findOneAndDelete({ nombreSuperHeroe: nombre });
        } catch (error) {
             throw new Error('Error al eliminar el superhéroe en la base de datos');
        }
    }

} 

export default new SuperHeroRepository();


