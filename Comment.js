import React from 'react';
import moment from 'moment';
import { View, Text, StyleSheet } from 'react-native';
export default function Comment(props){
    const date = props.date;
    const formattedDate = moment(date).format("dddd, MMMM Do YYYY");
    
    return (
                <View style={styles.commentBox}>
                    <View style={styles.headerBox}>
                        <Text style={styles.header}>{props.subject}</Text>
                    </View>
                    <Text style={styles.comment}>{props.comment}</Text>
                    <Text style={styles.user}><Text style={styles.by}>by:</Text>  {props.user}</Text>
                    <Text style={styles.date}><Text style={styles.on}>posted on:  </Text>{formattedDate}</Text>
                </View>
    )
};

const styles = StyleSheet.create({
    commentBox: {
        width: "95%",
        marginLeft: "auto",
        marginRight: "auto",
        backgroundColor: "#414f47",
        marginBottom: 20,
        borderRadius: 5,
        padding: 10
    },
    headerBox: {
        backgroundColor: "white",
        borderRadius: 3,
        marginBottom: 10
    },
    header: {
        fontWeight: "700",
        color: "#414f47",
        fontSize: 20,
        fontFamily: "Avenir",
        padding: 3,
        textAlign: "center"
    },
    by: {
        marginRight: 20,
        fontFamily: "Avenir",
        fontWeight: "700",
        color: "white"
    },
    on: {
        marginRight: 20,
        fontFamily: "Avenir",
        fontWeight: "700",
        color: "white"
    },
    comment: {
        color: "white",
        fontFamily: "Avenir",
        marginBottom: 10,
        fontSize: 16
    },
    user: {
        color: "white",
        fontFamily: "Avenir"
    },
    date: {
        color: "white",
        fontFamily: "Avenir"
    }
})