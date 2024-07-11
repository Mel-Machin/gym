export default class Rutina{
    idRutina:number;
    ciUsuario:number;
    tiempo:string;
    repeticiones:number;
    dia:string;
    idEjercicio:number;

    constructor(idRutina:number,ciUsuario:number,tiempo:string,repeticiones:number,dia:string,idEjercicio:number){
        this.idRutina=idRutina;
        this.ciUsuario=ciUsuario;
        this.tiempo=tiempo;
        this.repeticiones=repeticiones;
        this.dia=dia;
        this.idEjercicio=idEjercicio;
    }
}

