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

const Gestion = () => {

  const [ejercicios, setEjercicios] = useState<Ejercicio[]>([]);
  useEffect(() => {
    obtenerTodos();
  }, []);

  const obtenerTodos = async () => {
    let ejercicios = await new EjercicioDao().obtenerTodos();
    setEjercicios(ejercicios);
  }

  const activarEliminar = (ejercicio: Ejercicio) => {
    Alert.alert(
      "Confirmación",
      `¿Seguro que desea eliminar el ejercicio con el id: ${ejercicio.idEjercicio}?`,
      [
        {
          text: "Cancelar",
          onPress: () => {
            
          },
          style: "cancel"
        },
        {
          text: "Confirmar", onPress: () => {
            eliminar(ejercicio);
            obtenerTodos();
          }
        }
      ],
      { cancelable: false }
    );
  }

  const eliminar = (ejercicio: Ejercicio) => {
    let estado = new EjercicioDao().eliminar(ejercicio);
  }


  return (
    <View style={styles.container}>
      {ejercicios.length != 0 ? (
        <TablaGestion
          models={ejercicios}
          linkEdit={"Editar/"}
          deleteFunction={eliminar}
          refrescarModelsFunction={obtenerTodos}
          tbody={["idEjercicio", "idTipoMaquina", "nombre","srcVideo"]}
          filesInput={[]}
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
    justifyContent: 'center',

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