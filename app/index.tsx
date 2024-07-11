import { useEffect } from "react";
import { View, Text, StyleSheet } from 'react-native';
import crearBD from "../scripts/crearBd";

const Index = () => {

    useEffect(() => {
        crearBD();
    }, []);

    return (<>
        <Text>Bienvenido al gestor Gym24.</Text>
    </>);
}

export default Index;