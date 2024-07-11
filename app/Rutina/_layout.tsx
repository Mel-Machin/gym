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
            title: 'Creando rutina',
            unmountOnBlur: true
          }}
        />

        <Drawer.Screen
          name="Gestion/Gestion"
          options={{
            drawerLabel: 'Gestionar',
            title: 'Gestionando rutinas',
            unmountOnBlur: true
          }}
        />

        <Drawer.Screen
          name="Editar/[id]"
          options={{
            drawerLabel: 'Editar',
            title: 'Editando rutina',
            drawerItemStyle: { //Oculta el elemento del menú de navegación
              display: "none",
            },
            unmountOnBlur: true
          }}
        />

      </Drawer>
      
    </GestureHandlerRootView>
  );
}
