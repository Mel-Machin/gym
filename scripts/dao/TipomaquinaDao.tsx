import TipoMaquina from "../model/TipoMaquina";
import Usuario from "../model/usuario";
import * as SQLite from 'expo-sqlite';

export default class TipoMaquinaDao{
    async crear(tipoMaquina:TipoMaquina){
        
        const conexion = await SQLite.openDatabaseAsync('gym',{useNewConnection: true});
        try {
            let resultado = await conexion.runAsync(`
              INSERT INTO tipoMaquina (tipo, srcFoto) VALUES (?, ?);
            `, [ tipoMaquina.tipo, tipoMaquina.srcFoto]);
            return true;
            
          } catch (error:any) {
          //  console.error("Error al insertar usuario:", error.message);
            return false;
          } finally {
      
          }
    }

    async eliminar(tipoMaquina:TipoMaquina){
        const conexion = await SQLite.openDatabaseAsync('gym',{useNewConnection: true});
        try{
            let resultado = await conexion.runAsync(`
                DELETE FROM TipoMaquina WHERE idTipoMaquina = ?
           `,[tipoMaquina.id]);
            return true;
        } catch (error:any) {
      //  console.error("Error al insertar usuario:", error.message);
        return false;
         }
    }

    async modificar(tipoMaquina:TipoMaquina){
        const conexion = await SQLite.openDatabaseAsync('gym',{useNewConnection: true});
            try{
                const resultado = await conexion.runAsync(`
                    UPDATE tipoMaquina
                    SET tipo = ?, srcFoto = ?
                    WHERE idTipoMaquina = ?
                `, [tipoMaquina.tipo,tipoMaquina.srcFoto,tipoMaquina.id]);
                return true;
            } catch (error:any) {
                
                return false;
             }


    }

    async obtenerTodos(){
        const conexion = await SQLite.openDatabaseAsync('gym',{useNewConnection: true});
        const tiposMaquinasConsulta:any = await conexion.getAllAsync('SELECT * FROM tipoMaquina');
        let tipoMaquinas:TipoMaquina[] = [];
       
        for (const tipoMaquinaConsulta of tiposMaquinasConsulta) {
            tipoMaquinas.push(new TipoMaquina(tipoMaquinaConsulta.idTipoMaquina,tipoMaquinaConsulta.tipo,tipoMaquinaConsulta.srcFoto));
        }
        return tipoMaquinas;
    }

    async obtener(id:number){
        const conexion = await SQLite.openDatabaseAsync('gym',{useNewConnection: true});
        const TipoMaquinaConsulta:any = await conexion.getFirstAsync(`SELECT * FROM tipoMaquina WHERE idTipoMaquina = ?`,[id]);
        let tipoMaquina =  new TipoMaquina(TipoMaquinaConsulta.idTipoMaquina,TipoMaquinaConsulta.tipo,TipoMaquinaConsulta.srcFoto);
        
        return tipoMaquina;
    } 
}