import FormEdit from "@/components/FormEdit";
import DiasSemanaDao from "@/scripts/dao/DiasSemanaDao";
import EjercicioDao from "@/scripts/dao/EjercicioDao";
import MaquinaDao from "@/scripts/dao/MaquinaDao";
import RutinaDao from "@/scripts/dao/RutinaDao";
import TipoMaquinaDao from "@/scripts/dao/TipomaquinaDao";
import UsuarioDao from "@/scripts/dao/UsuarioDao";
import Ejercicio from "@/scripts/model/Ejercicio";
import Maquina from "@/scripts/model/Maquina";
import Rutina from "@/scripts/model/Rutina";
import TipoMaquina from "@/scripts/model/TipoMaquina";
import Usuario from "@/scripts/model/usuario";



import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";


const Editar = () => {

  const [rutina, setRutina] = useState<Rutina | null>(null);
  const { id } = useLocalSearchParams();

  const [ejercicios, setEjercicios] = useState<Ejercicio[]>([]);
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [diasSemana, setDiasSemana] = useState<object[]>([]);


  useEffect(() => {
    obtenerUsuarios();
    obtenerEjercicio();
    obtenerRutina();
    obtenerDias();

  }, []);


  const obtenerDias = () => {
    let dias = new DiasSemanaDao().obtenerTodos();
    setDiasSemana(dias);
  }

  const obtenerUsuarios = async () => {
    let usuarios = await new UsuarioDao().obtenerUsuarios();

    setUsuarios(usuarios);
  }

  const obtenerEjercicio = async () => {
    let ejercicios = await new EjercicioDao().obtenerTodos();

    setEjercicios(ejercicios);
  }

  const obtenerRutina = async () => {

    if (typeof id === 'number') {

      let rutina = await (new RutinaDao()).obtener(id);

      setRutina(rutina);
    } else if (typeof id === 'string') {
      let idNumero: number = parseInt(id);
      let rutina = await new RutinaDao().obtener(idNumero);

      setRutina(rutina);
    }
  }

  const isValidDate = (dateString: string): boolean => {
    // Comprobar formato de la fecha (yyyy-mm-dd)
    const regex = /^\d{2}-\d{2}-\d{4}$/;
    if (!regex.test(dateString)) {
      return false;
    }

    //verificar que sea una fecha valida
    const partesFecha = dateString.split('-');
    let anio = parseInt(partesFecha[2]);
    let mes = parseInt(partesFecha[1]) - 1;
    let dia = parseInt(partesFecha[0]);
    const date = new Date(anio, mes, dia);

    return date.getFullYear() == anio && (date.getMonth()) == mes && date.getDate() == dia;
  };

  const editarRutina = async (rutina: Rutina) => {
    let esValido = true;
    for (const [clave, valor] of Object.entries(rutina)) {
      if (valor === "" || valor === null) {
        esValido = false;
        break;
      }
    }
    if (esValido) {
      let estado = await new RutinaDao().modificar(rutina);

      if (estado) {
        Alert.alert("Editado correctamente.");
      } else {
        Alert.alert("Error al editar.");
      }
    }

  }


  return (
    <>
      {rutina != null && ejercicios.length != 0 && usuarios.length != 0 ? (
        <FormEdit
          modelData={rutina}
          editFunction={editarRutina}
          pikers={[{ clave: "idEjercicio", elements: ejercicios }, { clave: "ciUsuario", elements: usuarios }, { clave: "dia", elements: diasSemana }]}
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