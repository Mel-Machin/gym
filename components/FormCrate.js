
import { Picker } from '@react-native-picker/picker';
import React, { useEffect, useState, } from 'react';
import { View, Text, TextInput, Button, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import uuid from 'react-native-uuid';




const FormCrear = ({ modelData, createFunction, autoIncrement, pikers,filesInput }) => {

    const [model, setModel] = useState(modelData); // se crea un estado para actualizar los datos del modelo 
    const [modelTipes, setModelTipes] = useState(modelData); // se crea un estado para verfificar que tipo de dato tienen las propiedades del modelo


    


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
        if(pikers.find(piker => piker.clave == clave) != undefined){ // si la priedad forma parte de los piker devuelve un piker  en getPiker()
            return getPiker(pikers.find(piker => piker.clave == clave));
        }else if(filesInput.find(piker => piker.clave == clave) != undefined){ // si la propiedad forma partde de los File devuelve a input Image en GetFile()
            return getFile(clave,valor);
        }else{ // sino devuelve una entrada texto normal 
            return (
                <View key={clave}> 
                    <Text style={{fontSize:17}}>{clave}</Text> {/* label con el nombre de la propiedad */}
                    <TextInput style={{borderBottomColor:'rgb(184,184,184)', borderBottomWidth: 2,backgroundColor:'white'}} value={model[clave]} onChangeText={(value) => {
                        if (typeof modelTipes[clave] === 'number') { // veriffica si el tipo de valor de la propiedad es number o text
                            setModel({ ...model, [clave]: parseInt(value) }); // si es number cambiar el valor de la propiedad a lo que tiene el input text
                        } else {
                            setModel({ ...model, [clave]: value });
                        }
                    }} />
                    {model[clave] == '' ? <Text>Campo requerido</Text> : null}{/*  mensaje que aparece si el campo esta vacio  */}
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
    
        
    
        if (!result.cancelled) {
            
          saveImage(result.assets[0].uri,clave); // le pasa la urli temporal de la imgen 
          
        }
      };

      const saveImage = async (uri,clave) => {
        let imageUri = uri;
    //    const uniqueId = uuidv4();
        const id = uuid.v4(); // generar un codigo unico 

        let newUri = `${FileSystem.documentDirectory}${id}.jgp`; //se crea una direccion donde gusardar imagen FileSystem.documentDirectory contiene directorio donde se pueden guardar files 
      
        await FileSystem.copyAsync({ //copia del directorio temporal al nuevo directorio 
          from: imageUri,
          to: newUri,
          
        });
        
        setModel({ ...model, [clave]: (newUri) }); // se guarda en el modelo la url de la imagen en la propiedad que maneja src imagenes 
        };


    const getFile=(clave,valor)=>{
        return(    
            <View  key={clave} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Button title="Seleccionar imagen" onPress={()=>{pickImage(clave)}} />
                {model[clave]!=null  && <Image source={{uri:model[clave]} } style={{ width: 100, height: 100}} />}
          </View>

        )
    }

    const getCampos = () => {

        const componentes = Object.entries(modelData).map(([clave, valor], index) => // por cada propiedad del modelo se obtiene una entrada en getEntrada(input)
        (
            index == 0 && !autoIncrement || index > 0 ? // determina si crear un input para la primera propiedad, dependiendo si es auntoincrement o no 
                (
                    getEntrada(clave,valor) // se le pasa la clave -> nombre que tiene la propiedad en el modelo , y el valor que tiene esa propiedad 
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