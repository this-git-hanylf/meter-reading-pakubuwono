import React, {Component} from 'react';
import { View, StyleSheet, TextInput } from 'react-native';

export default class InputNum extends Component{

    render(){
        return(
            <View>
                <TextInput
                    style={styles.inputs}
                    placeholder="Enter Numeric Characters"
                    keyboardType='numeric'
                >
                </TextInput>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    inputs: {
      marginTop: 10,
      backgroundColor: '#E2E1E0',   
      width: 377,
      alignSelf: 'center',
    }
  });