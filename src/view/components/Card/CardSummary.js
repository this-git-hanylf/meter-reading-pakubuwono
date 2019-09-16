//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,Dimensions } from 'react-native';
import { Card } from 'react-native-cards';
import { colors, fonts, padding, dimensions, margin } from '@Assets/styles/base';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';



// create a component
class CardSummary extends Component {
    render() {
        const data = this.props.data

        return (
            <View style={styles.container}>
                <View style={styles.cardsumary}>
                <Text style={styles.projectname}>Summary {data.types == "E" ? "Electricity" : data.types == "W" ? "Water" : "Gas" }</Text>
                    <Text style={styles.projecttext}>Project : Ifca Apartement and Residence</Text>
                    <Text style={styles.text}>Total Reading : {data.total}</Text>
                    <Text style={styles.text}>Reading : {data.saved}</Text>
                    <Text style={styles.text}>Unreading: {data.unSaved}</Text>
                </View>
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: padding.sm,
        paddingRight: padding.sm,
        width: dimensions.fullWidth
 
    },
    cardsumary: {
        backgroundColor: '#f8f8f8',
        padding: 24,
        marginTop: 32,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 3, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 1,
        width: null,
        height: 250,
        alignItems:'flex-start',
        justifyContent: 'center',
    },
    projectname: {
        fontSize: fonts.md,
        fontWeight: '400',
        marginBottom: margin.sm,
        color:'#F9A233'
    },
    projecttext: {
        fontSize: fonts.md,
        fontWeight: '300',
        marginBottom: margin.sm
    },
    text: {
        fontSize: fonts.sm,
        fontWeight: "300",
      },
});

//make this component available to the app
export default CardSummary;
