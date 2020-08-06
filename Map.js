import MapView, { Marker, Callout } from 'react-native-maps';
import React, { useContext } from 'react';
import tree from './images/tree.png';
import { LoginContext } from './Contexts/LoginContext'
import {
    StyleSheet,
    Dimensions,
    View,
    TouchableOpacity,
    Text,
    Image
  } from 'react-native';
import parks from './data';
import Footer from './Footer';
import { useNavigation } from '@react-navigation/native';
import { FullParkNameContext } from './Contexts/ParkNameContext';
import TokenService from './services/TokenService';

export default function MapUI() {
  const [fullParkName, setFullParkName] = useContext(FullParkNameContext)
    const navigation = useNavigation();
  const [loggedIn, setLoggedIn] = useContext(LoginContext)
    const markers = parks.data.map((v,i) => {
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
      <View style={styles.container}>
      <View style={styles.nav} className="nav">
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
        {!loggedIn && <TouchableOpacity 
      onPress={() =>
        navigation.navigate('Login')}  ><Text style={styles.navListItem}>Login</Text></TouchableOpacity>}
        {!loggedIn && 
        <TouchableOpacity 
      onPress={() =>
        navigation.navigate('Signup')}  ><Text style={styles.navListItem}>Signup</Text></TouchableOpacity>}
        {loggedIn && 
        <TouchableOpacity
        onPress={() => navigation.navigate('AddPark')}>
          <Text style={styles.navListItem}>Suggest Park</Text>
        </TouchableOpacity>}
        </View>
    </View>
        
          
        <MapView
        style={styles.mapStyle}
        initialRegion={{
          latitude: 36.9915,
          longitude: -119.7889,
          latitudeDelta: 9,
          longitudeDelta: 9,
        }}
      >
         {markers}
      </MapView>
      </View>
      <Footer/>
      </>
    )
}

const styles = StyleSheet.create({
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
  nav: {
    height: 80,
    backgroundColor: '#414f47',
    width: "100%",
    justifyContent: "center"
},
navList: {
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'space-evenly',  
    alignItems: "center",
    marginTop: 10
},
navListItem: {
    marginRight: 5,
    fontSize: 18,
    color: 'white',
    paddingTop: 10,
    fontFamily: "Avenir",
},
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
      mapStyle: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height - 120,
        backgroundColor: "#414f47"
      },
});