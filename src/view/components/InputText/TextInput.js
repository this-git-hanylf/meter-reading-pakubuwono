import React, {Component} from 'react';
import { View, Picker, StyleSheet, TextInput, Text } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Style from '../../../theme/Style';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default class InputText extends Component{

    constructor(props){
        super(props);

        this.state= {
            isHidden : true
        }
    }

    handleEyeChanger = () =>{
        this.setState({isHidden : !this.state.isHidden},()=>{
            this.refs['input'].blur()
        })
    }

    render(){
        return(
            <View style={[styles.container,this.props.containerStyle,{width: wp(this.props.width),height : hp(this.props.height),}]}>
                <TextInput
                    ref="input"
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
                    secureTextEntry={this.props.password ? this.state.isHidden : false}
                />
                {this.props.password 
                    ? <Icon style={styles.eye} name={this.state.isHidden ? "eye" : "eye-off"} size={5} onPress={()=>this.handleEyeChanger()}/>
                    : null
                }
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
    },
    eye : {
        position: 'absolute',
        right: 10,
        fontSize: 24,
    }
};