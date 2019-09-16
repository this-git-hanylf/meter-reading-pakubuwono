//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, ScrollView, TouchableOpacity} from 'react-native';
import { color, fonts, padding, dimensions } from '@Assets/styles/base';
import CardImages from '../components/Card/CardImages';


// create a component
class Project extends Component {
    state={
        click: false
    }
    componentDidMount(){
  
    }
    clickType() {
        Actions.typeproject();
    }
    
    render() {
        return (
            <ScrollView>
            <View style={styles.container}>
            <CardImages/>
            </View>
            </ScrollView>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: padding.sm,
       paddingRight: padding.sm,
       width: dimensions.fullWidth
    },
});

//make this component available to the app
export default Project;
