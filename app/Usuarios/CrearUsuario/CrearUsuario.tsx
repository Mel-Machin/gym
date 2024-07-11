import UsuarioDao from '@/scripts/dao/UsuarioDao';
import Usuario from '@/scripts/model/usuario';
import { useState } from 'react';
import {View, Text, TextInput,Button, Alert} from 'react-native';
import FormCrear from '../../../components/FormCrate';

const CrearUsuario = () => {

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

    const crearUsuario = async  (usuario:Usuario)=>{
        if(usuario !== null && usuario.nombre !== '' && usuario.apellido !== '' && isValidDate(usuario.nacimiento) && usuario.cedula != null){
            let estado = await new UsuarioDao().crearUsuario(usuario);
            if(estado){
                Alert.alert("Creado correctamente");
            }else{
                Alert.alert("Error al crear");
            }
        }
            
    }

    
    return (
        <View>
            <FormCrear
                modelData={new Usuario(0,'','','')}
                createFunction={crearUsuario}
                autoIncrement={false}
                pikers={[]}
                filesInput={[]}
                >
            </FormCrear>
        </View>
    );
}
 
export default CrearUsuario;