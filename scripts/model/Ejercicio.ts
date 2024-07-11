export default class Ejercicio{
    idEjercicio:number;
    idTipoMaquina:number;
    nombre:string;
    srcVideo:string

    constructor(idEjercicio:number,idTipoMaquina:number,nombre:string,srcVideo:string){
        this.idEjercicio=idEjercicio;
        this.idTipoMaquina=idTipoMaquina;
        this.nombre=nombre;
        this.srcVideo=srcVideo;
    }
}

