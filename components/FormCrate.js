
import { Picker } from '@react-native-picker/picker';
import React, { useEffect, useState, } from 'react';
import { View, Text, TextInput, Button, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import uuid from 'react-native-uuid';




const FormCrear = ({ modelData, createFunction, autoIncrement, pikers,filesInput }) => {

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

    const getEntrada=  (clave,valor) =>{
        if(pikers.find(piker => piker.clave == clave) != undefined){
            return getPiker(pikers.find(piker => piker.clave == clave));
        }else if(filesInput.find(piker => piker.clave == clave) != undefined){
            return getFile(clave,valor);
        }else{
            return (
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
            )
        }
    }

    const pickImage = async (clave) => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        console.log(result);
    
        if (!result.cancelled) {
            console.log("rgeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee");
            console.log(result);
            console.log("rgeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee");
           
          saveImage(result.assets[0].uri,clave);
          
        }
      };

      const saveImage = async (uri,clave) => {
        let imageUri = uri;
    //    const uniqueId = uuidv4();
    const id = uuid.v4();

        let newUri = `${FileSystem.documentDirectory}${id}.jgp`;
      
        await FileSystem.copyAsync({
          from: imageUri,
          to: newUri,
          
        });
        console.log("imagen copiadaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
        setModel({ ...model, [clave]: (newUri) });
        };


        useEffect(()=>{
            console.log(model)
        },[model]);


    const getFile=(clave,valor)=>{
        return(    
            <View  key={clave} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button title="Seleccionar imagen" onPress={()=>{pickImage(clave)}} />
            {model[clave]!=null  && <Image source={{uri:model[clave]} } style={{ width: 100, height: 100}} />}
          </View>

        )
    }

    const getCampos = () => {

        const componentes = Object.entries(modelData).map(([clave, valor], index) =>
        (
            index == 0 && !autoIncrement || index > 0 ?
                (
                    getEntrada(clave,valor)
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