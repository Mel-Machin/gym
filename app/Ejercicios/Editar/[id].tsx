import FormEdit from "@/components/FormEdit";
import EjercicioDao from "@/scripts/dao/EjercicioDao";
import MaquinaDao from "@/scripts/dao/MaquinaDao";
import TipoMaquinaDao from "@/scripts/dao/TipomaquinaDao";
import Ejercicio from "@/scripts/model/Ejercicio";
import Maquina from "@/scripts/model/Maquina";
import TipoMaquina from "@/scripts/model/TipoMaquina";



import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";


const Editar = () => {

    const [ejercicio, setEjercicio] = useState<Ejercicio | null>(null);
    const { id } = useLocalSearchParams();

    const [tiposMaquinas,setTiposMaquinas] = useState<TipoMaquina[]>([]);

    useEffect(()=>{
            obtenerTiposMaquinas();
        
    },[]);

  useEffect(()=>{
        
      obtenerEjercicio();
    },[]);


    const obtenerTiposMaquinas = async ()=>{
        let tiposMaquinasData = await new TipoMaquinaDao().obtenerTodos();
        setTiposMaquinas(tiposMaquinasData);
    }

    const obtenerEjercicio = async ()=>{
      
        if(typeof id === 'number') {
        
            let ejercicioData = await  (new EjercicioDao()).obtener(id);
            
            setEjercicio(ejercicioData);
        }else if(typeof id === 'string'){
          let idNumero:number = parseInt(id);
          let ejercicioData = await new EjercicioDao().obtener(idNumero);
          setEjercicio(ejercicioData);
        }
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

    const editarEjercicio = async(ejercicio:Ejercicio)=>{
      let esValido = true;
      for (const [clave, valor] of Object.entries(ejercicio)) {
          if (valor === "" || valor === null) {
              esValido = false;
            break;
          }
      }
      if(esValido){
        let estado = await new EjercicioDao().modificar(ejercicio);
        
        if(estado){
            Alert.alert("Editado correctamente.");
        }else{
            Alert.alert("Error al editar.");
        }
    }        
    }


    return (
      <>
        {ejercicio!=null && tiposMaquinas.length != 0 ?(
        <FormEdit
        modelData={ejercicio}
        editFunction={editarEjercicio}
        pikers={[{clave:"idTipoMaquina",elements:tiposMaquinas}]}
        filesInput={[]}
        >
        </FormEdit>) : null}
      </>
      );

}


const styles = StyleSheet.create({
    container: {
      padding: 20,
      backgroundColor: "#fff",
      borderRadius: 5,
      borderWidth: 1,
      borderColor: "#ccc",
      marginBottom: 10,
    },
    inputContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginVertical: 5,
    },
    input: {
      flex: 1,
      height: 40,
      borderWidth: 1,
      borderColor: "#ccc",
      paddingHorizontal: 10,
      marginLeft: 10,
      borderRadius: 5,
    },
  });
 
export default Editar;