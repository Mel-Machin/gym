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
        if(usuario !== null && usuario.nombre !== '' && usuario.apellido !== '' && isValidDate(usuario.nacimiento) && usuario.cedula != null){ // veriffica los campos del usuario no sean vacios 
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
                modelData={new Usuario(0,'','','')} // envia un modelo usuario al componente formulario crear 
                createFunction={crearUsuario} // funcion a ejecutar en el fomrulario crear 
                autoIncrement={false} // saber si tiene que incluir al primera propiedad o no 
                pikers={[]} // es para saber si una propiedad es un select, manejar las claves foraneas 
                filesInput={[]} // es para saber si una propiedad es una imagen, manejar imagenes 
                >
            </FormCrear>
        </View>
    );
}
 
export default CrearUsuario;