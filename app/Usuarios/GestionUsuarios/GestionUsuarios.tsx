import Usuario from '@/scripts/model/usuario';
import { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, SafeAreaView, FlatList, StyleSheet, ScrollView, Modal, Image, TouchableOpacity, Alert } from 'react-native';
import UsuarioDao from '../../../scripts/dao/UsuarioDao';
import { Link } from 'expo-router';
import TablaGestionUsuario from '@/components/TablaGestionUsuario';

const GestionUsuarios = () => {

  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  useEffect(() => {
    obtenerUsuarios();
  }, []);


  const obtenerUsuarios = async () => {
    let usuarios = await new UsuarioDao().obtenerUsuarios();
    setUsuarios(usuarios);
  }

  const activarEliminarUsuario = (usuario: Usuario) => {
    Alert.alert(
      "Confirmación",
      `¿Seguro que desea eliminar el usuario con la cedula: ${usuario.cedula}?`,
      [
        {
          text: "Cancelar",
          onPress: () => {
            
          },
          style: "cancel"
        },
        {
          text: "Confirmar", onPress: () => {
            eliminarUsuario(usuario);
            obtenerUsuarios();
          }
        }
      ],
      { cancelable: false }
    );
  }

  const eliminarUsuario = (usuario: Usuario) => {
    let estado = new UsuarioDao().elimunarUsuario(usuario);
  }


  return (
    <View style={styles.container}>
      {usuarios.length != 0 ? (
        <TablaGestionUsuario
          models={usuarios}
          linkEdit={"EditarUsuario/"}
          deleteFunction={eliminarUsuario}
          refrescarModelsFunction={obtenerUsuarios}
          tbody={["cedula", "nombre", "apellido", "nacimiento"]}
        >

        </TablaGestionUsuario>
      ) : <Text>Aún no se tiene datos.</Text>}


    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center', // Distribuir elementos de manera uniforme

  },
  row: {
    flex: 1,
    flexDirection: 'row',
    borderColor: '#ccc',
  },
  cell: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center'

  },
  header: {
    fontWeight: 'bold',
    backgroundColor: '#f1f8ff',
  },
});

export default GestionUsuarios;