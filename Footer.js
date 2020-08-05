import React from 'react';
import { StyleSheet, View, Text } from 'react-native';



export default function Footer(){
    return (
    <View style={styles.footer}>
        <View style={styles.textBox}>
            <Text style={styles.text}>© 2020 Ross MacDonald</Text>
        </View>
    </View>
    )
}

const styles = StyleSheet.create({
    footer: {
        height: 45,
        backgroundColor: "#414f47",
        position: "absolute",
        bottom: 0,
        paddingLeft: 20,
        paddingTop: 5,
        borderTopColor: "white",
        borderTopWidth: 2,
        width: "100%",
        justifyContent: "center",
    },
    text: {
        textAlign: "center",
        color: "white",
        fontFamily: "Avenir",
    }
})