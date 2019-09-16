import React, {Component} from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import Icon  from 'react-native-vector-icons/FontAwesome';

export default class InputPass extends Component{

    constructor(props){
        super(props);
        this.state = {
            secureTextEntry: true,
            iconName: "eye"
        }
    }

    onIconPress = () => {
        let iconName = (this.state.secureTextEntry) ? "eye-slash" : "eye";

        this.setState({
            secureTextEntry: !this.state.secureTextEntry,
            iconName: iconName
        });
    }

    render(){
        return(
            <View style={ styles.inputs }>
                <TextInput {...this.props}
                    style={{ flex:1 }}
                    secureTextEntry={this.state.secureTextEntry}
                    placeholder="  Type a Password..."
                />
                <TouchableOpacity onPress={this.onIconPress}>
                    <Icon name={this.state.iconName} size={20} style={{ marginTop: 10, marginRight: 10 }} />
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    inputs: {
      flexDirection: 'row',
      marginTop: 10,
      backgroundColor: '#E2E1E0',   
      width: 377,
      alignSelf: 'center',
    }
  });