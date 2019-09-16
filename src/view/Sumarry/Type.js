//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import CardList from '../components/Card/CardList'



// create a component
class TypeProject extends Component {
    
    render() {
        return (
            <View style={styles.container}>
            <CardList />
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

//make this component available to the app
export default TypeProject;
