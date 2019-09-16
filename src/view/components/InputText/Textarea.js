import React, {Component} from 'react';
import { View, StyleSheet, TextInput } from 'react-native';

export default class InputTextArea extends Component{

    render(){
        return(
            <View>
                <TextInput
                    style={styles.inputs}
                    placeholder="  Enter your Comments..."
                    multiline={true}
                    numberOfLines={5}
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