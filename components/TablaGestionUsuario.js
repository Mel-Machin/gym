import Usuario from '@/scripts/model/usuario';
import { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, SafeAreaView, FlatList, StyleSheet, ScrollView, Modal, Image, TouchableOpacity, Alert } from 'react-native';
import { Link } from 'expo-router';
import { Col, Grid, Row } from 'react-native-easy-grid';

const TablaGestionUsuario = ({ models, linkEdit, deleteFunction, refrescarModelsFunction, tbody }) => {

    const activarEliminar = (model) => {
        Alert.alert(
            "Confirmación",
            `¿Seguro que desea eliminar?`,
            [
                {
                    text: "Cancelar",
                    onPress: () => {
                    },
                    style: "cancel"
                },
                {
                    text: "Confirmar", onPress: () => {
                        deleteFunction(model);
                        refrescarModelsFunction();
                    }
                }
            ],
            { cancelable: false }
        );
    }

    const getCabezera = () => {

        let header = tbody.length > 0 ? (
            <Row style={{ height: 'maxContent', backgroundColor:'rgb(230,230,230)'}}>

                {tbody.map(cabezera =>
                    <Col key={cabezera} style={{borderColor:'rgb(180,180,180)', borderWidth:1,justifyContent:'center', alignItems:'center'}}>
                        <Text>{cabezera}</Text>
                    </Col>
                )}
                <Col></Col>

            </Row>
        ) : (null);


        return header;
    }

    const getComponentes = () => {

        let componentes;

        componentes = models.map((model, index) =>
        (
            <Row key={Object.values(model)[0]} style={{ height: 50, backgroundColor:'rgb(230,230,230)'}}>

                {Object.entries(model).map(([clave, valor], index) =>
                    <Col key={clave} style={{borderColor:'rgb(180,180,180)', borderWidth:1,justifyContent:'center', alignItems:'center'}}>
                        <Text>{valor + ""}</Text>
                    </Col>
                )}

                <Col key={index} style={{borderColor:'rgb(180,180,180)', borderWidth:1,justifyContent:'center', alignItems:'center'}}>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', }}>

                        <Link href={`../${linkEdit}/${Object.values(model)[0]}`} >
                            <Image
                                source={require('./../assets/icon/edit.png')} // Ruta de la imagen local
                                style={{ width: 20, height: 20 }} // Estilo de la imagen
                            />
                        </Link>

                        <Link href={`../VerEjercicios/${Object.values(model)[0]}`} >
                            <Image
                                source={require('./../assets/iconLayout/rutinaGym.png')} // Ruta de la imagen local
                                style={{ width: 20, height: 20 }} // Estilo de la imagen
                            />
                        </Link>

                        <TouchableOpacity onPress={() => { activarEliminar(model) }}>
                            <Image
                                source={require('./../assets/icon/delete.png')} // Ruta de la imagen local
                                style={{ width: 20, height: 20 }} // Estilo de la imagen
                            />
                        </TouchableOpacity>

                    </View>

                </Col>

            </Row>
        ));

        return componentes;

    }


    return (
        <View style={{ flex: 1 }}>
            <Grid>
                {getCabezera()}
                {getComponentes()}
            </Grid>
        </View>
    )
}

export default TablaGestionUsuario;


const styles = StyleSheet.create({

    header: {
        fontWeight: 'bold',
        backgroundColor: '#f1f8ff',
    },
});

