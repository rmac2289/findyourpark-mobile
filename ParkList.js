import React, { useContext } from 'react';
import { StyleSheet, View, Text, ScrollView, Dimensions, Image } from 'react-native';
import { ParkNameContext } from './Contexts/ParkNameContext';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ActivitiesContext } from './Contexts/ActivitiesContext';
import { FullParkNameContext } from './Contexts/ParkNameContext'
import { useNavigation } from '@react-navigation/native'
import { LoginContext } from './Contexts/LoginContext';
import parks from './data.js';
import tree from './images/tree.png';
import Footer from './Footer';
import MapView, { Marker, Callout } from 'react-native-maps';


export default function Parklist(){
    const [parkName, setParkName] = useContext(ParkNameContext)
    const [fullParkName, setFullParkName] = useContext(FullParkNameContext)
    const [activities] = useContext(ActivitiesContext);
    const navigation = useNavigation();
    const [loggedIn, setLoggedIn] = useContext(LoginContext)
     function compare(a, b) {
        const nameA = a.fullName.toUpperCase();
        const nameB = b.fullName.toUpperCase();
      
        let comparison = 0;
        if (nameA > nameB) {
          comparison = 1;
        } else if (nameA < nameB) {
          comparison = -1;
        }
        return comparison;
      };
      const checker = (parksData) => activities.every(v => parksData.activities.includes(v));
    
    // maps/filters to show parks matching ANY activities
    const activitiesList = parks.data.sort(compare).filter(checker).map((v,i) => {
        return <View key={i + 400}>
            <TouchableOpacity style={styles.button} onPress={() => {
                setFullParkName(v.fullName);
                return navigation.navigate("Park")}}>
                <Text style={styles.parkName}>{v.fullName}</Text>
            </TouchableOpacity>
        </View>
    });
      const parksToDisplay = parks.data.filter((v) => {
        return v.fullName.toLowerCase().includes(parkName.toLowerCase())
     });

    // maps parksToDisplay to show parks matching park name
    const parkList = parksToDisplay.sort(compare).map((v,i) => {
        return <View key={i}>
            
            <TouchableOpacity onPress={() => {
                setFullParkName(v.fullName);
                return navigation.navigate("Park")
            }} style={styles.button} >
                <Text style={styles.parkName}>{v.fullName}</Text>
            </TouchableOpacity>
          
        </View>
    });
    const markersToDisplay = parks.data.filter((v) => {
        return v.fullName.toLowerCase().includes(parkName.toLowerCase())
     });
     const markerList = markersToDisplay.sort(compare).map((v,i) => {
         return <Marker image={tree} key={i} coordinate={{ latitude: parseFloat(v.latLng[0]), longitude: parseFloat(v.latLng[1]) }}>
              <Callout onPress={() => {
                setFullParkName(v.fullName);
                navigation.navigate('Park');
              }}style={styles.callout} tooltip={false}>
                <View style={styles.calloutBox}>
                    <Text style={styles.calloutHeader}>{v.fullName}</Text>
                    <Text style={styles.calloutText}>Hours: <Text style={styles.lightText}>{v.hours}</Text></Text>
                    <View style={styles.imageBox}>
                    <Image style={{height: 100, width: 150}} source={{uri: v.images[0].url}}/>
                    </View>
                </View>
              </Callout>
        </Marker>
    })

    return (
        <>
    <ScrollView style={styles.parkListBox}>
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
        <TouchableOpacity 
      onPress={() =>
        navigation.navigate('Signup')}  ><Text style={styles.navListItem}>Signup</Text></TouchableOpacity>
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
    <View style={styles.headerBox}>
        <Text style={styles.header}>Search Results</Text>
    </View>
    <View style={styles.mapContainer}>
            <View style={styles.container}>
        <MapView
        style={styles.mapStyle}
        initialRegion={{
            latitude: 36.9915,
            longitude: -119.7889,
          latitudeDelta: 9,
          longitudeDelta: 9,
        }} 
      >
          {(activitiesList.length > 0 && parkName === '') && parks.data.sort(compare).filter(checker).map((v,i) => {
              return <Marker image={tree} key={i} coordinate={{ latitude: parseFloat(v.latLng[0]), longitude: parseFloat(v.latLng[1]) }}>
              <Callout onPress={() => {
                setFullParkName(v.fullName);
                navigation.navigate('Park');
              }}style={styles.callout} tooltip={false}>
                <View style={styles.calloutBox}>
                    <Text style={styles.calloutHeader}>{v.fullName}</Text>
                    <Text style={styles.calloutText}>Hours: <Text style={styles.lightText}>{v.hours}</Text></Text>
                    <View style={styles.imageBox}>
                    <Image style={{height: 100, width: 150}} source={{uri: v.images[0].url}}/>
                    </View>
                </View>
              </Callout>
        </Marker>
          })}
          {parkName !== '' && markerList}
          
      </MapView>
      </View>
      </View>
        <View style={styles.listBox}>
            {activitiesList.length === 0 || parkList.length === 0 ? <View style={styles.sorry}><Text style={styles.sorryText}>Sorry, no parks match that search!</Text></View>:activities.length > 0 && parkName !== '' ? activitiesList.concat(parkList):activities.length > 0 && parkName === '' ? activitiesList: parkList}
        </View>
    </ScrollView>
    <Footer/>
    </>
    
    )
}



const styles = StyleSheet.create({
    headerBox: {
        width: "75%",
        marginLeft: "auto",
        marginRight: "auto",
        borderRadius: 5,
        backgroundColor: "rgba(255,255,255,0.9)",
    },
    header: {
        color: "#414f47",
        fontFamily: "Avenir-Medium",
        textAlign: "center",
        fontSize: 32
    },
    imageBox: {
        alignItems: "center"
      },
      callout: {
        backgroundColor: "rgba(255,255,255,0.8)",
        position: "absolute",
        maxHeight: 600,
        borderWidth: 3,
        borderColor: "#414f47",
        padding: 10,
        borderRadius: 5
      },
      calloutHeader: {
        color: "#414f47",
        fontWeight: "800",
        fontFamily: "Avenir",
        maxWidth: 200
      },
      calloutText: {
        color: "#414f47",
        fontWeight: "900",
        maxWidth: 200,
        fontFamily: "Avenir"
      },
      lightText: {
        fontWeight: "normal"
      },
    sorry: {
        width: "95%",
        borderRadius: 5,
        backgroundColor: "white",
    },
    sorryText: {
        fontWeight: "700",
        padding: 10,
        fontSize: 18,
        color: "#414f47",
        textAlign: "center",
        fontFamily: "Avenir"
    },
    parkListBox: {
        backgroundColor: "#414f47",
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
      mapStyle: {
        width: Dimensions.get('window').width - 75,
        height: 500,
        borderRadius: 5
      },
    listBox: {
        width: "95%",
        marginLeft: "auto",
        marginRight: "auto",
        paddingBottom: 65
    },
    parkName: {
        color: "white",
        padding: 3,
        fontSize: 16,
        fontFamily: "Avenir"
    },
    button: {
        padding: 2,
        alignItems: "flex-start",
        borderBottomWidth: 2,
        borderColor: "rgba(255,255,255,0.3)"
    },
    nav: {
        height: 60,
        backgroundColor: '#414f47',
        marginBottom: 20,
        borderBottomWidth: 3,
        borderBottomColor: "rgba(255,255,255,0.3)"
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