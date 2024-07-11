import FormEdit from "@/components/FormEdit";
import TipoMaquinaDao from "@/scripts/dao/TipomaquinaDao";
import TipoMaquina from "@/scripts/model/TipoMaquina";

import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";


const Editar = () => {

  const [tipoMaquina, setTipoMaquina] = useState<TipoMaquina | null>(null);
  const { id } = useLocalSearchParams();

  useEffect(() => {
    obtenertipoMaquina();
  }, []);

  useEffect(() => {
  }, [tipoMaquina]);


  const obtenertipoMaquina = async () => {

    if (typeof id === 'number') {

      let tipoMaquinaData = await (new TipoMaquinaDao()).obtener(id);
      setTipoMaquina(tipoMaquinaData);
    } else if (typeof id === 'string') {
      let numeroCedula: number = parseInt(id);
      let tipoMaquinaData = await new TipoMaquinaDao().obtener(numeroCedula);
      setTipoMaquina(tipoMaquinaData);
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

  const editartipoMaquina = async (tipoMaquina: TipoMaquina) => {
    let esValido = true;
    for (const [clave, valor] of Object.entries(tipoMaquina)) {
      if (valor === "" || valor === null) {
        esValido = false;
        break;
      }
    }
    if (esValido) {
      let estado = await new TipoMaquinaDao().modificar(tipoMaquina);

      if (estado) {
        Alert.alert("Editado correctamente.");
      } else {
        Alert.alert("Error al editar.");
      }
    }

  }


  return (
    <>
      {tipoMaquina != null ? (
        <FormEdit
          modelData={tipoMaquina}
          editFunction={editartipoMaquina}
          pikers={[]}>
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