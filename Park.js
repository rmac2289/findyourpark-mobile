
import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView, Dimensions, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { FullParkNameContext } from './Contexts/ParkNameContext';
import MapView, { Marker } from 'react-native-maps';
import Footer from './Footer';
import parks from './data';
import { LoginContext } from './Contexts/LoginContext';
import TokenService from './services/TokenService';

export default function Park(props){
    const [fullParkName, setFullParkName] = useContext(FullParkNameContext);
    const [weather, setWeather] = useState([]);
    const [error, setError] = useState(null);
    const [loggedIn, setLoggedIn] = useContext(LoginContext)
    const navigation = useNavigation();

    const filtered = parks.data.filter((value) => {
        return value.fullName === fullParkName
    });
    const filterFunc = (value) => {
        if (value.fullName === fullParkName){
            return value.latLng
        };
    }
    const latLngFilter = parks.data.filter(filterFunc);
        const lat = latLngFilter[0].latLng[0]
        const long = latLngFilter[0].latLng[1]
    /* useEffect(() => {
        const weatherUrl = `https://api.weather.gov/points/${lat},${long}`
       fetch(weatherUrl)
       .then(res => res.json())
       .then(data => {
           return fetch(data.properties.forecast)
           .then(res => res.json())
           .then(data => {
               if (data.periods){
                   setWeather(data.periods)
               } else {
               setWeather(data.properties.periods)
               }
            })
            .catch(error => setError(error.message))
       });
    },[])*/


return (
    <>
    <ScrollView style={styles.park}>
        <View style={styles.nav} className="nav">
        <ScrollView className="nav-list">
            <View style={styles.navList}>
            <TouchableOpacity
        onPress={() => navigation.navigate('Home')}>
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
        navigation.navigate('Login')}  ><Text style={styles.navListItem}>Login</Text></TouchableOpacity>}
        {!loggedIn && 
        <TouchableOpacity 
      onPress={() =>
        navigation.navigate('Signup')}  ><Text style={styles.navListItem}>Signup</Text></TouchableOpacity>}
        <TouchableOpacity
        onPress={() => navigation.navigate('Map')}>
          <Text style={styles.navListItem}>Map</Text>
        </TouchableOpacity>
        {loggedIn && 
        <TouchableOpacity onPress={() => navigation.navigate('AddPark')}>
        <Text style={styles.navListItem} to="/addpark">Suggest a Park</Text>
        </TouchableOpacity>}
        </View>
        </ScrollView>
    </View>
        <View style={styles.parkContainer}>
            <Text style={styles.header}>{filtered[0].fullName}</Text>
            <TouchableOpacity style={styles.button} onPress={() => 
                {
                    loggedIn ? navigation.navigate('CommentList'):navigation.navigate('Login')}
                }>
                <Text style={styles.buttonText}>User Comments</Text>
            </TouchableOpacity>
            {filtered[0].description && <Text style={styles.hoursLight}>{filtered[0].description}</Text>}
            <Text style={styles.hours}>Hours: <Text style={styles.hoursLight}>{filtered[0].hours}</Text></Text>
            <View style={styles.mapContainer}>
            <View style={styles.container}>
        <MapView
        style={styles.mapStyle}
        initialRegion={{
          latitude: parseFloat(lat),
          longitude: parseFloat(long),
          latitudeDelta: .025,
          longitudeDelta: .025,
        }}
      >
          <Marker title={fullParkName} pinColor="green" coordinate={{latitude: parseFloat(lat), longitude: parseFloat(long)}}/>
      </MapView>
      </View>
      </View>
            <View style={styles.mainContainer}>
                        <View style={styles.imageBox}>
                        {filtered[0].images.map((v, i) => {
                        return <Image key={i} style={
                            {
                                borderRadius: 5, 
                                marginTop: 5, 
                                marginLeft: "auto", 
                                marginRight: "auto", 
                                height:250, 
                                width:325, 
                                marginTop: 30,
                                backgroundColor: "white"}
                            } source={{uri: v.url}}/> 
                        })}
                        </View>
                </View>
        </View>
        
    </ScrollView>
    <Footer/>
    </>
)
}

const styles = StyleSheet.create({
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
    mapStyle: {
        width: Dimensions.get('window').width - 75,
        height: 500,
        borderRadius: 5
      },
      container: {
        flex: 1,
        backgroundColor: "#414f47",
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        borderRadius: 5
      },
      mapContainer: {
        borderRadius: 5,
        marginBottom: 10,
        width: "95%",
        backgroundColor: "#414f47",
        marginLeft: "auto",
        marginRight: "auto",
        minHeight: 160,
      },
    mainContainer: {
        borderRadius: 5,
        marginBottom: 10,
        width: "95%",
        backgroundColor: "#414f47",
        marginLeft: "auto",
        marginRight: "auto",
        minHeight: 160,
        paddingBottom: 20
    },
    textBox: {},
    imageBox: {
        flex: 1,
        minHeight: 300
    },
    hours: {
        fontWeight: "800",
        fontSize: 18,
        padding: 5,
        fontFamily: "Avenir",
        textAlign: "center"
    },
    hoursLight: {
        fontWeight: "normal",
        textAlign: "center",
        fontSize: 18,
        padding: 5,
        fontFamily: "Avenir",
    },
    park: {
        backgroundColor: "#414f47",
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    header: {
        fontFamily: "AvenirNext-Medium",
        fontSize: 30,
        textAlign: "center",
        paddingTop: 5,
        fontFamily: "Avenir-Medium"
    },
    parkContainer: {
        width: "95%",
        backgroundColor: "white",
        marginLeft: "auto",
        marginRight: "auto",
        borderRadius: 5,
        minHeight: 400,
        marginBottom: 50
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
})