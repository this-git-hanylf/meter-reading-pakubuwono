import React, { Component } from "react";
import { View,Text,StyleSheet,TextInput,TouchableOpacity, Dimensions } from "react-native";
import { color, fonts, padding, dimensions, margin ,background,colors} from "@Assets/styles/base";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Actions } from "react-native-router-flux";
import TextInputs from "../components/InputText/TextInput";
import Icon from 'react-native-vector-icons/FontAwesome'
import MAIN from '@Assets/styles/Theme'
import Style from './../../theme/Style';

class FilterSearch extends Component {

    constructor(props){
        super(props)

        this.state = {
            txtSearch : '',
        }
    }

    clickReadingScan() {
        Actions.readingScan();
        this.setState({click:true})
    }

    componentWillReceiveProps(props){
        this.setState({txtSearch : props.meterId},()=>{
            Actions.viewSearch({meterId : this.state.txtSearch.toUpperCase()})
        })
    }

    search = () => {
        Actions.viewSearch({meterId : this.state.txtSearch.toUpperCase()})
    }

    render() {
        return (
            <View style={styles.container}>
                
                <Text style={[Style.textBlack,styles.text]}>Meter ID</Text>
                <View style={styles.readForm}>
                    <TextInputs width='66%' height="8%" placeholder="Input Meter ID" value={this.state.txtSearch} onChangeText={(val)=>this.setState({txtSearch:val})} />
                    <TouchableOpacity style={styles.btnScan} onPress={()=>this.clickReadingScan()} >
                        <Icon name="qrcode" size={25} />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.button} onPress={()=>this.search()}>
                    <Text style={[Style.textWhite,styles.textscan]}>Search</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
export default FilterSearch;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: background.primary
    },
    text: {
        marginTop: margin.sm,
        fontSize: fonts.sm,
        fontWeight: "300",
        marginLeft: margin.lg
    },
    read: {
        marginTop: 24,
        backgroundColor: "#FFF",
        width: wp('80%'),
        alignSelf: "center",
        borderRadius: 5,
    },
    button: {
        width: null,
        height: hp('7%'),
        borderRadius: 30,
        backgroundColor: MAIN.COLORS.PRIMARY,
        justifyContent: "center",
        alignItems : "center",
        margin: margin.lg
    },
    textscan: {
        fontSize: fonts.sm,
        fontWeight: "700",
        color: "#fff"
    },
    btnScan : {
        marginTop: 5,
        backgroundColor: "#fff",
        width : wp('16%'),
        height : hp('8%'),
        justifyContent :'center',
        alignItems :'center',
        borderRadius : 16,
        elevation :8
    },  
    readForm : {
        flexDirection : 'row',
        width: wp('85%'),
        alignSelf: "center",
        justifyContent:'space-between'
    },
    
     
});