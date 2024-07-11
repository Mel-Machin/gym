import UsuarioDao from '@/scripts/dao/UsuarioDao';
import Usuario from '@/scripts/model/usuario';
import { useState } from 'react';
import {View, Text, TextInput,Button, Alert} from 'react-native';
import FormCrear from '../../../components/FormCrate';
import TipoMaquina from '@/scripts/model/TipoMaquina';
import TipoMaquinaDao from '@/scripts/dao/TipomaquinaDao';

const Crear = () => {

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

    const crear = async  (tipoMaquina:TipoMaquina)=>{
        
        let esValido = true;
        for (const [clave, valor] of Object.entries(tipoMaquina)) {
            if (valor === "" || valor === null) {
                esValido = false;
              break;
            }
        }
        if(esValido){
            let estado = await new TipoMaquinaDao().crear(tipoMaquina);
            
            if(estado){
                Alert.alert("Creado correctamente");
            }else{
                Alert.alert("Error al crear");
            }
        }
        
            
    }


    return (
        <View>
            <Text>Crear tipo maquina</Text>
            <FormCrear
                modelData={new TipoMaquina(0,'','')}
                createFunction={crear}
                autoIncrement={true}
                pikers={[]}
            >
            </FormCrear>
        </View>);
        
}
 
export default Crear