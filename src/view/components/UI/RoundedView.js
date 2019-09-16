import React, { Component } from "react";
import { View,Text,StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import PropTypes from 'prop-types';
class RoundedView extends React.PureComponent {
    render() {
        return (
            <View key={this.props.key} style={[this.props.style,styles.container,{width: wp(this.props.width),height : hp(this.props.height),}]}>
                {this.props.renderContent}
            </View>
        );
    }
}
export default RoundedView;

RoundedView.propTypes = {
    renderContent : PropTypes.object,
    width : PropTypes.string,
    height : PropTypes.string,
}

const styles = {
    container: {
        marginTop : 5,
        paddingLeft : 20,
        backgroundColor: "#FFF",
        alignSelf: "center",
        borderRadius: 16,
        elevation :3,
        justifyContent :'center',
    }
};