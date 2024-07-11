
import * as SQLite from 'expo-sqlite';
      
export default async function crearBD(){


    const db = await SQLite.openDatabaseAsync('gym',{
        useNewConnection: true
    });

    await db.execAsync(`
        PRAGMA journal_mode = WAL;

        CREATE TABLE IF NOT EXISTS ejercicio (
            nombre TEXT NOT NULL,
            idEjercicio INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
            idTipoMaquina INTEGER NOT NULL,
            srcVideo TEXT NOT NULL,
            FOREIGN KEY (idTipoMaquina) REFERENCES tipomaquina (idTipoMaquina) ON DELETE CASCADE ON UPDATE CASCADE
        );

        CREATE TABLE IF NOT EXISTS maquina (
            idMaquina INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
            idTipoMaquina INTEGER NOT NULL,
            sala TEXT NOT NULL,
            FOREIGN KEY (idTipoMaquina) REFERENCES tipomaquina (idTipoMaquina) ON DELETE CASCADE ON UPDATE CASCADE
        );

        CREATE TABLE IF NOT EXISTS rutina (
            idRutina INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
            ciUsuario INTEGER NOT NULL,
            tiempo TEXT NOT NULL, -- Aquí podría considerarse el uso de TEXT para representar tiempos
            repeticiones INTEGER NOT NULL,
            dia TEXT NOT NULL,
            idEjercicio INTEGER NOT NULL,
            FOREIGN KEY (idEjercicio) REFERENCES ejercicio (idEjercicio) ON DELETE CASCADE ON UPDATE CASCADE,
            FOREIGN KEY (ciUsuario) REFERENCES usuario (ci) ON DELETE CASCADE ON UPDATE CASCADE
        );

        CREATE TABLE IF NOT EXISTS tipomaquina (
            idTipoMaquina INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
            tipo TEXT NOT NULL,
            srcFoto TEXT NOT NULL
        );

        CREATE TABLE IF NOT EXISTS usuario (
            ci INTEGER PRIMARY KEY NOT NULL,
            nombre TEXT NOT NULL,
            apellido TEXT NOT NULL,
            nacimiento TEXT NOT NULL
        );

        `);




      
}

