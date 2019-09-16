import React, { Component } from "react";
import { View,Text,StyleSheet,ActivityIndicator } from "react-native";

class Loader extends React.PureComponent {
    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" />
            </View>
        );
    }
}
export default Loader;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});