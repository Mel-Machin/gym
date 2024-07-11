import Usuario from '@/scripts/model/usuario';
import { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, SafeAreaView, FlatList, StyleSheet, ScrollView, Modal, Image, TouchableOpacity, Alert } from 'react-native';
import UsuarioDao from '../../../scripts/dao/UsuarioDao';
import { Link } from 'expo-router';
import TablaGestion from '@/components/TablaGestion';
import MaquinaDao from '@/scripts/dao/MaquinaDao';
import Maquina from '@/scripts/model/Maquina';
import Ejercicio from '@/scripts/model/Ejercicio';
import EjercicioDao from '@/scripts/dao/EjercicioDao';
import Rutina from '@/scripts/model/Rutina';
import RutinaDao from '@/scripts/dao/RutinaDao';

const Gestion = () => {

  const [rutinas, setRutinas] = useState<Rutina[]>([]);
  useEffect(() => {
    obtenerTodos();
  }, []);

  const obtenerTodos = async () => {
    let rutinas = await new RutinaDao().obtenerTodos();
    setRutinas(rutinas);
  }

  const activarEliminar = (rutina: Rutina) => {
    Alert.alert(
      "Confirmación",
      `¿Seguro que desea eliminar la rutina con el id: ${rutina.idRutina}?`,
      [
        {
          text: "Cancelar",
          onPress: () => {
            
          },
          style: "cancel"
        },
        {
          text: "Confirmar", onPress: () => {
            eliminar(rutina);
            obtenerTodos();
          }
        }
      ],
      { cancelable: false }
    );
  }

  const eliminar = (rutina: Rutina) => {
    let estado = new RutinaDao().eliminar(rutina);
  }


  return (
    <View style={styles.container}>
      {rutinas.length != 0 ? (
        <TablaGestion
          models={rutinas}
          linkEdit={"Editar/"}
          deleteFunction={eliminar}
          refrescarModelsFunction={obtenerTodos}
          tbody={["idRutina", "ciUsuario", "tiempo","repeticiones","dia","idEjercicio"]}
        >

        </TablaGestion>
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

export default Gestion;