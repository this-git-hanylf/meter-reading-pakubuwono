"use strict";
import React, { Component } from "react";
import { StyleSheet, Text, Alert, View, Button,Dimensions } from "react-native";
import QRCodeScanner from "react-native-qrcode-scanner";
import { Actions } from "react-native-router-flux";
import Icon from "react-native-vector-icons/Ionicons";
import * as Animatable from "react-native-animatable";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;


export default class ReadScan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataqr: "",
      status: "Ready"
    };
  }

  onSuccess(e) {
    this.setState({
      dataqr: this.state.dataqr + ", " + e.data,
      status: "Coba Lagi"
    });
    // Alert.alert(
    //   "QR Code",
    //   "Code : " + e.data,
    //   [{ text: "OK", onPress: () => console.log("OK Pressed") }],
    //   { cancelable: false }
    // );
    setTimeout(()=> {Actions.refresh({type: "reading",meterId: e.data})}, 500); Actions.pop();
  }
  clickReading() {
    Actions.reading();
    this.setState({click:true})
  }

  makeSlideOutTranslation(translationType, fromValue) {
    return {
      from: {
        [translationType]: SCREEN_WIDTH * 0.31
      },
      to: {
        [translationType]: fromValue
      }
    };
  }

  render() {
    return (
      <QRCodeScanner
        onRead={this.onSuccess.bind(this)}
        showMarker = {true}
        cameraStyle={{ height: SCREEN_HEIGHT }}
        customMarker={
          <View style={styles.rectangleContainer}>
            <View style={styles.topOverlay}>
              <Text style={{ fontSize: 30, color: "white" }}>
              </Text>
            </View>

            <View style={{ flexDirection: "row" }}>
              <View style={styles.leftAndRightOverlay} />

              <View style={styles.rectangle}>
               
                <Animatable.View
                  style={styles.scanBar}
                  direction="alternate-reverse"
                  iterationCount="infinite"
                  duration={7000}
                  easing="linear"
                  animation={this.makeSlideOutTranslation(
                    "translateY",
                    SCREEN_WIDTH * -0.31
                  )}
                />
              </View>

              <View style={styles.leftAndRightOverlay} />
            </View>

            <View style={styles.bottomOverlay} />
          </View>
        }
      />
    );
  }
}


const overlayColor = "rgba(0,0,0,0.5)"; // this gives us a black color with a 50% transparency

const rectDimensions = SCREEN_WIDTH * 0.65; // this is equivalent to 255 from a 393 device width
const rectBorderWidth = SCREEN_WIDTH * 0.002; // this is equivalent to 2 from a 393 device width
const rectBorderColor = "#22ff00";

const scanBarWidth = SCREEN_WIDTH * 0.62; // this is equivalent to 180 from a 393 device width
const scanBarHeight = SCREEN_WIDTH * 0.0025; //this is equivalent to 1 from a 393 device width
const scanBarColor = "#22ff00";

const iconScanColor = "#f3f3f3";


const styles = StyleSheet.create({
  conMain: {
    flex: 1
  },
  conHeader: {
    flex: 1,
    backgroundColor: "#6200EE",
    alignItems: "center",
    justifyContent: "center"
  },
  textHeader: {
    fontSize: 18,
    color: "white"
  },
  conQR: {
    flex: 1,
  },
  centerText: {
    fontSize: 12,
    color: "#777"
  },


  rectangleContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent"
  },

  rectangle: {
    height: rectDimensions,
    width: rectDimensions,
    borderWidth: rectBorderWidth,
    borderColor: rectBorderColor,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent"
  },

  topOverlay: {
    flex: 1,
    height: SCREEN_WIDTH,
    width: SCREEN_WIDTH,
    backgroundColor: overlayColor,
    justifyContent: "center",
    alignItems: "center"
  },

  bottomOverlay: {
    flex: 1,
    height: SCREEN_WIDTH,
    width: SCREEN_WIDTH,
    backgroundColor: overlayColor,
    paddingBottom: SCREEN_WIDTH * 0.25
  },

  leftAndRightOverlay: {
    height: SCREEN_WIDTH * 0.65,
    width: SCREEN_WIDTH,
    backgroundColor: overlayColor
  },

  scanBar: {
    width: scanBarWidth,
    height: scanBarHeight,
    backgroundColor: scanBarColor
  }
});
