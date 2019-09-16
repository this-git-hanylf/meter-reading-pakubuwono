import React, {Component} from 'react';
import { View, Picker, StyleSheet, TextInput, Text } from 'react-native';

export default class InputEmail extends Component{

    constructor(props){
        super(props);
    }


    render(){
        return(
            <View>
                <TextInput
                    style={styles.inputs}
                    placeholder="Enter an Email"
                    keyboardType={"email-address"}
                    onChangeText={this.props.onChangeText}
                    value={this.props.value}
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