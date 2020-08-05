import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, View, Text, Dimensions, ScrollView } from 'react-native';
import Comment from './Comment';
import { FullParkNameContext } from './Contexts/ParkNameContext';
import { CommentsContext } from './Contexts/CommentsContext';
import CommentForm from './CommentForm';
import { TouchableOpacity } from 'react-native-gesture-handler';
import CommentsApiService from './services/CommentsApiService';
import { LoginContext } from './Contexts/LoginContext';
import { useNavigation } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import Footer from './Footer';
import AsyncStorage from '@react-native-community/async-storage';
import TokenService from './services/TokenService';

export default function CommentList(){
    const [comments, setComments] = useContext(CommentsContext);
    const [fullParkName] = useContext(FullParkNameContext);
    const [toggleOpen, setToggleOpen] = useState(false);
    const [loggedIn, setLoggedIn] = useContext(LoginContext)   ;
    const navigation = useNavigation();

    useEffect(() => {
        CommentsApiService.getComments()
          .then(data => setComments(data))
          .catch(error => console.error('Error:', error));
      }, [setComments]);
     
      const onLogout = () => {
        TokenService.clearAuthToken();
        setLoggedIn(false);
      }
      // filter comments to show selected park
      const commentArray = Object.values(comments);
      
      const filteredCommentArray = commentArray.filter((v) => {
          return v.park_name.toLowerCase() === fullParkName.toLowerCase()
      });
      const commentList = filteredCommentArray.map((v,i) => {
          return <Comment key={i} date={v.date} subject={v.subject} comment={v.comments} user={v.user_name} />
      }); 
    
    const toggleOpenForm = () => {
        setToggleOpen(!toggleOpen);
    };
    return (
        <>
    <View style={styles.commentListBox}>
        <View style={styles.nav} className="nav">
            <View style={styles.navList}>
        {!loggedIn && <TouchableOpacity 
      onPress={() =>
        navigation.navigate('Login')}  ><Text style={styles.navListItem}>Login</Text></TouchableOpacity>}
        {loggedIn &&
        <TouchableOpacity onPress={() => onLogout()} to="/">
          <Text style={styles.navListItem}>Logout</Text>
        </TouchableOpacity>}
        {!loggedIn && 
        <TouchableOpacity 
      onPress={() =>
        navigation.navigate('Signup')}  ><Text style={styles.navListItem}>Signup</Text></TouchableOpacity>}
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
    </View>
        <ScrollView style={styles.commentsView}>
        <Text style={styles.header}>{fullParkName}</Text>
            <View >
                <TouchableOpacity style={styles.commentButton} onPress={() => toggleOpenForm()}>
                    <Text style={styles.commentButtonText}>Leave Comment</Text>
                    <FontAwesomeIcon style={styles.chevron} icon={toggleOpen ? faChevronUp:faChevronDown}/>
                </TouchableOpacity>
                {toggleOpen && <CommentForm/>}
            </View>
            <ScrollView style={styles.comments}>
                {commentList.length < 1 ?
                <View style={styles.trailblazer}>
                    <Text style={styles.trailblazerText}>You're a trailblazer! Leave a comment and you'll be the first.</Text>
                </View> :
                commentList}
            </ScrollView>
        </ScrollView>
    </View>
    <Footer/>
    </>
    )
}


const styles = StyleSheet.create({
    header: {
        fontFamily: "AvenirNext-Medium",
        fontSize: 30,
        textAlign: "center",
        paddingTop: 5,
        fontFamily: "Avenir-Medium"
    },
    trailblazer: {
        width: "95%",
        backgroundColor: "#414f47",
        marginLeft: "auto",
        marginRight: "auto",
        borderRadius: 5,
        marginTop: 10,
        marginBottom: 10
    },
    comments: {
        marginTop: 20,
    },
    trailblazerText: {
        color: "white",
        padding: 10,
        textAlign: "center"
    },
    commentListBox: {
        backgroundColor: "#414f47",
        height: "98%",
        paddingBottom: 40,
    },
    commentButtonText: {
        textAlign: 'center',
        fontSize: 22,
        color: "white",
        fontFamily: "Avenir",
     },
    commentButton: {
        alignItems: "center",
        backgroundColor: '#414f47cc',
        padding: 10,
        borderRadius: 10,
        borderColor: "white",
        borderWidth: 2,
        width: 200,
        marginTop: 10,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: 15
    },
    chevron: {
        color: "white"
    },
    commentsView: {
        width: "95%",
        marginLeft: "auto",
        marginRight: "auto",
        backgroundColor: "white",
        borderRadius: 5
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