import React, { useState, useContext } from 'react';
import { StyleSheet, TouchableOpacity, Text, View, ImageBackground, ScrollView, KeyboardAvoidingView, ActivityIndicator } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import rogue from './images/rogue.jpeg';
import { useNavigation } from '@react-navigation/native';
import Footer from './Footer';
import { LoginContext } from './Contexts/LoginContext';
import AuthApiService from './services/AuthApiService';
import TokenService from './services/TokenService';
import AsyncStorage from '@react-native-community/async-storage';
import { UserContext } from './Contexts/UserContext';
import { TokenContext } from './Contexts/TokenContext';

export default function Login(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [user, setUser] = useContext(UserContext);
    const [loggedIn, setLoggedIn] = useContext(LoginContext);
    const navigation = useNavigation();
    const [token, setToken] = useContext(TokenContext);
    const [loading, setLoading] = useState(false);

    const onLoginSuccess = async () => {
        setUser(username);
        setLoggedIn(true);
        navigation.navigate('Home');
        setLoading(false);
        return await AsyncStorage.setItem('username', username);
      };

// Auth verification on login
const handleSubmit = ev => {
    ev.preventDefault();
    setLoading(true);

    setError(null);

    AuthApiService.postLogin({
      user_name: username,
      password: password,
    })
      .then(res => {
        TokenService.saveAuthToken(res.authToken);
        if (TokenService.hasAuthToken()){
        return onLoginSuccess();
        };
        setUsername('')
        setPassword('')
      })
      .catch(res => setError(res.error))
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
        <TouchableOpacity 
      onPress={() =>
        navigation.navigate('Signup')}  ><Text style={styles.navListItem}>Signup</Text></TouchableOpacity>
        <TouchableOpacity
        onPress={() => navigation.navigate('Map')}>
          <Text style={styles.navListItem}>Map</Text>
        </TouchableOpacity>
        {loggedIn && 
        <TouchableOpacity
        onPress={() => navigation.navigate('AddPark')}>
          <Text style={styles.navListItem}>Suggest Park</Text>
        </TouchableOpacity>}
        </View>
    <ImageBackground style={styles.image} source={rogue}>
     <KeyboardAvoidingView style={styles.keyboardView} behavior={Platform.OS == "ios" ? "padding" : "height"}>
        <ScrollView contentContainerStyle={styles.contentContainer} style={styles.form}>
          <View style={styles.headerBox}>
            <Text style={styles.header}>log in to access user comments or to suggest a park</Text>
            </View>
            {error !== null && <View style={styles.error}><Text style={styles.errorText}>{error}</Text></View>}
            <View style={styles.labelBox}>
                <Text style={styles.label}>Username</Text>
            </View>
            <TextInput 
            onChangeText={username => setUsername(username)}
            value={username}
            placeholder="username"
            style={styles.searchInput}
            textContentType="username"/>
            <View style={styles.labelBox}>
                <Text style={styles.label}>Password</Text>
            </View>
            <TextInput 
            onChangeText={password => setPassword(password)}
            value={password}
            placeholder="password"
            style={styles.searchInput}
            textContentType="password"
            secureTextEntry={true}/>
            {loading ? <ActivityIndicator style={styles.indicator} size="large" color="#ffffff"/>:
            <TouchableOpacity activeOpacity={.5} onPress={handleSubmit} style={styles.button}>
                <Text style={styles.buttonText}>login</Text>
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
    height: 800,
    paddingBottom: 150
},
  labelBox: {
    width: 110,
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
    error: {
      width: "75%",
      marginLeft: "auto",
      marginRight: "auto",
      backgroundColor: "rgba(255,255,255,0.8)",
      padding: 10,
      marginBottom: 15,
      borderColor: "maroon",
      borderWidth: 2,
      borderRadius: 5
    },
    errorText: {
      color: "#414f47",
      fontFamily: "Avenir",
      fontSize: 18,
      fontWeight: "800"
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
        alignItems: "center"    
    },
    navListItem: {
        marginRight: 5,
        fontSize: 18,
        color: 'white',
        paddingTop: 10,
        fontFamily: "Avenir"
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
    headerBox: {
      backgroundColor: "#414f47cc",
      marginTop: 30,
      marginBottom: 50,
      borderRadius: 5
  },
    header: {
        fontSize: 22,
        padding: 20,
        textAlign: "center",
        fontFamily: "Avenir-Medium",
        color: "white"
    },
    form: {
        color: "white",
        paddingTop: 10,
        marginLeft: "auto",
        marginRight: "auto",
        width: "85%",
        height: 250
    },
    searchInput: {
        backgroundColor: 'rgba(255,255,255,0.9)',
        height: 60,
        borderRadius: 10,
        width: 320,
        paddingLeft: 10,
        fontSize: 20,
        marginBottom: 20,
        alignSelf: "center",
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
        justifyContent: "flex-start",
      },
})