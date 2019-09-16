import React, { Component } from "react";
import { View,Text,StyleSheet,Picker,AsyncStorage ,TouchableOpacity, ActivityIndicator, Modal} from "react-native";
import { color, fonts, padding, dimensions, margin } from "@Assets/styles/base";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {urlApi} from '@Config/Services';
import Style from '../../theme/Style';
import RoundedView from '@Components/UI/RoundedView';

class Download extends Component {
    _isMount = false;

    constructor(props){
        super(props)

        this.state = {
            tower : '',
            email : '',
            isProgress: false,


            dataTower : []
        }

    }


    async componentDidMount(){
        this._isMount = true

        const datas =  {
            email : await AsyncStorage.getItem("@User")
        }

        this.loadData(datas)
    }

    componentWillUnmount(){
        this._isMount = false        
    }

    loadData = (data) =>{
        if(this._isMount){
            this.setState(data,()=>{
                this.getTower()
            })
        }
    }

    getTower = () => {
        let email = this.state.email;
        fetch(urlApi+'c_product_info/getData/IFCAMOBILE/' +email ,{
            method : "GET",
        })
        .then((response) => response.json())
        .then((res)=>{
            if(res.Error === false){
                let resData = res.Data
                console.log('resData',resData);
                this.setState({dataTower:resData,tower:resData[0]})
            }
        }).catch((error) => {
            console.log(error);
        });
    }

    download = async() =>{
        const data = this.state.dataTower.filter(item => item.project_no == this.state.tower.project_no);
        this.setState({isProgress:!this.state.isProgress});

        let project_no = data[0].project_no
        let db = data[0].db_profile

        await fetch(urlApi+'c_meter_utility/getDataMu/'+db+'/'+project_no,{
            method : "GET",
        })
        .then((response) => response.json())
        .then((res)=>{
            if(!res.Error){
                this.pushToStorage(res.Data)                
            } else {
                alert(res.Pesan);
            }

            this.setState({isProgress : !this.state.isProgress})
        }).catch((error) => {
            console.log(error);
            this.setState({isProgress : !this.state.isProgress})
        });
    }

    pushToStorage = async (data) =>{
        const { entity_cd, project_no } = this.state.tower

        const dataMeter = await this._getData('@DataMeter');
        const deleteDuplicateData = dataMeter.filter(item => item.project_no.trim() !== project_no && item.entity_cd.trim() !== project_no);
        const newData = [...deleteDuplicateData, ...data];
        this._storeData('@DataMeter',JSON.stringify(newData));
        this._storeData('@DataTower',JSON.stringify(this.state.dataTower));
        alert("Download Successful");
    }

    _storeData = async (name,data) =>{
        try {
            await AsyncStorage.setItem(name,data)
        } catch (error) {
            console.log('ErrorStoreData', error)
        }
    }

    _getData = async (name) => {
        try {
            const value = await AsyncStorage.getItem(name)
            let item = '';
            try {
                item = JSON.parse(value);
            } catch (error) {
                item = value;
            }
            return item
            
        } catch(error) {
            console.log('ErrorGetData', error)
        }
    }

    renderPicker(){
        return(
            <Picker
                selectedValue={this.state.tower}
                mode={this.props.model}
                itemStyle={[Style.textBlack,{borderRadius :20}]}
                onValueChange={(itemValue, itemIndex) =>
                    this.setState({ tower: itemValue })
                }
            >
                {this.loadOffice()}
            </Picker>
        )
    }

    loadOffice() {
        return this.state.dataTower.map((data,key) => (
          <Picker.Item key={key} label={data.project_descs} value={data} />
        ));
    }

    render() {
        return (
            <View style={styles.container}>
                <CustomProgressBar visible={this.state.isProgress} />
                <View style={{height : 20}} />
                <RoundedView renderContent={this.renderPicker()} width='85%' height="8%"/>
                <TouchableOpacity style={styles.button} onPress={()=>this.download()}>
                    <Text style={[Style.textWhite,styles.textscan]}>Download</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
const CustomProgressBar = ({ visible }) => (
    <Modal onRequestClose={() => null} visible={visible} transparent>
      <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', alignItems: 'center', justifyContent: 'center' }}>
        <View style={{ borderRadius: 10, backgroundColor: 'white', padding: 25 }}>
          <Text style={Style.textBlack}>Loading</Text>
          <ActivityIndicator size="large" color="#0000ff" timestamp="1000" />
        </View>
      </View>
    </Modal>
  );

export default Download;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor : '#fff'
    },
    picker: {
        marginTop: 24,
        backgroundColor: "#FFF",
        width: wp('80%'),
        alignSelf: "center",
        borderRadius: 5,
        borderColor: '#000',
        borderWidth: 1,
    },
    button: {
        width: null,
        height: hp('7%'),
          borderRadius: 30,
          backgroundColor: "#4A98F7",
          justifyContent: "center",
          alignItems : "center",
          margin: margin.lg
      },
      textscan: {
        fontSize: fonts.sm,
       fontWeight: "700",
       color: "#fff"
     },
});