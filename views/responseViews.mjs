//Capa de Vistas: define las funciones de presentación de los datos, 
// organizando la información de los supeheroes en un formato estructurado

export function renderizarSuperheroe(superheroe) {
    return {
        Nombre: superheroe.nombreSuperHeroe,
        "Nombre Real": superheroe.nombreReal,
        Edad: superheroe.edad,
        "Planeta de Origen": superheroe.planetaOrigen,
        Debilidad: superheroe.debilidad,
        Poderes: superheroe.poderes,
        Aliados: superheroe.aliados,
        Enemigos: superheroe.enemigos
    };
}
export function renderizarListaSuperheroes(superheroes) {
    return superheroes.map(superheroe => renderizarSuperheroe(superheroe));
}

