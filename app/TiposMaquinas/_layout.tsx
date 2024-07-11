import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { Tabs } from 'expo-router';

export default function Layout() {

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>

      <Drawer>

        <Drawer.Screen
          name="Crear/Crear"
          options={{
            drawerLabel: 'Crear',
            title: 'Creando tipo maquina',
            unmountOnBlur: true
          }}
        />

        <Drawer.Screen
          name="Gestion/Gestion"
          options={{
            drawerLabel: 'Gestionar',
            title: 'Gestionando tipos maquinas',
            unmountOnBlur: true
          }}
        />

        <Drawer.Screen
          name="Editar/[id]"
          options={{
            drawerLabel: 'Editar tipo maquina',
            title: 'Editando tipo maquina',
            drawerItemStyle: {
              display: "none", //Oculta el elemento del menú de navegación
            },
            unmountOnBlur: true
          }}
        />

      </Drawer>

    </GestureHandlerRootView>
  );
}
