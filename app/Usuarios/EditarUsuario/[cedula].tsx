import FormEdit from "@/components/FormEdit";
import UsuarioDao from "@/scripts/dao/UsuarioDao";
import Usuario from "@/scripts/model/usuario";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";


const EditarUsuario = () => {

  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const { cedula } = useLocalSearchParams();


  useEffect(() => {
    obtenerUsuario();
  }, []);

  useEffect(() => {
  }, [usuario]);


  const obtenerUsuario = async () => {

    if (typeof cedula === 'number') {

      let usuarioData = await (new UsuarioDao()).obtenerUsuario(cedula);

      setUsuario(usuarioData);
    } else if (typeof cedula === 'string') {
      let numeroCedula: number = parseInt(cedula);

      let usuarioData = await new UsuarioDao().obtenerUsuario(numeroCedula);

      setUsuario(usuarioData);
    }
  }

  const isValidDate = (dateString: string): boolean => {
    // Comprobar formato de la fecha con expresión regular (yyyy-mm-dd)
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

  const editarUsuario = async (usuario: Usuario) => {
    if (usuario !== null && usuario.nombre !== '' && usuario.apellido !== '' && isValidDate(usuario.nacimiento) && usuario.cedula != null) {
      let estado = await new UsuarioDao().modificarUsuario(usuario);

      if (estado) {
        Alert.alert("Editado correctamente.");
      } else {
        Alert.alert("Error al editar.");
      }
    }

  }


  return (
    <>
      {usuario != null ? (
        <FormEdit
          modelData={usuario}
          editFunction={editarUsuario}
          pikers={[]}
          filesInput={[]} >

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

export default EditarUsuario;