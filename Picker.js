import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ActivitiesContext } from './Contexts/ActivitiesContext';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'

export default function Activities(){
    const [activities, setActivities] = useContext(ActivitiesContext);

    const [showPicker, setShowPicker] = useState(false);
    const [bikingChecked, setBikingChecked] = useState(false);
    const [hikingChecked, setHikingChecked] = useState(false);
    const [campingChecked, setCampingChecked] = useState(false);
    const [boatingChecked, setBoatingChecked] = useState(false);
    const [climbingChecked, setClimbingChecked] = useState(false);
    const [fishingChecked, setFishingChecked] = useState(false);
    const [geocachingChecked, setGeocachingChecked] = useState(false);
    const [guidedToursChecked, setGuidedToursChecked] = useState(false);
    const [horsebackRidingChecked, setHorsebackRidingChecked] = useState(false);
    const [museumExhibitsChecked, setMuseumExhibitsChecked] = useState(false);
    const [offRoadingChecked, setOffRoadingChecked] = useState(false);
    const [picnickingChecked, setPicnickingChecked] = useState(false);
    const [scubaChecked, setScubaChecked] = useState(false);
    const [snorkelingChecked, setSnorkelingChecked] = useState(false);
    const [skiingChecked, setSkiingChecked] = useState(false);
    const [surfingChecked, setSurfingChecked] = useState(false);
    const [swimmingChecked, setSwimmingChecked] = useState(false);
    const [wildlifeChecked, setWildlifeChecked] = useState(false);
  
   const showPickerFunc = () => {
      setShowPicker(!showPicker)
   }
   const pressBiking = () => {
      setBikingChecked(!bikingChecked);
      !activities.includes("Biking") &&
      setActivities([...activities, "Biking"]);
      if(activities.includes("Biking")){
          const targetIndex = activities.indexOf("Biking");
          if (activities.length === 1){
              setActivities([])
          } else {
          activities.splice(targetIndex,1);
          }
      }
   }
   const pressHiking = () => {
      setHikingChecked(!hikingChecked);
      !activities.includes("Hiking") &&
      setActivities([...activities, "Hiking"]);
      if(activities.includes("Hiking")){
          const targetIndex = activities.indexOf("Hiking");
          if (activities.length === 1){
              setActivities([])
          } else {
          activities.splice(targetIndex,1);
          }
      }
   }
   const pressCamping= () => {
      setCampingChecked(!campingChecked);
      !activities.includes("Camping") &&
      setActivities([...activities, "Camping"]);
      if(activities.includes("Camping")){
          const targetIndex = activities.indexOf("Camping");
          if (activities.length === 1){
              setActivities([])
          } else {
          activities.splice(targetIndex,1);
          }
      }
   }
   const pressPicnicking = () => {
      setPicnickingChecked(!picnickingChecked);
      !activities.includes("Picnicking") &&
      setActivities([...activities, "Picnicking"]);
      if(activities.includes("Picnicking")){
          const targetIndex = activities.indexOf("Picnicking");
          if (activities.length === 1){
              setActivities([])
          } else {
          activities.splice(targetIndex,1);
          }
      }
   }
   const pressWildlife = () => {
      setWildlifeChecked(!wildlifeChecked);
      !activities.includes("Wildlife Watching") &&
      setActivities([...activities, "Wildlife Watching"]);
      if(activities.includes("Wildlife Watching")){
          const targetIndex = activities.indexOf("Wildlife Watching");
          if (activities.length === 1){
              setActivities([])
          } else {
          activities.splice(targetIndex,1);
          }
      }
   }
   const pressScuba = () => {
      setScubaChecked(!scubaChecked);
      !activities.includes("SCUBA Diving") &&
      setActivities([...activities, "SCUBA Diving"]);
      if(activities.includes("SCUBA Diving")){
          const targetIndex = activities.indexOf("SCUBA Diving");
          if (activities.length === 1){
              setActivities([])
          } else {
          activities.splice(targetIndex,1);
          }
      }
   }
   const pressSnorkeling = () => {
      setSnorkelingChecked(!snorkelingChecked);
      !activities.includes("Snorkeling") &&
      setActivities([...activities, "Snorkeling"]);
      if(activities.includes("Snorkeling")){
          const targetIndex = activities.indexOf("Snorkeling");
          if (activities.length === 1){
              setActivities([])
          } else {
          activities.splice(targetIndex,1);
          }
      }
   }
   const pressClimbing = () => {
      setClimbingChecked(!climbingChecked);
      !activities.includes("Climbing") &&
      setActivities([...activities, "Climbing"]);
      if(activities.includes("Climbing")){
          const targetIndex = activities.indexOf("Climbing");
          if (activities.length === 1){
              setActivities([])
          } else {
          activities.splice(targetIndex,1);
          }
      }
   }
   const pressSurfing = () => {
      setSurfingChecked(!surfingChecked);
      !activities.includes("Surfing") &&
      setActivities([...activities, "Surfing"]);
      if(activities.includes("Surfing")){
          const targetIndex = activities.indexOf("Surfing");
          if (activities.length === 1){
              setActivities([])
          } else {
          activities.splice(targetIndex,1);
          }
      }
   }
   const pressFishing = () => {
      setFishingChecked(!fishingChecked);
      !activities.includes("Fishing") &&
      setActivities([...activities, "Fishing"]);
      if(activities.includes("Fishing")){
          const targetIndex = activities.indexOf("Fishing");
          if (activities.length === 1){
              setActivities([])
          } else {
          activities.splice(targetIndex,1);
          }
      }
   }
   const pressGeocaching = () => {
      setGeocachingChecked(!geocachingChecked);
      !activities.includes("Geocaching") &&
      setActivities([...activities, "Geocaching"]);
      if(activities.includes("Geocaching")){
          const targetIndex = activities.indexOf("Geocaching");
          if (activities.length === 1){
              setActivities([])
          } else {
          activities.splice(targetIndex,1);
          }
      }
   }
   const pressGuidedTours = () => {
      setGuidedToursChecked(!guidedToursChecked);
      !activities.includes("Guided Tours") &&
      setActivities([...activities, "Guided Tours"]);
      if(activities.includes("Guided Tours")){
          const targetIndex = activities.indexOf("Guided Tours");
          if (activities.length === 1){
              setActivities([])
          } else {
          activities.splice(targetIndex,1);
          }
      }
   }
   const pressHorsebackRiding = () => {
      setHorsebackRidingChecked(!horsebackRidingChecked);
      !activities.includes("Horseback Riding") &&
      setActivities([...activities, "Horseback Riding"]);
      if(activities.includes("Horseback Riding")){
          const targetIndex = activities.indexOf("Horseback Riding");
          if (activities.length === 1){
              setActivities([])
          } else {
          activities.splice(targetIndex,1);
          }
      }
   }
   const pressMuseumExhibits = () => {
      setMuseumExhibitsChecked(!museumExhibitsChecked);
      !activities.includes("Museum Exhibits") &&
      setActivities([...activities, "Museum Exhibits"]);
      if(activities.includes("Museum Exhibits")){
          const targetIndex = activities.indexOf("Museum Exhibits");
          if (activities.length === 1){
              setActivities([])
          } else {
          activities.splice(targetIndex,1);
          }
      }
   }
   const pressOffRoading = () => {
      setOffRoadingChecked(!offRoadingChecked);
      !activities.includes("Off-Roading") &&
      setActivities([...activities, "Off-Roading"]);
      if(activities.includes("Off-Roading")){
          const targetIndex = activities.indexOf("Off-Roading");
          if (activities.length === 1){
              setActivities([])
          } else {
          activities.splice(targetIndex,1);
          }
      }
   }
   const pressSwimming = () => {
      setSwimmingChecked(!swimmingChecked);
      !activities.includes("Swimming") &&
      setActivities([...activities, "Swimming"]);
      if(activities.includes("Swimming")){
          const targetIndex = activities.indexOf("Swimming");
          if (activities.length === 1){
              setActivities([])
          } else {
          activities.splice(targetIndex,1);
          }
      }
   }
   const pressBoating = () => {
      setBoatingChecked(!boatingChecked)
      !activities.includes("Boating") &&
      setActivities([...activities, "Boating"]);
      if(activities.includes("Boating")){
          const targetIndex = activities.indexOf("Boating");
          if (activities.length === 1){
              setActivities([])
          } else {
          activities.splice(targetIndex,1);
          }
      }
   }
   const pressSkiing = () => {
      setSkiingChecked(!skiingChecked);
      !activities.includes("Skiing") &&
      setActivities([...activities, "Skiing"]);
      if(activities.includes("Skiing")){
          const targetIndex = activities.indexOf("Skiing");
          if (activities.length === 1){
              setActivities([])
          } else {
          activities.splice(targetIndex,1);
          }
      }
   }

      return (
         <View style={styles.pickerContainer}>
            <TouchableOpacity onPress={showPickerFunc} style={styles.button}>
                  <Text style={styles.buttonText}>Activities</Text>
                  <FontAwesomeIcon icon={showPicker ? faChevronUp:faChevronDown}/>
               </TouchableOpacity>
            {showPicker &&
            <View style={styles.checkboxContainer}>
            <View style={styles.checkboxes}>
            <TouchableOpacity style={!bikingChecked ? styles.checkbox:styles.checked} onPress={pressBiking}>
                  <Text style={!bikingChecked ? styles.text:styles.textChecked}>Biking</Text>
               </TouchableOpacity>
               <TouchableOpacity style={!boatingChecked ? styles.checkbox:styles.checked}  onPress={pressBoating}>
                  <Text style={!boatingChecked ? styles.text:styles.textChecked}>Boating</Text>
               </TouchableOpacity>
               <TouchableOpacity style={!campingChecked ? styles.checkbox:styles.checked} onPress={pressCamping}>
                  <Text style={!campingChecked ? styles.text:styles.textChecked}>Camping</Text>
               </TouchableOpacity>
               <TouchableOpacity style={!climbingChecked ? styles.checkbox:styles.checked} onPress={pressClimbing}>
                  <Text style={!climbingChecked ? styles.text:styles.textChecked}>Climbing</Text>
               </TouchableOpacity>
               <TouchableOpacity style={!fishingChecked ? styles.checkbox:styles.checked} onPress={pressFishing}>
                  <Text style={!fishingChecked ? styles.text:styles.textChecked}>Fishing</Text>
               </TouchableOpacity>
               <TouchableOpacity style={!geocachingChecked ? styles.checkbox:styles.checked} onPress={pressGeocaching}>
                  <Text style={!geocachingChecked ? styles.text:styles.textChecked}>Geocaching</Text>
               </TouchableOpacity>
               <TouchableOpacity style={!guidedToursChecked ? styles.checkbox:styles.checked} onPress={pressGuidedTours}>
                  <Text style={!guidedToursChecked ? styles.text:styles.textChecked}>Guided Tours</Text>
               </TouchableOpacity>
               <TouchableOpacity style={!hikingChecked ? styles.checkbox:styles.checked} onPress={pressHiking}>
                  <Text style={!hikingChecked ? styles.text:styles.textChecked}>Hiking</Text>
               </TouchableOpacity>
               <TouchableOpacity style={!horsebackRidingChecked ? styles.checkbox:styles.checked} onPress={pressHorsebackRiding}>
                  <Text style={!horsebackRidingChecked ? styles.text:styles.textChecked}>Horseback Riding</Text>
               </TouchableOpacity>
            </View>
            <View style={styles.checkboxes}>
               <TouchableOpacity style={!museumExhibitsChecked ? styles.checkbox:styles.checked} onPress={pressMuseumExhibits}>
                  <Text style={!museumExhibitsChecked ? styles.text:styles.textChecked}>Museum Exhibits</Text>
               </TouchableOpacity>
               <TouchableOpacity style={!offRoadingChecked ? styles.checkbox:styles.checked} onPress={pressOffRoading}>
                  <Text style={!offRoadingChecked ? styles.text:styles.textChecked}>Off-Roading</Text>
               </TouchableOpacity>
               <TouchableOpacity style={!picnickingChecked ? styles.checkbox:styles.checked} onPress={pressPicnicking}>
                  <Text style={!picnickingChecked ? styles.text:styles.textChecked}>Picnicking</Text>
               </TouchableOpacity>
               <TouchableOpacity style={!scubaChecked ? styles.checkbox:styles.checked} onPress={pressScuba}>
                  <Text style={!scubaChecked ? styles.text:styles.textChecked}>Scuba Diving</Text>
               </TouchableOpacity>
               <TouchableOpacity style={!skiingChecked ? styles.checkbox:styles.checked} onPress={pressSkiing}>
                  <Text style={!skiingChecked ? styles.text:styles.textChecked}>Skiing</Text>
               </TouchableOpacity>
               <TouchableOpacity style={!snorkelingChecked ? styles.checkbox:styles.checked} onPress={pressSnorkeling}>
                  <Text style={!snorkelingChecked ? styles.text:styles.textChecked}>Snorkeling</Text>
               </TouchableOpacity>
               <TouchableOpacity style={!surfingChecked ? styles.checkbox:styles.checked} onPress={pressSurfing}>
                  <Text style={!surfingChecked ? styles.text:styles.textChecked}>Surfing</Text>
               </TouchableOpacity>
               <TouchableOpacity style={!swimmingChecked ? styles.checkbox:styles.checked} onPress={pressSwimming}>
                  <Text style={!swimmingChecked ? styles.text:styles.textChecked}>Swimming</Text>
               </TouchableOpacity>
               <TouchableOpacity style={!wildlifeChecked ? styles.checkbox:styles.checked} onPress={pressWildlife}>
                  <Text style={!wildlifeChecked ? styles.text:styles.textChecked}>Wildlife Watching</Text>
               </TouchableOpacity>
            </View>
         </View>}
      </View>
        
      )
   }


