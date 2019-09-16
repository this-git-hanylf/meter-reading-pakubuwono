//import liraries
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions
} from "react-native";
import { color, fonts, padding, dimensions, margin } from "@Assets/styles/base";
import { Card, CardTitle, CardImage } from "react-native-cards";
import { Actions } from "react-native-router-flux";

// create a component
class CardImages extends Component {
    state={
        click: false
    }
    componentDidMount(){
  
    }
    clickType() {
        Actions.typeproject();
    }
  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <Card>
            <CardImage
              source={require("@Assets/images/ifcaapar.png")}
              style={styles.cardimages}
            />
            <Text style={styles.text}               
            onPress={this.clickType} 
           >
           Ifca Apartment and Residence</Text>
          </Card>
          <Card>
            <CardImage
              source={require("@Assets/images/ifcaapar.png")}
              style={styles.cardimages}
            />
            <Text style={styles.text}> Ifca Apartment and Residence</Text>
          </Card>
          <Card>
            <CardImage
              source={require("@Assets/images/ifcaapar.png")}
              style={styles.cardimages}
            />
            <Text style={styles.text}> Ifca Apartment and Residence</Text>
          </Card>
        </View>
      </ScrollView>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: margin.sm,
    marginBottom: margin.sm
  },
  cardimages: {
    width: Dimensions.get("window").width / 1
  },
  text: {
    fontSize: fonts.md,
    fontWeight: "300",
    marginLeft: margin.md,
    marginBottom: margin.sm

  }
});

//make this component available to the app
export default CardImages;
