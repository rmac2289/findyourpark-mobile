import React, { useState, useContext } from 'react';
import { StyleSheet, TouchableOpacity, Text, View, ImageBackground, KeyboardAvoidingView, ScrollView } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import shasta from './images/Mt_Shasta.jpeg';
import { useNavigation } from '@react-navigation/native';
import Footer from './Footer';
import { LoginContext } from './Contexts/LoginContext';
import TokenService from './services/TokenService';
import SuggestionsApiService from './services/SuggestionsApiService';

export default function AddPark(){
    const [parkName, setParkName] = useState('');
    const [location, setLocation] = useState('');
    const [loggedIn, setLoggedIn] = useContext(LoginContext)
    const [description, setDescription] = useState('');
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    // POST park suggestion
    const handleSuggestionSubmit = () => {
        setLoading(true)
        SuggestionsApiService.postSuggestion(parkName, location, description)
            .catch(error => setError(error.error));
            if (error === null){
                setSuccess(true);
            };
            setLocation('');
            setDescription('');
            setParkName('');
            setLoading(false)
    };

    return (
        <>
    <View style={styles.container}>
            <View style={styles.navList}>
            <TouchableOpacity 
      onPress={() =>
        navigation.navigate('Home')}  >
            <Text style={styles.navListItem}>Home</Text>
        </TouchableOpacity>
        {loggedIn && 
        <TouchableOpacity
        onPress={() => {
            setLoggedIn(false);
            TokenService.clearAuthToken()
        }}>
          <Text style={styles.navListItem}>Logout</Text>
        </TouchableOpacity>}
        {!loggedIn && 
        <TouchableOpacity 
      onPress={() =>
        navigation.navigate('Login')}  >
            <Text style={styles.navListItem}>Login</Text>
        </TouchableOpacity>}
        {!loggedIn && 
        <TouchableOpacity 
      onPress={() =>
        navigation.navigate('Signup')}  >
            <Text style={styles.navListItem}>Signup</Text>
        </TouchableOpacity>}
        <TouchableOpacity
        onPress={() => navigation.navigate('Map')}>
          <Text style={styles.navListItem}>Map</Text>
        </TouchableOpacity>
        </View>
    <ImageBackground style={styles.image} source={shasta}>
    <KeyboardAvoidingView style={styles.keyboardView} behavior={Platform.OS == "ios" ? "padding" : "height"}>

        <ScrollView contentContainerStyle={styles.contentContainer} style={styles.form}>
            <View style={styles.headerBox}>
            <Text style={styles.header}>suggest a park</Text>
            </View>
            {success && 
            <View style={styles.successBox}>
                <Text style={styles.success}>Your suggestion has been submitted and is under review, check back soon
                to see it posted to the app. Thank you!
                </Text>
            </View>}
            <View style={styles.labelBox}>
                <Text style={styles.label}>Park Name</Text>
            </View>
            <TextInput 
            onChangeText={parkName => setParkName(parkName)}
            value={parkName}
            placeholder="park name"
            style={styles.searchInput}/>
            <View style={styles.labelBox}>
                <Text style={styles.label}>Location</Text>
            </View>
            <TextInput 
            onChangeText={location => setLocation(location)}
            value={location}
            placeholder="location"
            style={styles.searchInput}/>
            <View style={styles.labelBox}>
                <Text style={styles.label}>Description</Text>
            </View>
            <TextInput 
            onChangeText={description => setDescription(description)}
            value={description}
            placeholder="description"
            style={styles.description}
            multiline={true}/>
                    {loading ? <ActivityIndicator style={styles.indicator} size="large" color="#ffffff"/>:

            <TouchableOpacity onPress={handleSuggestionSubmit} style={styles.button}>
                <Text style={styles.buttonText}>submit</Text>
            </TouchableOpacity>}
        </ScrollView>
        </KeyboardAvoidingView>
    </ImageBackground>
    </View>
    <Footer/>
    </>
    
    )
}

const styles = StyleSheet.create({
    keyboardView: {
        height: 700
    },
    contentContainer: {
        height: 900,
        paddingBottom: 150
    },
    labelBox: {
        width: 120,
        marginLeft: 30,
        marginRight: "auto",
        backgroundColor: "#414f47cc",
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5
    },
    label: {
        textAlign: "center",
        fontWeight: "800",
        color: "white",
        fontFamily: "Avenir",
        padding: 3,
        fontSize: 16
    },
    successBox: {
        width: "85%",
        marginLeft: "auto",
        marginRight: "auto",
        backgroundColor: "#414f47cc",
        padding: 10,
        borderRadius: 5,
        marginBottom: 20
    },
    success: {
        color: "white"
    },
    nav: {
        height: 60,
        backgroundColor: '#414f47',       
    },
    navList: {
        flexDirection: 'row',
        display: 'flex',
        justifyContent: 'space-evenly', 
        padding: 10,
    },
    navListItem: {
        marginRight: 5,
        fontSize: 18,
        color: 'white',
        paddingTop: 10,
        fontFamily: "Avenir"
    },
    headerBox: {
        backgroundColor: "#414f47cc",
        marginTop: 50,
        marginBottom: 50,
        borderRadius: 5,
        marginBottom: 40
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 22,
        color: "white",
        fontFamily: "Avenir"
     },
    button: {
        backgroundColor: '#414f47cc',
        padding: 10,
        borderRadius: 10,
        borderColor: "white",
        borderWidth: 2,
        width: 200,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    header: {
        fontSize: 24,
        padding: 15,
        borderRadius: 5,
        fontFamily: "Avenir-Medium",
        color: "white",
        textAlign: "center"
    },
    form: {
        color: "white",
        paddingTop: 10,
        paddingBottom: 10,
        marginLeft: "auto",
        textAlign: "center",
        marginRight: "auto",
        height: 250
    },
    searchInput: {
        backgroundColor: 'rgba(255,255,255,0.9)',
        height: 60,
        borderRadius: 10,
        width: 350,
        paddingLeft: 10,
        fontSize: 20,
        marginBottom: 20,
        fontFamily: "Avenir"
    },
    description: {
        backgroundColor: 'rgba(255,255,255,0.9)',
        height: 120,
        borderRadius: 10,
        width: 350,
        paddingLeft: 10,
        fontSize: 20,
        marginBottom: 20,
        fontFamily: "Avenir"
    },
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: "#414f47",
      },
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "flex-start"
      },
})