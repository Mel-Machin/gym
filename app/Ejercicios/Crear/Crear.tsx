import UsuarioDao from '@/scripts/dao/UsuarioDao';
import Usuario from '@/scripts/model/usuario';
import { useEffect, useState } from 'react';
import {View, Text, TextInput,Button, Alert} from 'react-native';
import FormCrear from '../../../components/FormCrate';

import Maquina from '@/scripts/model/Maquina';
import MaquinaDao from '@/scripts/dao/MaquinaDao';
import TipoMaquina from '@/scripts/model/TipoMaquina';
import TipoMaquinaDao from '@/scripts/dao/TipomaquinaDao';
import Ejercicio from '@/scripts/model/Ejercicio';
import EjercicioDao from '@/scripts/dao/EjercicioDao';

const Crear = () => {

    const [tiposMaquinas,setTiposMaquinas] = useState<TipoMaquina[]>([]);

    useEffect(()=>{
            obtenerTiposMaquinas();
        
    },[]);

    
    const obtenerTiposMaquinas = async ()=>{
        let tiposMaquinasData = await new TipoMaquinaDao().obtenerTodos();
        setTiposMaquinas(tiposMaquinasData);
    }

    const isValidDate = (dateString:string):boolean => {
        // Comprobar formato de la fecha (yyyy-mm-dd)
        const regex = /^\d{2}-\d{2}-\d{4}$/;
        if (!regex.test(dateString)) {
          return false;
        }


        //verificar que sea una fecha valida
        const partesFecha = dateString.split('-');
        let anio = parseInt(partesFecha[2]);
        let mes = parseInt(partesFecha[1]) -1;
        let dia = parseInt(partesFecha[0]);
        const date = new Date(anio, mes, dia);

      
        return date.getFullYear() == anio && (date.getMonth()) == mes && date.getDate() == dia;
    };

    const crear = async  (ejercicio:Ejercicio)=>{
        
        let esValido = true;
        for (const [clave, valor] of Object.entries(ejercicio)) {
            if (valor === "" || valor === null) {
                esValido = false;
              break;
            }
        }
        if(esValido){
            let estado = await new EjercicioDao().crear(ejercicio);
            
            if(estado){
                Alert.alert("Creado correctamente");
            }else{
                Alert.alert("Error al crear");
            }
        }
        
            
    }


    return (
        <View>
            {tiposMaquinas.length != 0 ?
            ( 
            <FormCrear
                modelData={new Ejercicio(0,0,'','')}
                createFunction={crear}
                autoIncrement={true}
                pikers={[{clave:"idTipoMaquina",elements:tiposMaquinas}]}
                filesInput={[]}
            >
            </FormCrear>
            ):<Text>Se requiere tener Tipos de maquinas registradas.</Text>}
        </View>
    );
}
   
export default Crear