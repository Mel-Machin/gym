
import Ejercicio from "../model/Ejercicio";
import Maquina from "../model/Maquina";

import * as SQLite from 'expo-sqlite';

export default class EjercicioDao{
    async crear(ejercicio:Ejercicio){
        
        const conexion = await SQLite.openDatabaseAsync('gym',{useNewConnection: true});
        try {
            let resultado = await conexion.runAsync(`
              INSERT INTO ejercicio (nombre,idTipoMaquina,srcVideo) VALUES (?, ?,?);
            `, [ejercicio.nombre,ejercicio.idTipoMaquina,ejercicio.srcVideo]);
            return true;
            
          } catch (error:any) {
          //  console.error("Error al insertar usuario:", error.message);
            return false;
          } finally {
      
          }
    }

    async eliminar(ejercicio:Ejercicio){
        const conexion = await SQLite.openDatabaseAsync('gym',{useNewConnection: true});
        try{
            
            let resultado = await conexion.runAsync(`
                DELETE FROM ejercicio WHERE idEjercicio = ?
           `,[ejercicio.idEjercicio]);
            return true;
        } catch (error:any) {
      //  console.error("Error al insertar usuario:", error.message);
        return false;
         }
    }

    async modificar(ejercicio:Ejercicio){
        const conexion = await SQLite.openDatabaseAsync('gym',{useNewConnection: true});
        
            try{
                const resultado = await conexion.runAsync(`
                    UPDATE ejercicio
                    SET 
                    nombre = ?,
                    idTipoMaquina = ?,
                    srcVideo = ?
                    WHERE idEjercicio = ?
                `, [ejercicio.nombre,ejercicio.idTipoMaquina,ejercicio.srcVideo,ejercicio.idEjercicio]);
                return true;
            } catch (error:any) {
                
                return false;
             }


    }

    async obtenerTodos(){
        const conexion = await SQLite.openDatabaseAsync('gym',{useNewConnection: true});
        const ejerciciosConsulta:any = await conexion.getAllAsync('SELECT * FROM ejercicio');
        let ejercicios:Ejercicio[] = [];
       
        for (const ejercicioConsulta of ejerciciosConsulta) {
            ejercicios.push(new Ejercicio(ejercicioConsulta.idEjercicio,ejercicioConsulta.idTipoMaquina,ejercicioConsulta.nombre,ejercicioConsulta.srcVideo));
        }
        return ejercicios;
    }

    async obtener(id:number){
        const conexion = await SQLite.openDatabaseAsync('gym',{useNewConnection: true});
        const ejercicioConsulta:any = await conexion.getFirstAsync(`SELECT * FROM ejercicio WHERE idEjercicio = ?`,[id]);
        let ejercicio =  new Ejercicio(ejercicioConsulta.idEjercicio,ejercicioConsulta.idTipoMaquina,ejercicioConsulta.nombre,ejercicioConsulta.srcVideo);
        
        return ejercicio;
    } 
}