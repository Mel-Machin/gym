import React, { useEffect, useState, } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { ScrollView } from 'react-native-gesture-handler';



const FormEdit = ({ modelData, editFunction, pikers }) => {
    
    const [model, setModel] = useState(modelData);
    const [modelTipes, setModelTipes] = useState(modelData);


    const validarDatos = () => {
        let datosValidados = true;
        for (const [clave, valor] of Object.entries(model)) {
            if (valor === "" || valor === null) {
                datosValidados = false;
                break;
            }
        }

        if (datosValidados) {
            editFunction(model);
        }
    }

    const getPiker = (piker) => {
        return (
            <View style={{ borderBottomWidth: 2,borderBottomColor:'rgb(204,204,204)'}}>
                <Text style={{fontSize:17}}>{piker.clave}</Text>
            <Picker 
            style={{backgroundColor:'rgb(255,255,255)'}}
            key={piker.clave}
                selectedValue={model[piker.clave]}
                onValueChange={(itemValue, itemIndex) => {
                    if (typeof modelTipes[piker.clave] === 'number') {
                        setModel({ ...model, [piker.clave]: parseInt(itemValue) });
                    } else {
                        setModel({ ...model, [piker.clave]: itemValue });
                    }
                }}
            >
                {piker.elements.map((elemento,index) =>
                (
                    <Picker.Item key={index} label={Object.values(elemento)[0]} value={Object.values(elemento)[0]} />
                ))}

            
            </Picker>
            </View>
        );
    }

    const getCampos = () => {
        const componentes = Object.entries(modelData).map(([clave, valor], index) => {
            return (
                <View key={clave} >

                    {index == 0 ? null : (
                        (
                            (pikers.lenght != 0 && (pikers.find(piker => piker.clave == clave) == undefined) ?

                                <View key={clave + "" + index} style={{}}>
                                    <Text style={{fontSize:17}}>{clave}</Text>
                                    <TextInput style={{borderBottomColor:'rgb(184,184,184)', borderBottomWidth: 2,backgroundColor:'white'}} value={model[clave] + ""} onChangeText={(value) => {
                                        if (typeof modelTipes[clave] === 'number') {
                                            setModel({ ...model, [clave]: parseInt(value) });
                                        } else {
                                            setModel({ ...model, [clave]: value });
                                        }
                                    }} />
                                    {model[clave] == '' ? <Text>Campo requerido</Text> : null}
                                </View>
                                : (
                                    <View key={clave}>
                                            {getPiker(pikers.find(piker => piker.clave == clave))}
                                    </View>   
                                )  
                            )
                        )
                    )}

                </View>
            )
        });
        componentes.push(
            (<Button key={'btnEditar'} onPress={validarDatos} title={'Editar'} />)
        );

        return componentes;
    }


    return (
        <ScrollView style={{flex:1}}>
            <View style={{flex:1, gap:25,margin:20}}>
            {getCampos()}
            </View>
            
        </ScrollView>
    );
}

export default FormEdit;