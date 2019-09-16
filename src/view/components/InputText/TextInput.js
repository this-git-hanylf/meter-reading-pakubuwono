import React, {Component} from 'react';
import { View, Picker, StyleSheet, TextInput, Text } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Style from '../../../theme/Style';

export default class InputText extends Component{

    constructor(props){
        super(props);
    }

    render(){
        return(
            <View style={[styles.container,{width: wp(this.props.width),height : hp(this.props.height),}]}>
                <TextInput
                    style={[Style.textBlack,this.props.style]}
                    placeholder={this.props.placeholder}
                    placeholderTextColor={this.props.placeholderTextColor}
                    keyboardType={this.props.keyboardType}
                    onChangeText={this.props.onChangeText}
                    value={this.props.value}
                    numberOfLines={this.props.numberOfLines}
                    onKeyPress={this.props.onKeyPress}
                    onScroll={this.props.onScroll}
                    maxLength={this.props.maxLength}
                    multiline={this.props.multiline}
                >
                </TextInput>
            </View>
        );
    }
}

const styles = {
    container: {
        marginTop: 5,
        paddingLeft : 20,
        backgroundColor: "#FFF",
        alignSelf: "center",
        borderRadius: 16,
        elevation :3,
        justifyContent :'center',
    }
};