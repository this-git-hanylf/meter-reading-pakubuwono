//import liraries
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  AsyncStorage,
  Image,
  ActivityIndicator
} from "react-native";
import { color, fonts, padding, dimensions, margin } from "@Assets/styles/base";
import DatePicker from "../components/Datepicker";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import TextInputs from "../components/InputText/TextInput";
import MeterPhoto from "../components/Uploadimage";
import Query from "@Components/Function/Query";
import Tooltip from 'rn-tooltip';
import { Button } from "react-native-elements";
import CAlert from '@Components/Alert/CAlert';
import MAIN from '@Assets/styles/Theme'
import Style from '../../theme/Style';
const Alert = new CAlert()



// create a component
class ReadingForm extends Component {
  mounted = false;

  constructor(props) {
    super(props);

    this.state = {
      meterId: "",
      cpName: "",
      lotNo: "",
      meterType: "",
      meteran: "",
      dataMeter: null,
      readingDate : new Date(),
      dataPict: [],
      isloading: false,
      loadingText: "Loading..."
    };
    this.saveImage = this.saveImage.bind(this);
    this.removeImage = this.removeImage.bind(this);
  }

  componentDidMount() {
    this.mounted = true;
    this.getData(this.props.meterId);
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  getData = async (data) => {

    const saveDataAsync = await AsyncStorage.getItem("@SaveDataMeter");
    const keySaveData = {a : 'meterId',b : data}
    const cek = this.cekStore(saveDataAsync,keySaveData);
    console.log('cek',cek);
    if(cek.length !==0){
      const dataParse = {
        readingDate : cek[0].readingDate,
        meterId : cek[0].meterId,
        cpName : cek[0].cpName ,
        lotNo : cek[0].unitNo ,
        lastRead : cek[0].lastRead,
        meterType : cek[0].meterType ,
        meteran : cek[0].meteran ,
        dataMeter : cek[0].dataMeter ,
        dataPict : cek[0].dataPict ,
      }
      this.setState(dataParse,()=>{console.log('this.state',this.state);})
    } else {
      const dataAsync = await AsyncStorage.getItem("@DataMeter");
      const keyData = {a:'meter_id',b:data}
      const cek2 = this.cekStore(dataAsync,keyData)
      console.log('cek2',cek2);
      if(cek2.length !== 0){
        const x = cek2[0]
        const datas = {
          meterId: x.meter_id,
          cpName: x.debtor_name,
          lotNo: x.lot_no,
          lastRead: x.last_read,
          meterType: x.meter_type,
          dataMeter: {
            ...x
          }
        };
        if (this.mounted) {
          this.setState(datas);
        }
      } else {
        Alert.show('No Data Available','pop')
      }
    }
  };

  cekStore = (data,key) => {
    const dataJson = JSON.parse(data);
    let result = ''
    if(dataJson){
      result = dataJson.filter(item => item[key.a] == key.b)
    }

    return result;
  }

  clickSave = () => {
    
    const x = this.state;
    const data = {
      entity : x.dataMeter.entity_cd,
      project : x.dataMeter.project_no.trim(),
      meterId: x.meterId,
      cpName: x.cpName,
      unitNo: x.lotNo,
      lastRead: x.lastRead,
      meterType: x.meterType,
      meteran: x.meteran,
      dataMeter: x.dataMeter,
      readingDate: new Date(),
      dataPict: x.dataPict
    };
    console.log('data',parseFloat(x.lastRead) + "|" + parseFloat(x.meteran));
    if(parseFloat(x.lastRead) <= (parseFloat(x.meteran))){
      this.saveData(data);
    } else {
      Alert.show("Meteran doesn't allow low than last read","cl");
    }
  };

  saveData = async data => {

    this.setState({ isloading: true, loadingText: "Saving Meteran" });
    Alert.show('Data saved sucessfuly','pop')
    console.log(data);
    const dataAsync = await AsyncStorage.getItem("@SaveDataMeter");
    if (dataAsync !== null) {
      const ds = JSON.parse(dataAsync);
      const datas = ds.filter(item => item.meterId !== data.meterId);

      const dataArray = [];
      dataArray.push(...datas, data);
      console.log("dataArray", dataArray);
      this._storeData("@SaveDataMeter", JSON.stringify(dataArray));
    } else {
      const dataArray = [];
      dataArray.push(data);
      console.log(JSON.stringify(dataArray));
      this._storeData("@SaveDataMeter", JSON.stringify(dataArray));
    }

    // const dataJson = JSON.stringify(data)
    // this._storeData('@SaveDataMeter',dataJson)
  };

  saveImage(data) {
    this.setState(
      state => ({
        dataPict: [...state.dataPict, data]
      }),
      () => {
        console.log("SaveImage", this.state.dataPict);
      }
    );
  }

  removeImage(data){
    const dataImage = this.state.dataPict
    const remImage = dataImage.filter(item=>item.fileName !== data)
    this.setState({dataPict : remImage})
  }

  _storeData = async (name, data) => {
    try {
      await AsyncStorage.setItem(name, data);
    } catch (error) {
      console.log("ErrorStoreData", error);
    }
  };

  render() {
    let data = this.state;
    console.log('data',);

    const satuan = {
      W : "m2",
      E : "Kwh",
      G : "gas"
    }

    return (
      <ScrollView>
        <View style={styles.container}>
          <Text style={[Style.textBlack,styles.text]}>Date Reading</Text>
          <DatePicker 
            style={styles.dates}
            date={this.state.readingDate}
            format={'YYYY-MM-DD'}            
            onChange={(date)=>this.setState({readingDate:date})}
          />
          
          <View style={styles.cardsumary}>     
            <Text style={[Style.textBlack,styles.text]}>Meter ID : {data.meterId}</Text>
            <Text style={[Style.textBlack,styles.text]}>Debtor : {data.cpName}</Text>
            <Text style={[Style.textBlack,styles.text]}>Lot No : {data.lotNo}</Text>
            <Text style={[Style.textBlack,styles.text]}>
              Last Read : {parseFloat(data.lastRead)} {" "+satuan[data.meterType]}
            </Text>
          </View>
          <Text style={[Style.textBlack,styles.text]}>Input Meteran</Text>
          <TextInputs
            width="85%"
            height="7%"
            value={data.meteran}
            keyboardType="numeric"
            placeholder="Please Input Meteran"
            onChangeText={val => this.setState({ meteran: val })}
          />

          <MeterPhoto style={styles.media} image={this.saveImage} photos={this.state.dataPict} remove={this.removeImage} />
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.clickSave()}
          >
            <Text style={[Style.textBlack,styles.textscan]}>Save</Text>
          </TouchableOpacity>
          {/* <Text style={styles.text}>Meter ID</Text>
          <TextInputs
            width="85%"
            height="7%"
            value={data.meterId}
            onChangeText={val => this.setState({ meterId: val })}
          />
          <Text style={styles.text}>Company Name</Text>
          <TextInputs
            width="85%"
            height="7%"
            value={data.cpName}
            onChangeText={val => this.setState({ cpName: val })}
          />
           <Text style={styles.text}>Customer Name</Text>
        <TextInputs width='85%' height="7%" value={data.csName} onChangeText={(val)=>this.setState({csName:val})} /> 
          <Text style={styles.text}>Lot No.</Text>
          <TextInputs
            width="85%"
            height="7%"
            value={data.lotNo}
            onChangeText={val => this.setState({ lotNo: val })}
          /> */}
        </View>
        </ScrollView>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    paddingLeft: padding.sm,
    paddingRight: padding.sm,
    width: dimensions.fullWidth
  },
  dates: {
    paddingVertical: 2,
    width: wp("85%"),
    backgroundColor: "#FFF",
    alignSelf: "center",
    borderRadius: 16,
    elevation :3,
    justifyContent :'center',
    borderWidth: 0,
  },
  media: {
    marginTop: margin.sm,
  },
  text: {
    marginTop: 16,
    fontSize: fonts.sm,
    fontWeight: "300",
    marginLeft: margin.sm
  },
  textscan: {
    fontSize: 20,
    fontWeight: "700",
    color: "#fff"
  },
  inputText: {
    // flexDirection: "row",
    // marginTop: margin.sm,
    // backgroundColor: "#E2E1E0",
    // width: wp("85%"),
    // alignSelf: "center"
  },
  button: {
    width: null,
    height: hp("7%"),
    borderRadius: 30,
    backgroundColor: MAIN.COLORS.PRIMARY,
    justifyContent: "center",
    alignItems: "center",
    margin: margin.lg,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 3, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 3,
  },
  cardsumary: {
    backgroundColor: MAIN.COLORS.CLEAN,
    paddingBottom: padding.sm,    
    marginTop: margin.sm,
    marginBottom:margin.sm,
    marginHorizontal: margin.sm,
    borderRadius: 20,
    elevation: 3,
    width: null,
    height: null,
    justifyContent: 'center',
},
});

//make this component available to the app
export default ReadingForm;
