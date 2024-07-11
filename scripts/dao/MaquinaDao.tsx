
import Maquina from "../model/Maquina";

import * as SQLite from 'expo-sqlite';

export default class MaquinaDao{
    async crear(maquina:Maquina){
        
        const conexion = await SQLite.openDatabaseAsync('gym',{useNewConnection: true});
        try {
            let resultado = await conexion.runAsync(`
              INSERT INTO maquina (idTipoMaquina, sala) VALUES (?, ?);
            `, [ maquina.idTipoMaquina, maquina.sala]);
            return true;
            
          } catch (error:any) {
          //  console.error("Error al insertar usuario:", error.message);
            return false;
          } finally {
      
          }
    }

    async eliminar(maquina:Maquina){
        const conexion = await SQLite.openDatabaseAsync('gym',{useNewConnection: true});
        try{
            let resultado = await conexion.runAsync(`
                DELETE FROM maquina WHERE idMaquina = ?
           `,[maquina.idMaquina]);
            return true;
        } catch (error:any) {
      //  console.error("Error al insertar usuario:", error.message);
        return false;
         }
    }

    async modificar(maquina:Maquina){
        const conexion = await SQLite.openDatabaseAsync('gym',{useNewConnection: true});
            try{
                const resultado = await conexion.runAsync(`
                    UPDATE maquina
                    SET idTipoMaquina = ?, sala = ?
                    WHERE idMaquina = ?
                `, [maquina.idTipoMaquina,maquina.sala,maquina.idMaquina]);
                return true;
            } catch (error:any) {
                
                return false;
             }


    }

    async obtenerTodos(){
        const conexion = await SQLite.openDatabaseAsync('gym',{useNewConnection: true});
        const tiposMaquinasConsulta:any = await conexion.getAllAsync('SELECT * FROM maquina');
        let maquinas:Maquina[] = [];
       
        for (const maquinaConsulta of tiposMaquinasConsulta) {
            maquinas.push(new Maquina(maquinaConsulta.idMaquina,maquinaConsulta.idTipoMaquina,maquinaConsulta.sala));
        }
        return maquinas;
    }

    async obtener(id:number){
        const conexion = await SQLite.openDatabaseAsync('gym',{useNewConnection: true});
        const maquinaConsulta:any = await conexion.getFirstAsync(`SELECT * FROM maquina WHERE idmaquina = ?`,[id]);
        let maquina =  new Maquina(maquinaConsulta.idMaquina,maquinaConsulta.idTipoMaquina,maquinaConsulta.sala)
        
        return maquina;
    } 
}