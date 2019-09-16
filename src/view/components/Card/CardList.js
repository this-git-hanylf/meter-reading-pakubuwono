//import liraries
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions
} from "react-native";
import { color, fonts, padding, dimensions, margin } from "@Assets/styles/base";
import { Button } from "react-native-elements";
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux'



// create a component
class CardList extends Component {
    state={
        click: false
    }
    clickSumaryView = (data) => {
        Actions.sumaryview({meterType:data});
    }
    
  render() {
    return (
      <View style={styles.container}>
        <Button 
        buttonStyle={styles.list}
        title="Electricity"
        type="outline"
        onPress={()=>this.clickSumaryView("E")}
         />
        <Button title="Water" type="outline"  buttonStyle={styles.list}
        onPress={()=>this.clickSumaryView("W")}
        />
        <Button title="Gas" type="outline"  buttonStyle={styles.list} 
        onPress={()=>this.clickSumaryView("G")}
        />

      </View>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: margin.sm,
  },
  list: {
    width: Dimensions.get("window").width / 1.2,
    marginBottom: margin.sm,
    borderRadius: 10
  },

});

//make this component available to the app
export default CardList;
