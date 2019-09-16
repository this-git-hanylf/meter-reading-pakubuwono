import React, { Component } from "react";
import { View,Text,StyleSheet,Alert } from "react-native";
import { Actions } from "react-native-router-flux";

pop = () =>{
    Actions.pop()
}

const fn = {
    cl : ()=>{
        console.log('OK Pressed')
    },

    pop : ()=>{
        Actions.pop()
    },

    popToRoot : (to)=>{
        Actions.reset(to)
    },

    reset : (to)=>{
        Actions.reset(to)
    },

    push : ()=>{
        Actions.push(to)
    }
    
}

class CAlert extends React.PureComponent {
    constructor(props){
        super(props)
    }

    show (msg,action='cl',to=''){
        Alert.alert(
        "Alert",
        '"'+msg+'"',
        [{ text: "OK", onPress: () => fn[action](to) }],
        { cancelable: false })
    }
}
export default CAlert;
