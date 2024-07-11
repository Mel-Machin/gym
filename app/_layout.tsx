import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, Tabs } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';


import { useColorScheme } from '@/hooks/useColorScheme';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'react-native';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (

    <Tabs>

      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          unmountOnBlur: true,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="Usuarios"
        options={{
          title: 'usuario',
          unmountOnBlur: true,
          headerShown: false, // Oculta la barra de navegación en esta pantalla
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="Maquinas"
        options={{
          title: 'maquinas',
          unmountOnBlur: true,
          headerShown: false, // Oculta la barra de navegación en esta pantalla
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require('../assets/iconLayout/maquinaGym.png')}
              style={{ width: size, height: size, tintColor: color }}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="Ejercicios"
        options={{
          title: 'Ejercicios',
          unmountOnBlur: true,
          headerShown: false, // Oculta la barra de navegación en esta pantalla
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require('../assets/iconLayout/ejercicioGym.png')}
              style={{ width: size, height: size, tintColor: color }}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="Rutina"
        options={{
          title: 'Rutinas',
          unmountOnBlur: true,
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require('../assets/iconLayout/rutinaGym.png')}
              style={{ width: size, height: size, tintColor: color }}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="TiposMaquinas"
        options={{
          title: 'Tipos',
          unmountOnBlur: true,
          headerShown: false, // Oculta la barra de navegación en esta pantalla
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require('../assets/iconLayout/tipoMaquinasGym.png')}
              style={{ width: size, height: size, tintColor: color }}
            />
          ),
        }}
      />

    </Tabs>
  );
}