const styles = StyleSheet.create({
   text: {
      color: "#414f47",
      fontSize: 17,
      fontFamily: "Avenir"
   },
   textChecked: {
      color: "white",
      fontSize: 17,
      fontFamily: "Avenir"
   },
   checked: {
      backgroundColor: "#414f47",
      color: "white",
      padding: 5,
      marginBottom: 5,
      borderRadius: 5,
      alignItems: "center",
   },
   pickerContainer: {
      marginTop: 10,
      marginBottom: 10
   },
   checkboxContainer: {
      marginTop: 10,
      flexDirection: "row",
      justifyContent: "space-around",
      backgroundColor: "#414f47",
      borderRadius: 10,
      width: "90%",
      marginRight: "auto",
      marginLeft: "auto",
      padding: 2,
   },
   checkboxes: {
      marginTop: 5,
      display: "flex",
      flexDirection: "column",
      borderRadius: 20,
   },
   checkbox: {
      backgroundColor: 'white',
      padding: 4,
      width: "100%",
      marginBottom: 5,
      borderRadius: 3,
      alignItems: "center",
   },
   button: {
      padding: 10,
      borderRadius: 10,
      width: 200,
      marginLeft: 'auto',
      marginRight: 'auto',
      alignItems: "center",
      backgroundColor: "rgba(255,255,255,0.9)"
   },
   buttonText: {
      textAlign: 'center',
      fontSize: 22,
      color: "#414f47",
      fontFamily: "Avenir"
      
   },
})