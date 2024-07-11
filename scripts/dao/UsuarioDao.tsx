import Usuario from "../model/usuario";
import * as SQLite from 'expo-sqlite';

export default class UsuarioDao{
    async crearUsuario(usuario:Usuario){
        const conexion = await SQLite.openDatabaseAsync('gym',{useNewConnection: true});
        try {
            let resultado = await conexion.runAsync(`
              INSERT INTO usuario (ci, nombre, apellido, nacimiento) VALUES (?, ?, ?, ?);
            `, [usuario.cedula, usuario.nombre, usuario.apellido, usuario.nacimiento]);
              
            return true;
            
          } catch (error:any) {
          //  console.error("Error al insertar usuario:", error.message);
            return false;
          } finally {
      
          }
    }

    async elimunarUsuario(usuario:Usuario){
        const conexion = await SQLite.openDatabaseAsync('gym',{useNewConnection: true});
        try{
            let resultado = await conexion.runAsync(`
                DELETE FROM usuario WHERE ci = ?
           `,[usuario.cedula]);
            return true;
        } catch (error:any) {
      //  console.error("Error al insertar usuario:", error.message);
        return false;
         }
    }

    async modificarUsuario(usuario:Usuario){
        const conexion = await SQLite.openDatabaseAsync('gym',{useNewConnection: true});
            try{
                const resultado = await conexion.runAsync(`
                    UPDATE usuario
                    SET nombre = ?, apellido = ?, nacimiento = ?
                    WHERE ci = ?
                `, [usuario.nombre, usuario.apellido, usuario.nacimiento, usuario.cedula]);
                return true;
            } catch (error:any) {
                 console.error("Error al insertar usuario:", error.message);
                return false;
             }


    }

    async obtenerUsuarios(){
        const conexion = await SQLite.openDatabaseAsync('gym',{useNewConnection: true});
        const usuariosConsulta:any = await conexion.getAllAsync('SELECT * FROM usuario');
        let usuarios:Usuario[] = [];
        for (const usuarioConsulta of usuariosConsulta) {
            usuarios.push(new Usuario(usuarioConsulta.ci,usuarioConsulta.nombre,usuarioConsulta.apellido,usuarioConsulta.nacimiento))
        }
        return usuarios
    }

    async obtenerUsuario(cedula:number){
        
        const conexion = await SQLite.openDatabaseAsync('gym',{useNewConnection: true});
        const usuarioConsulta:any = await conexion.getFirstAsync(`SELECT * FROM usuario WHERE ci = ?`,[cedula]);
        let usuario =  new Usuario(usuarioConsulta.ci,usuarioConsulta.nombre,usuarioConsulta.apellido,usuarioConsulta.nacimiento);
        
        return usuario;
    } 
}