import React, { useContext, useState } from 'react';
import CommentsApiService from './services/CommentsApiService';
import { CommentsContext } from './Contexts/CommentsContext';
import { FullParkNameContext } from './Contexts/ParkNameContext';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { UserContext } from './Contexts/UserContext';
import { TokenContext } from './Contexts/TokenContext';

export default function CommentForm(){
    const [subject, setSubject] = useState('');
    const [newCommentText, setNewCommentText] = useState('');
    const [comments, setComments] = useContext(CommentsContext);
    const [fullParkName] = useContext(FullParkNameContext);
    const [user, setUser] = useContext(UserContext);
    const [token, setToken] = useContext(TokenContext)
    // handle comment POST and immediately display new comment   
    
    const getToken = async () => {
        try {
          const jsonValue = await AsyncStorage.getItem('parkfinder-auth-token');
          setToken(jsonValue)
        } catch(e) {
          // read error
        }
        console.log('Done.')
      };

    const handleCommentSubmit = () => {
        const text = {
            date: new Date(),
            comments: newCommentText,
            user_name: user,
            subject: subject,
            park_name: fullParkName
        };
        const newComments = comments.concat(text)
        CommentsApiService.postComment(subject, newCommentText, fullParkName, token)
            .then(setComments(newComments))
            .catch(error => console.error(error));
            setSubject('');
            setNewCommentText('');
    };
    return (
            <View style={styles.formBox}>
                <View style={styles.thoughts}>
                    <Text style={styles.thoughtsText}>Leave thoughts, ideas, or recommendations for your fellow parkgoers.</Text>
                </View>
                <View >
                    <TextInput 
                        onChangeText={subject => setSubject(subject)}
                        value={subject}
                        placeholder="subject"
                        style={styles.subject}/>
                    <TextInput 
                        onChangeText={newCommentText => setNewCommentText(newCommentText)}
                        value={newCommentText}
                        placeholder="comment"
                        style={styles.commentText}
                        multiline={true}/>
                </View>
                <View >
                    <TouchableOpacity style={styles.submit} onPress={handleCommentSubmit}>
                        <Text style={styles.submitText}>submit</Text>
                    </TouchableOpacity>
                </View>
            </View>
    )
};

const styles = StyleSheet.create({
    formBox: {
        borderWidth: 3,
        borderColor: "#414f47",
        width: "95%",
        marginLeft: "auto",
        marginRight: "auto",
        borderRadius: 5,
        padding: 5
    },
    thoughts: {
        width: "85%",
        marginTop: 10,
        marginLeft: "auto",
        marginRight: "auto",
        backgroundColor: "#414f47",
        color: "white",
        borderRadius: 5
    },
    thoughtsText: {
        color: "white",
        padding: 10,
        fontSize: 16,
        fontFamily: "Avenir"
    },
    subject: {
        backgroundColor: 'rgba(255,255,255,0.9)',
        height: 50,
        borderRadius: 10,
        width: "90%",
        marginLeft: "auto",
        marginRight: "auto",
        paddingLeft: 8,
        padding: 5,
        fontSize: 18,
        marginBottom: 10,
        marginTop: 15,
        borderWidth: 2,
        fontFamily: "Avenir",
        borderColor: "#414f47"
    },
    commentText: {
        height: 150,
        borderRadius: 10,
        width: "90%",
        fontFamily: "Avenir",
        borderWidth: 2,
        borderColor: "#414f47",
        marginLeft: "auto",
        marginRight: "auto",
        fontSize: 18,
        padding: 5,
        paddingTop: 8,
        marginBottom: 20,
        backgroundColor: 'rgba(255,255,255,0.9)',
    },
    submitText: {
        textAlign: 'center',
        fontSize: 22,
        color: "white",
        fontFamily: "Avenir",
     },
    submit: {
        alignItems: "center",
        backgroundColor: '#414f47cc',
        padding: 10,
        borderRadius: 10,
        borderColor: "white",
        borderWidth: 2,
        width: 200,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: 10,
    },
})