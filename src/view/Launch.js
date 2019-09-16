//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image, AsyncStorage} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Actions } from'react-native-router-flux';
import {USER_KEY} from '@Config/Services';
const { width, height } = Dimensions.get('window');

// create a component
class Launch extends Component {
  state={
      click: false
  }
    async componentDidMount() {
        try {
            const user = await AsyncStorage.getItem(USER_KEY)
            console.log('user: ', user)
            if (user) {
                Actions.home();
            } else {
                Actions.auth();
            }
        } catch (err) {
            console.log('error: ', err)
        }
    }
  clickHome() {
      Actions.home();
      this.setState({click:true})
  }
  clickDownload() {
      Actions.download();
      this.setState({click:true})
  }


    render() {
        return (
            <View style={styles.container}>
                <Text>Loading</Text>
                {/* <View style={[styles.footer]}>
                    <View style={{ height: 55, width: '50%' }}>
                        <TouchableOpacity onPress={()=>this.clickDownload()}>
                            <LinearGradient colors={['#d68a13', '#ff6600', '#ff6600']} style={styles.linearGradient}>
                                <Text style={styles.buttonText}>
                                    Download
                                    </Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                    <View style={{ height: 55, width: '50%' }}>
                        <TouchableOpacity onPress={()=>this.clickHome()}>
                            <LinearGradient colors={['#5e5e5e', '#000', '#000']} style={styles.linearGradient}>
                                <Text style={styles.buttonText}>
                                    Home
                                    </Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>            
                </View> */}
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    imageLogo: {
        width: 110,
        height: 60,
        margin: 20
    },
    imageButton: {

    },
    linearGradient: {
        borderRadius: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 60
    },
    buttonText: {
        fontSize: 18,
        fontFamily: 'Gill Sans',
        textAlign: 'center',
        margin: 10,
        color: '#ffffff',
        backgroundColor: 'transparent',
    },
    footer: {
        height: 50,
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        // backgroundColor: '#8BC34A',
        flexDirection: 'row',
    },
    backgroundVideo: {
        position: 'absolute',
        aspectRatio: 1,
        width: "100%",
        height: height/1

    },
});

//make this component available to the app
export default Launch;
