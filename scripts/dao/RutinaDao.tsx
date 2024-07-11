
import Ejercicio from "../model/Ejercicio";
import Maquina from "../model/Maquina";

import * as SQLite from 'expo-sqlite';
import Rutina from "../model/Rutina";

export default class RutinaDao{
    async crear(rutina:Rutina){
        
        const conexion = await SQLite.openDatabaseAsync('gym',{useNewConnection: true});
        try {
            let resultado = await conexion.runAsync(`
              INSERT INTO rutina (ciUsuario,tiempo,repeticiones,dia,idEjercicio) VALUES (?,?,?,?,?);
            `, [rutina.ciUsuario,rutina.tiempo,rutina.repeticiones,rutina.dia,rutina.idEjercicio]);
            return true;
            
          } catch (error:any) {
            console.error("Error al insertar usuario:", error.message);
            return false;
          } finally {
      
          }
    }

    async eliminar(rutina:Rutina){
        const conexion = await SQLite.openDatabaseAsync('gym',{useNewConnection: true});
        try{
            
            let resultado = await conexion.runAsync(`
                DELETE FROM rutina WHERE idRutina = ?
           `,[rutina.idRutina]);
            return true;
        } catch (error:any) {
      //  console.error("Error al insertar usuario:", error.message);
        return false;
         }
    }

    async modificar(rutina:Rutina){
        const conexion = await SQLite.openDatabaseAsync('gym',{useNewConnection: true});
        
            try{
                const resultado = await conexion.runAsync(`
                    UPDATE rutina
                    SET       
                    ciUsuario = ?,
                    tiempo = ?,
                    repeticiones = ?,
                    dia = ?,
                    idEjercicio = ?
                    WHERE idRutina = ?
                `, [rutina.ciUsuario,rutina.tiempo,rutina.repeticiones,rutina.dia,rutina.idEjercicio,rutina.idRutina]);
                return true;
            } catch (error:any) {
                
                return false;
             }


    }

    async obtenerTodos(){
        const conexion = await SQLite.openDatabaseAsync('gym',{useNewConnection: true});
        const rutinasConsulta:any = await conexion.getAllAsync('SELECT * FROM rutina');
        let rutinas:Rutina[] = [];
       
        for (const rutinaConsulta of rutinasConsulta) {
            rutinas.push(new Rutina(rutinaConsulta.idRutina,rutinaConsulta.ciUsuario,rutinaConsulta.tiempo,rutinaConsulta.repeticiones,rutinaConsulta.dia,rutinaConsulta.idEjercicio));
        }
        return rutinas;
    }

    async obtener(id:number){
        const conexion = await SQLite.openDatabaseAsync('gym',{useNewConnection: true});
        const rutinaConsulta:any = await conexion.getFirstAsync(`SELECT * FROM rutina WHERE idRutina = ?`,[id]);
        let rutina =  new Rutina(rutinaConsulta.idRutina,rutinaConsulta.ciUsuario,rutinaConsulta.tiempo,rutinaConsulta.repeticiones,rutinaConsulta.dia,rutinaConsulta.idEjercicio)
        return rutina;
    } 

    async obtenerRutinasUsuario(cedula:number){
        const conexion = await SQLite.openDatabaseAsync('gym',{useNewConnection: true});
        const rutinasConsulta:any = await conexion.getAllAsync('SELECT * FROM rutina WHERE ciUsuario = ?',[cedula]);
        let rutinas:Rutina[] = [];
       
        for (const rutinaConsulta of rutinasConsulta) {
            rutinas.push(new Rutina(rutinaConsulta.idRutina,rutinaConsulta.ciUsuario,rutinaConsulta.tiempo,rutinaConsulta.repeticiones,rutinaConsulta.dia,rutinaConsulta.idEjercicio));
        }
        return rutinas;
    }
}