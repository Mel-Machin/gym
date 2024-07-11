export default class Usuario{
    cedula:number;
    nombre:string;
    apellido:string;
    nacimiento:string;

    constructor(cedula:number,nombre:string,apellido:string,nacimiento:string){
        this.cedula=cedula;
        this.nombre=nombre;
        this.apellido=apellido;
        this.nacimiento=nacimiento;
    }
}

