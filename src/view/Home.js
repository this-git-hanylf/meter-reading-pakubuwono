//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Button, AsyncStorage,ProgressBarAndroid ,Alert} from 'react-native';
import { color, fonts, padding, dimensions } from '@Assets/styles/base';
import Style from '../theme/Style';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Actions } from 'react-native-router-flux'
import * as Progress from 'react-native-progress';
import Query from '@Components/Function/Query';
import {urlApi} from '@Config/Services';
import {USER_KEY} from '@Config/Services';
import MAIN from '@Assets/styles/Theme'
import Icon from "react-native-vector-icons/Ionicons";

// create a component

class Home extends Component {
    state={
        click: false,
        progress : 0,
        showProgress : false,
        indeterminate : false
    }
    async componentDidMount(){
        const res = await AsyncStorage.getAllKeys();
        console.log('Result Async',res);
    }

    animate() {
        let progress = 0;
        this.setState({progress, showProgress:true,indeterminate:true });
        setTimeout(() => {
          this.setState({ indeterminate: false });
          setInterval(() => {
            progress += 0.01;
            if (progress > 1) {
                this.setState({progress:0, showProgress : false});

            }
            this.setState({ progress});
          }, 1);
        }, 1500);
      }
    
    clickToNavigate = async(to,param) =>{
        const dataAsync = await AsyncStorage.getItem("@DataMeter");
        if(dataAsync || to == 'download' || to=='setting'){
            Actions[to](param);
            this.setState({click:true})
        } else {
            alert('You must download first !')
        }
        
    }

    getData = async(data)=>{
        const dataAsync = await AsyncStorage.getItem('@DataMeter')
        let dataJson = JSON.parse(dataAsync)

        const result = Query(dataJson, data => data.meter_id)

        console.log(result.get(data))
        alert("Last Read : "+result.get(data)[0].last_read)
        
    }

    _storeData = async (name,data) =>{
        try {
            await AsyncStorage.setItem(name,data)
        } catch (error) {
            console.log('ErrorStoreData', error)
        }
    }
  
    render() {
        return (
            <View style={styles.container}>
               <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                    <Image 
                    style={styles.iconlogo}
                    source={require('@Assets/images/login/logo-biru.png')}/>
                    <TouchableOpacity onPress={()=>this.clickToNavigate('setting')} >
                        <Icon name="md-settings" style={{fontSize : 34,color : MAIN.COLORS.PRIMARY}} />
                        {/* <Text style={[Style.textBlue,{color : MAIN.COLORS.PRIMARY,fontSize : 15}]}>Setting</Text> */}
                    </TouchableOpacity>
               </View>
               <TouchableOpacity style={styles.download} onPress={()=>this.clickToNavigate('download')}>
               <Image 
                style={styles.icondonwload} 
                source={require('@Assets/images/menu-dash/download.png')}/>
                  <Text style={[Style.textBlue,styles.text]}>Download</Text>
                  {this.state.showProgress ? 
                  <ProgressBarAndroid styleAttr="Horizontal"  progress={this.state.progress} indeterminate={this.state.indeterminate} width={200} />
                  :
                  null
                  }
               </TouchableOpacity>
               <View style={styles.menu}>
                  <TouchableOpacity style={styles.reading}
                  onPress={() => this.clickToNavigate('reading')}>
                   <Image 
                   style={styles.icondonwload}
                   source={require('@Assets/images/menu-dash/reading.png')}/>
                   <Text style={[Style.textBlue,[Style.textBlue,styles.text]]}>Reading</Text>     
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.reading}
                  onPress={()=>this.clickToNavigate('sumaryview')}>
                   <Image 
                   style={styles.icondonwload}
                   source={require('@Assets/images/menu-dash/group.png')}/>
                   <Text style={[Style.textBlue,styles.text]}>Summary</Text>     
                  </TouchableOpacity>
               </View>
               <View style={styles.menu}>
                  <TouchableOpacity style={styles.reading}
                  onPress={()=>this.clickToNavigate('filterSearch')}>
                   <Image 
                   style={styles.icondonwload}
                   source={require('@Assets/images/menu-dash/search.png')}/>
                   <Text style={[Style.textBlue,styles.text]}>Search</Text>     
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.reading}
                  onPress={()=>this.clickToNavigate('uploadAll')}>
                   <Image 
                   style={styles.icondonwload}
                   source={require('@Assets/images/menu-dash/upload.png')}/>
                   <Text style={[Style.textBlue,styles.text]}>Upload</Text>     
                  </TouchableOpacity>
               </View>
            </View>
        );
    }
}
 
// define your styles
const styles = StyleSheet.create({
    container: {
        flex :1,
        paddingLeft: padding.sm,
        paddingRight: padding.sm,
        width: dimensions.fullWidth,
        backgroundColor: '#FFFFFF',
    },
    icondonwload: {
        height: 55,
        width: 55,
        alignItems: 'center',
    },
    iconlogo: {
        height: 58,
        width: 58,
        alignItems:'flex-end',
        marginBottom: 16,
        marginTop: 20
    },
    menu: {
        flexDirection: 'row',
        justifyContent:'space-between',
        marginTop: 16
    },
    reading: {
        backgroundColor: '#FFFFFF',
        padding: 24,
        borderRadius: 16,
        elevation: 10,
        width: wp('43%'),
        height: hp('25%'),
        alignItems:'center',
        justifyContent: 'center',
    },
    download: {
        backgroundColor: '#fff',
        padding: 24,
        borderRadius: 16,
        shadowColor: '#000',
        shadowOffset: { width: 3, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 10,
        width: null,
        height: null,
        alignItems:'center',
        justifyContent: 'center',
    },
    textdownload: {
        fontSize: fonts.sm,
        fontWeight: '300',
        color: '#F4B132'
    },
    text: {
        fontSize: fonts.sm,
        fontWeight: '300',
        marginTop: 8,
        color: MAIN.COLORS.PRIMARY
    },
    btnLogout :{
        backgroundColor: '#fff',
        elevation : 20,
        borderRadius : 16,
        paddingHorizontal: 20,
        paddingVertical: 5,
        flexDirection : 'row',
        justifyContent : 'space-around',
        alignItems : 'center'
    }
});
//make this component available to the app
export default Home;
