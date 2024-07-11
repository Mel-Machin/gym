import Usuario from '@/scripts/model/usuario';
import { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, SafeAreaView, FlatList, StyleSheet, ScrollView, Modal, Image, TouchableOpacity, Alert } from 'react-native';
import UsuarioDao from '../../../scripts/dao/UsuarioDao';
import { Link, useLocalSearchParams } from 'expo-router';
import TablaGestion from '@/components/TablaGestion';
import Rutina from '@/scripts/model/Rutina';
import RutinaDao from '@/scripts/dao/RutinaDao';
import DiasSemanaDao from '@/scripts/dao/DiasSemanaDao';
import { Grid,Row,Col } from 'react-native-easy-grid';



const VerEjercicios = () => {

    const [usuario, setUsuario] = useState<Usuario | null>(null);
    const { cedula } = useLocalSearchParams();
    const [rutinas, setRutinas] = useState<Rutina[]>([]);
    const [diasSemana, setDiasSemana] = useState<any[]>([]);

    useEffect(() => {
        
        obtenerUsuario();
        obtenerRutinasUsuario();
        obtenerDiasSemana();
    }, []);

    useEffect(() => {
        
    }, [usuario]);

    const obtenerRutinasUsuario = async () => {
        if (typeof cedula === 'number') {
            let rutinas = await new RutinaDao().obtenerRutinasUsuario(cedula);
            setRutinas(rutinas);
        } else if (typeof cedula === 'string') {
            let numeroCedula: number = parseInt(cedula);
            let rutinas = await new RutinaDao().obtenerRutinasUsuario(numeroCedula);
            setRutinas(rutinas);
        }

    }

    const obtenerDiasSemana = () => {
        let diasSemana = new DiasSemanaDao().obtenerTodos();
        setDiasSemana(diasSemana);

    }



    const obtenerUsuario = async () => {

        if (typeof cedula === 'number') {

            let usuarioData = await (new UsuarioDao()).obtenerUsuario(cedula);
            
            setUsuario(usuarioData);
        } else if (typeof cedula === 'string') {
            let numeroCedula: number = parseInt(cedula);
            
            let usuarioData = await new UsuarioDao().obtenerUsuario(numeroCedula);
            
            setUsuario(usuarioData);
        }
    }

    return (
        <> 
            <Text>{usuario?.nombre}</Text>
            <ScrollView>
                {diasSemana.map( (diaSemana,index) => (
                <View key={index}>
                    <Text>
                        {diaSemana.dia}
                    </Text>
                    <Grid>
                    <Row>
                        <Col><Text>ID Ejercicio</Text></Col>
                        <Col><Text>Repeticiones</Text></Col>
                        <Col><Text>Tiempo</Text></Col>
                     </Row>
                        {rutinas.filter( rutina => rutina.dia==diaSemana.dia).map( (rutina,index) => (
                            <Row key={rutina.idEjercicio + "|" + diaSemana.dia + "|" + index}>
                                <Col><Text>{rutina.idEjercicio}</Text></Col>
                                <Col><Text>{rutina.repeticiones}</Text></Col>
                                <Col><Text>{rutina.tiempo}</Text></Col>
                            </Row>
                        ))}

                    </Grid>
                </View>
                ))}
            </ScrollView>
        </>

    );
}

export default VerEjercicios;