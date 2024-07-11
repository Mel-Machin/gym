import Usuario from '@/scripts/model/usuario';
import { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, SafeAreaView, FlatList, StyleSheet, ScrollView, Modal, Image, TouchableOpacity, Alert } from 'react-native';
import UsuarioDao from '../../../scripts/dao/UsuarioDao';
import { Link } from 'expo-router';
import TablaGestion from '@/components/TablaGestion';
import MaquinaDao from '@/scripts/dao/MaquinaDao';
import Maquina from '@/scripts/model/Maquina';

const Gestion = () => {

  const [maquinas, setMaquinas] = useState<Maquina[]>([]);
  useEffect(() => {
    obtenerTodos();
  }, []);


  const obtenerTodos = async () => {
    let maquinas = await new MaquinaDao().obtenerTodos();
    setMaquinas(maquinas);
  }

  const activarEliminar = (maquina: Maquina) => {
    Alert.alert(
      "Confirmación",
      `¿Seguro que desea eliminar la máquina con el id: ${maquina.idMaquina}?`,
      [
        {
          text: "Cancelar",
          onPress: () => {
            
          },
          style: "cancel"
        },
        {
          text: "Confirmar", onPress: () => {
            eliminar(maquina);
            obtenerTodos();
          }
        }
      ],
      { cancelable: false }
    );
  }

  const eliminar = (Maquina: Maquina) => {
    let estado = new MaquinaDao().eliminar(Maquina);
  }


  return (
    <View style={styles.container}>
      {maquinas.length != 0 ? (
        <TablaGestion
          models={maquinas}
          linkEdit={"Editar/"}
          deleteFunction={eliminar}
          refrescarModelsFunction={obtenerTodos}
          tbody={["id", "tipo", "src"]}
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