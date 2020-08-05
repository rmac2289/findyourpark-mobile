import React, { useContext } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { ParkNameContext } from './Contexts/ParkNameContext';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ActivitiesContext } from './Contexts/ActivitiesContext';
import { FullParkNameContext } from './Contexts/ParkNameContext'
import { useNavigation } from '@react-navigation/native'
import { LoginContext } from './Contexts/LoginContext';
import parks from './data.js';
import Footer from './Footer';

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
            <TouchableOpacity style={styles.button} to={`/park/${v.fullName}`}>
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
        <View style={styles.listBox}>
            {activitiesList.length === 0 || parkList.length === 0 ? <View style={styles.sorry}><Text style={styles.sorryText}>Sorry, no parks match that search!</Text></View>:activities.length > 0 && parkName !== '' ? activitiesList.concat(parkList):activities.length > 0 && parkName === '' ? activitiesList: parkList}
        </View>
    </ScrollView>
    <Footer/>
    </>
    
    )
}



const styles = StyleSheet.create({
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