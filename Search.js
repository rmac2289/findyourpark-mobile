/* eslint-disable keyword-spacing */
/* eslint-disable prettier/prettier */
import React, { useState, useContext } from 'react';
import { StyleSheet, View, Button, Text, TextInput } from 'react-native';
import Activities from './Picker';
import { TextContext } from './Contexts/TextContext';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Search(props){
    const [text, setText] = useContext(TextContext);

    return (
    <View style={styles.search}>
        <View style={styles.searchContainer}>
        <TextInput
            style={styles.searchInput}
            onChangeText={text => setText(text)}
            value={text}
            placeholder="Park name..."
    />
        <Activities/>
        <TouchableOpacity onPress={props.press} style={styles.button}>
            <Text style={styles.buttonText}>search</Text>
            </TouchableOpacity>
        </View>
    </View>
    )
};

const styles = StyleSheet.create({
    search: {
        display: 'flex',
        alignItems: 'center',
        width: '85%',
        marginLeft: 'auto',
        marginRight: 'auto',
        padding: '2%',
        paddingTop: 15,
        backgroundColor: '#414f47',
        width: '100%' ,
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 24,
        color: "white",
        fontFamily: "Avenir",
        fontWeight: "900",
        height: 120,
        width: 120,
        borderWidth: 5,
        borderRadius: 60,
        justifyContent: "center",
        borderColor: "rgba(255,255,255,0.8)",
        paddingTop: 35,
        
     },
    button: {
        backgroundColor: '#414f47',
        padding: 10,
        borderRadius: 100,
        borderColor: "rgba(255,255,255,0.8)",
        borderWidth: 8,
        width: 160,
        height: 160,
        marginLeft: 'auto',
        marginRight: 'auto',
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 30
    },
    searchContainer: {
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'center'
    },
    searchInput: {
        backgroundColor: 'rgba(255,255,255,0.9)',
        height: 50,
        borderRadius: 10,
        width: 400,
        paddingLeft: 10,
        fontSize: 20,
        fontFamily: "Avenir"
    }
});