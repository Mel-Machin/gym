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
import Rutina from '@/scripts/model/Rutina';
import RutinaDao from '@/scripts/dao/RutinaDao';
import DiasSemanaDao from '@/scripts/dao/DiasSemanaDao';

const Crear = () => {

    const [ejercicios,setEjercicios] = useState<Ejercicio[]>([]);
    const [usuarios,setUsuarios] = useState<Usuario[]>([]);
    const [diasSemana,setDiasSemana] = useState<object[]>([]);

    useEffect(()=>{
            obtenerUsuarios();
            obtenerEjercicio();
            obtenerDias();
        
    },[]);


    const obtenerDias = ()=>{
        let dias =  new DiasSemanaDao().obtenerTodos();
        setDiasSemana(dias);
    }

    const obtenerUsuarios = async ()=>{
        let usuarios = await new UsuarioDao().obtenerUsuarios();
        
        setUsuarios(usuarios);
    }

    const obtenerEjercicio = async ()=>{
        let ejercicios = await new EjercicioDao().obtenerTodos();
        
        setEjercicios(ejercicios);
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

    const crear = async  (rutina:Rutina)=>{
        
        let esValido = true;
        for (const [clave, valor] of Object.entries(rutina)) {
            if (valor === "" || valor === null) {
                esValido = false;
              break;
            }
        }
        if(esValido){
            let estado = await new RutinaDao().crear(rutina);
            
            if(estado){
                Alert.alert("Creado correctamente");
            }else{
                Alert.alert("Error al crear");
            }
        }   
    }


    return (
        <View>
            {ejercicios.length != 0  && usuarios.length != 0 && diasSemana.length !=0?
            (
            <FormCrear
                modelData={new Rutina(0,0,'',0,'',0)}
                createFunction={crear}
                autoIncrement={true}
                pikers={[{clave:"idEjercicio",elements:ejercicios},{clave:"ciUsuario",elements:usuarios},{clave:"dia",elements:diasSemana}]}
                filesInput={[]}
            >
            </FormCrear>
            ):<Text>Se requiere tener ejercicios y usuarios registrados.</Text>}
        </View>
    );
}
 
export default Crear