//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, AsyncStorage, Dimensions } from 'react-native';
import CardSummary from '../components/Card/CardSummary'
import Query from '@Components/Function/Query';

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

// create a component
class SumaryView extends Component {
    constructor(props){
        super(props)

        this.state = {
            dataSum : null
        }
    }

    componentDidMount(){
        this.getData(this.props.meterType)
    }

    getData = async(type)=>{
        const total = await AsyncStorage.getItem('@DataMeter')
        const saved = await AsyncStorage.getItem('@SaveDataMeter')

        const dataTotal  = JSON.parse(total)
        const resultX = Query(dataTotal, data => data.meter_type)
        const x = !resultX.get(type) ? 0 : resultX.get(type).length

        const dataSaved  = JSON.parse(saved)
        const resultY = Query(dataSaved, data => data.meterType)
        const y = !resultY.get(type) ? 0 : resultY.get(type).length

        const z = x - y

        const data = {
            types : type,
            total : x,
            saved : y,
            unSaved : z
        }        
        this.setState({dataSum : data})
    }

    render() {
        return (
            <View style={styles.container}>
                {this.state.dataSum ? 
                    <CardSummary data={this.state.dataSum} />
                 :
                   <View style={styles.nullList}>
                   <Text style={styles.title}>Data Kosong</Text>
                   </View>                }
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    nullList :{
        height : deviceHeight - (deviceHeight / 3),
        justifyContent :'center',
        alignItems: 'center',
    },
    title :{
        fontSize : 25,
        fontFamily: 'Montserrat-SemiBold',
        color : "#333"
    },
});

//make this component available to the app
export default SumaryView;
