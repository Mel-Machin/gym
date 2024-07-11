import Usuario from '@/scripts/model/usuario';
import { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, SafeAreaView, FlatList, StyleSheet, ScrollView, Modal, Image, TouchableOpacity, Alert } from 'react-native';
import UsuarioDao from '../../../scripts/dao/UsuarioDao';
import { Link } from 'expo-router';
import TablaGestion from '@/components/TablaGestion';
import TipoMaquinaDao from '@/scripts/dao/TipomaquinaDao';
import TipoMaquina from '@/scripts/model/TipoMaquina';

const Gestion = () => {

  const [tipoMaquinas, setTipoMaquinas] = useState<TipoMaquina[]>([]);
  useEffect(() => {
    obtenerTodos();
  }, []);


  const obtenerTodos = async () => {
    let tiposMaquina = await new TipoMaquinaDao().obtenerTodos();
    setTipoMaquinas(tiposMaquina);
  }

  const activarEliminar = (tipoMaquina: TipoMaquina) => {
    Alert.alert(
      "Confirmación",
      `¿Seguro que desea eliminar el tipo maquina con el id: ${tipoMaquina.id}?`,
      [
        {
          text: "Cancelar",
          onPress: () => {
            
          },
          style: "cancel"
        },
        {
          text: "Confirmar", onPress: () => {
            eliminar(tipoMaquina);
            obtenerTodos();
          }
        }
      ],
      { cancelable: false }
    );
  }

  const eliminar = (tipoMaquina: TipoMaquina) => {
    let estado = new TipoMaquinaDao().eliminar(tipoMaquina);
  }

  
  return (
    <View style={styles.container}>
      {tipoMaquinas.length != 0 ? (
        <TablaGestion
          models={tipoMaquinas}
          linkEdit={"Editar/"}
          deleteFunction={eliminar}
          refrescarModelsFunction={obtenerTodos}
          tbody={["id", "tipo", "src"]}
        >
        </TablaGestion>
      ) :  <Text>Aún no se tiene datos.</Text>}


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