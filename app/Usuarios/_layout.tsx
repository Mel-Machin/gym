import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { Tabs } from 'expo-router';

export default function Layout() {

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>

      <Drawer>

        <Drawer.Screen
          name="CrearUsuario/CrearUsuario"
          options={{
            drawerLabel: 'Crear Usuario',
            title: 'Creando Usuario',
            unmountOnBlur: true
          }}
        />

        <Drawer.Screen
          name="GestionUsuarios/GestionUsuarios"
          options={{
            drawerLabel: 'Gestionar usuarios',
            title: 'Gestionando usuarios',
            unmountOnBlur: true
          }}
        />

        <Drawer.Screen
          name="EditarUsuario/[cedula]"
          options={{
            drawerLabel: 'Editar usuario',
            title: 'Editando usuarios',
            drawerItemStyle: {
              display: "none", //Oculta el elemento del menú de navegación
            },
            unmountOnBlur: true
          }}
        />

        <Drawer.Screen
          name="VerEjercicios/[cedula]"
          options={{
            drawerLabel: 'Ver ejercicios',
            title: 'Ver ejercicios',
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
