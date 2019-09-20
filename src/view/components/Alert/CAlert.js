import React, { Component } from "react";
import { View,Text,StyleSheet,Alert } from "react-native";
import { Actions } from "react-native-router-flux";
// !!! Ini belum benar
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

    popWithData : (data)=>{
        setTimeout(()=> {Actions.refresh(data)}, 500); Actions.pop();
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

    show (msg,action='cl',data=''){
        Alert.alert(
        "Alert",
        '"'+msg+'"',
        [{ text: "OK", onPress: () => fn[action](data) }],
        { cancelable: false })
    }
}
export default CAlert;
