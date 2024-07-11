
import { Picker } from '@react-native-picker/picker';
import React, { useEffect, useState, } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';


const FormCrear = ({ modelData, createFunction, autoIncrement, pikers }) => {

    const [model, setModel] = useState(modelData);
    const [modelTipes, setModelTipes] = useState(modelData);

    useEffect(() => {
    }, [model]);


    const validarDatos = () => {
        let datosValidados = true;

        for (const [clave, valor] of Object.entries(model)) {
            if (valor === "" || valor === null) {
                datosValidados = false;
                break;
            }
        }

        if (datosValidados) {
            createFunction(model);
        }
    }

    const getPiker = (piker) => {

        return (
            <View key={piker.clave} style={{ borderBottomWidth: 2,borderBottomColor:'rgb(204,204,204)'}}>

                <Text style={{fontSize:17}}>{piker.clave}</Text>
                <Picker
                style={{backgroundColor:'rgb(255,255,255)'}}
                    selectedValue={model[piker.clave]}

                    onValueChange={(itemValue, itemIndex) => {

                        if (typeof modelTipes[piker.clave] === 'number') {
                            setModel({ ...model, [piker.clave]: parseInt(itemValue) });
                        } else {
                            setModel({ ...model, [piker.clave]: itemValue });
                        }

                    }}
                >

                    {piker.elements.map((elemento, index) =>
                    (
                        <Picker.Item key={index} label={Object.values(elemento)[0]} value={Object.values(elemento)[0]} />
                    ))}

                </Picker>
            </View>
        );
    }

    const getCampos = () => {

        const componentes = Object.entries(modelData).map(([clave, valor], index) =>
        (
            index == 0 && !autoIncrement || index > 0 ?
                (
                    (pikers.lenght != 0 && (pikers.find(piker => piker.clave == clave) == undefined) ?

                        <View key={clave}>
                            <Text style={{fontSize:17}}>{clave}</Text>
                            <TextInput style={{borderBottomColor:'rgb(184,184,184)', borderBottomWidth: 2,backgroundColor:'white'}} value={model[clave]} onChangeText={(value) => {
                                if (typeof modelTipes[clave] === 'number') {
                                    setModel({ ...model, [clave]: parseInt(value) });
                                } else {
                                    setModel({ ...model, [clave]: value });
                                }
                            }} />
                            {model[clave] == '' ? <Text>Campo requerido</Text> : null}
                        </View>

                        : (<View key={clave}>
                            {getPiker(pikers.find(piker => piker.clave == clave))}
                        </View>)

                    )
                ) : null

        ));
        componentes.push(
            (<Button key="crear-button" onPress={validarDatos} title={'Crear'} />)
        );

        return componentes;
    }

    
    return (
        <ScrollView>
            <View style={{flex:1, gap:25,margin:20}}>
            {getCampos()}
            </View>
          
        </ScrollView>
    );
}

export default FormCrear;