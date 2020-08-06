/* eslint-disable */
import React from 'react';
import { StyleSheet, View, Text, ImageBackground } from 'react-native';



export default function Header(){
    const image = { uri: 'https://ross-scott-macdonald.com/Muir-Wood.jpg'}
    return (
    <ImageBackground source={image} style={styles.image}>
    <View style={styles.header}>
        <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Find Your Park</Text>
            <Text style={styles.headerP}>Search for California parks by name or narrow your search
                by what activities are offered - once you find what you're looking for,
                check out the park details and comments left by other users. If you've experienced the park
                yourself, sign up for an account and leave your own comments. Don't see your local park listed?
                Head to the 'Suggest a Park' link above and submit it for review.
            </Text>
        </View>
    </View>
    </ImageBackground>
    
    )
}

const styles = StyleSheet.create({
    header: {
        display: 'flex',
        alignItems: 'center',
        width: '90%',
        marginLeft: 'auto',
        marginRight: 'auto',
        padding: '2%',
        paddingTop: 25,
    },
    image: {
        resizeMode: "cover",
        justifyContent: "center"
      },
    headerContainer: {
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
    },
    headerText: {
        fontSize: 40,
        textAlign: "center",
        fontWeight: "600",
        marginBottom: 0,
        borderWidth: 2,
        borderColor: '#414f47',
        overflow: 'hidden',
        borderRadius: 10,
        padding: '1%',
        marginBottom: 20,
        color: '#414f47',
        backgroundColor: 'rgba(255,255,255,0.8)',
        fontFamily: "AvenirNext-Medium"
    },
    headerP: {
        fontFamily: "Avenir",
        backgroundColor: 'rgba(255,255,255,0.8)',
        color: '#414f47',
        overflow: 'hidden',
        borderRadius: 10,
        padding: '2s%',
        borderWidth: 2,
        borderColor: '#414f47',
        marginLeft: 'auto',
        marginRight: 'auto',
        fontSize: 18,
    }

});

