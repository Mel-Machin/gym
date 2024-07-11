export default class Maquina{
    idMaquina:number;
    idTipoMaquina:number;
    sala:string;

    constructor(idMaquina:number,idTipoMaquina:number,sala:string){
        this.idMaquina=idMaquina;
        this.idTipoMaquina=idTipoMaquina;
        this.sala=sala;
    }
}

