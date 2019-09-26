import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    FlatList,
    AsyncStorage,
    Image,
    TouchableOpacity,
    Dimensions,
    Picker,
    Modal,
    Alert,
    ScrollView
 } from "react-native";
import Styles from './Style';
import moment from "moment"
import RNFetchBlob from 'rn-fetch-blob';
import {urlApi} from '@Config/Services';
import Style from "../../theme/Style";
import { Actions } from 'react-native-router-flux'
import RoundedView from '@Components/UI/RoundedView';
import Icon from "react-native-vector-icons/Ionicons";
import {background,fonts,colors} from '@Assets/styles/base';
import { Distinct } from "@Components/Function/Query";
import MAIN from '@Assets/styles/Theme'
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
const type = {
    E : 'Electric',
    W : 'Water',
    G : 'Gas'
}
import CSpinner from '../components/Alert/CSpinner';

class SummaryView extends Component {

    constructor(props){
        super(props)

        this.state = {
            dataAll : [],
            dataMeterAll:[],
            dataMeter : [],
            dataSave : [],
            dataTower : [],
            dataCount : {
                total: 0,
                reading : 0,
                unreading : 0
            },
            selTower : '',
            selTab:'Electric',
            selType : 'E',
            selPhotos :{
                id : '',
                dataPhoto : []
            },
            name : '',
            selModal : false,
            viewI : false,
            isLoading : false
        }
    }

    componentDidMount(){
        this.getData()
    }
    
    getData = async() =>{
        const dataAll = await AsyncStorage.getItem('@DataMeter')
        const dataAsyncSave = await AsyncStorage.getItem('@SaveDataMeter')
        const dataAsyncTower = await AsyncStorage.getItem('@DataTower')
        const name = await AsyncStorage.getItem('@Name')
        if(dataAsyncSave){
            const dataAlls = JSON.parse(dataAll)
            const dataMeters = JSON.parse(dataAsyncSave)
            const dataTowers = JSON.parse(dataAsyncTower)

            const dataSaves = dataMeters.filter(item => item.entity.trim() == dataTowers[0].entity_cd && item.project.trim() == dataTowers[0].project_no && item.meterType == this.state.selType);

            const dataAl = dataAlls.filter(item => item.meter_type == this.state.selType  && item.project_no.trim() == dataTowers[0].project_no && item.entity_cd.trim() == dataTowers[0].entity_cd)
            const dataCounts = {
                total : Distinct(dataAl,"meter_id").length,
                reading : dataSaves.length,
                unreading : Distinct(dataAl,"meter_id").length - dataSaves.length
            }

            const data = {
                dataAll : dataAlls,
                dataTower : dataTowers,
                dataMeterAll : dataMeters,
                dataMeter : dataMeters,
                dataSave : dataSaves,
                selTower : dataTowers[0],
                dataCount : dataCounts,
                name : name
            }

            this.setState(data)
        } else {
            const dataAlls = JSON.parse(dataAll)
            const dataTowers = JSON.parse(dataAsyncTower)
            const dataAl = dataAlls.filter(item => item.meter_type == this.state.selType && item.project_no.trim() == dataTowers[0].project_no && item.entity_cd.trim() == dataTowers[0].entity_cd)

            const dataCounts = {
                total : Distinct(dataAl,"meter_id").length,
                reading : 0,
                unreading : Distinct(dataAl,"meter_id").length
            }

            const data = {
                dataAll : dataAlls,
                dataTower : dataTowers,
                selTower : dataTowers[0],
                dataCount : dataCounts,    
            }
            this.setState(data)
        }
    }

    seeAll = () =>{
        this.state.dataSave.length !== 0 ?
        this.setState({selModal : true})
        :
        alert('Your data is empty !')

    }
    
    uploadAll = ()=>{
        this.state.dataSave.length !== 0 ?
        this.state.dataSave.map((data) =>{
            this.uploadData(data)
        }) 
        :
        alert('Your data is empty !')
    }

    uploadData = (data) =>{
        const dm = data.dataMeter
        const tw = this.state.selTower
        this.setState({isLoading :true});
        const formData = {
            cons  : tw.db_profile,
            entity : dm.entity_cd.trim(),
            project : dm.project_no.trim(),
            type : data.meterType,
            meterId : data.meterId,
            readDate : moment(data.readingDate).format('YYYYMMDD'),
            lot_no : dm.lot_no,
            curr_read : data.meteran,
            curr_read_high : null,
            audit_user : this.state.name
        }

        console.log('formData',formData);
        // this.delete(formData)

        fetch(urlApi+'c_meter_utility/saveDataMu',{
          method : "POST",
          body :JSON.stringify(formData)
        })
        .then((response) => response.json())
        .then((res)=>{
            console.log('response', res)
            if(!res.Error){
                if(data.dataPict.length !== 0){
                    this.uploadPhoto(data)
                } else {
                    alert(res.Pesan)
                    this.delete(formData)
                }
            }
        }).catch((error) => {
            console.log(error);
        });

    }

    uploadPhoto = (data) =>{

        const tw = this.state.selTower
        const dm = data.dataMeter

        const datas = {
            cons : tw.db_profile,
            entity : dm.entity_cd.trim(),
            project : dm.project_no.trim(),
            meterType : data.meterType,
            meterId : data.meterId,
            lotNo : dm.lot_no,
            readDate : moment(data.readingDate).format('YYYYMMDD'),
            debtorAcct : dm.debtor_acct,
            audit_user : this.state.name
        }

        console.log('dataData',datas);

        const dataPict = data.dataPict

        dataPict.map((images,index)=>{
            let fileName =  'Meter_' + moment(new Date).format('MMDDYYYY') + '_ticket_' + (index+1) +'.jpg';
            let fileImg = RNFetchBlob.wrap(images.uri);

            const frmData = {
                data : datas,
                seq_no_pict : index
            } 

            RNFetchBlob.fetch('POST', urlApi+'c_meter_utility/saveAttachment/IFCAPB', {
                'Content-Type' : 'multipart/form-data',
            }, [
                { name : 'photo', filename : fileName, data: fileImg},
                { name : 'data', data: JSON.stringify(frmData)},
            ])
            .then((response) => response.json())
            .then((resp) => {
                console.log('resp', resp)
                if(!resp.Error){
                    if((index+1) === dataPict.length){
                        console.log('index',index+1);
                        console.log('dataPict Lengt',dataPict.length);
                        alert(resp.Pesan)
                        this.delete(datas)
                    }
                }
                
            }).catch((error) => {
                console.log('Error =>>',error);
            });

        })
       
    }

    delete(key) {
        
        const dataMeters = this.state.dataMeter.filter(item => item.meterId !== key.meterId);
        const dataSaves = this.state.dataSave.filter(item => item.meterId !== key.meterId);
        const dataAlls = this.state.dataAll.filter(item => item.meter_type == this.state.selType )
        const dataCounts = {
            total : dataAlls.length,
            reading : dataSaves.length,
            unreading : dataAlls.length - dataSaves.length
        }
        console.log('dataMeters',dataMeters);
        console.log('dataSaves',dataSaves);        
        this.setState({dataMeter:dataMeters,dataSave : dataSaves,dataCount:dataCounts, isLoading : false},()=>{
            this._storeData('@SaveDataMeter',JSON.stringify(this.state.dataMeter))
            if(this.state.dataCount.reading == 0){
                this.setState({selModal  : false})
            }
        });
    }

    handleChangePicker = (ref) =>{
        const sel = ref.selTower
        const dataMeter = this.state.dataMeterAll

        const dataAll = this.state.dataAll.filter(item => item.meter_type == this.state.selType && item.entity_cd.trim() == sel.entity_cd && item.project_no.trim() == sel.project_no)
        const dataMeters = dataMeter.filter(item => item.entity.trim() == sel.entity_cd && item.project.trim() == sel.project_no && item.meterType == this.state.selType);
        const dataSaves = dataMeter.filter(item => item.entity.trim() == sel.entity_cd && item.project.trim() == sel.project_no && item.meterType == this.state.selType);

        const dataCounts = {
            total : Distinct(dataAll, 'meter_id').length,
            reading : dataMeters.length,
            unreading : Distinct(dataAll, 'meter_id').length - dataSaves.length
        }

        const data = {
            selTower : sel,
            // dataMeter : dataMeters,
            dataSave : dataSaves ? dataSaves : [],
            dataCount : dataCounts
        }

        this.setState(data)
        console.log('data',data);
    }

    handleChangeTab = (tab) =>{
        const sel = this.state.selTower    
        const ts = this.state
        

        const dataAlls = ts.dataAll.filter(item => item.meter_type == tab && item.entity_cd.trim() == sel.entity_cd && item.project_no.trim() == sel.project_no)
        const dataSaves = this.state.dataMeter.filter(item => item.entity.trim() == sel.entity_cd && item.project.trim() == sel.project_no && item.meterType == tab );

        const dataCounts = {
            total : Distinct(dataAlls, 'meter_id').length,
            reading : dataSaves.length,
            unreading : Distinct(dataAlls, 'meter_id').length - dataSaves.length
        }

        console.log('dataSaves',dataSaves);

        this.setState({selTab : type[tab],selType:tab,dataSave:dataSaves,dataCount:dataCounts})
    }

    renderPicker(i){
        const ref = {}
        const selRef = 'sel' + i
        var fn = 'render' + (i) 
        return(
          <Picker
            selectedValue={this.state[selRef]}
            mode={this.props.model}
            onValueChange={(itemValue, itemIndex) =>{
              ref['sel'+i] = itemValue
              this.handleChangePicker(ref)
            }}
          >
            {this[fn]()}
          </Picker>
        )
    }

    renderTower() {
        return this.state.dataTower.map((tower,key) => (
          <Picker.Item key={key} label={tower.project_descs} value={tower} />
        ));
    }

    _storeData = async (name,data) =>{
        try {
            await AsyncStorage.setItem(name,data)
        } catch (error) {
            console.log('ErrorStoreData', error)
        }
    }

    handleAlert = (fnName, data) => {
        const fun = fnName.toLowerCase()
        Alert.alert(
            'Alert',
            'Are you sure to '+fun+' ? ',
            [
                {text : 'cancel', onPress: ()=> console.log(fnName)},
                {text : 'OK', onPress :()=>this[fnName](data)}
            ]
        )
    }

    showPhotos = (item)=>{
        const data = {
            viewI : true,
            selPhotos :{
                id : item.meterId,
                dataPhoto : item.dataPict
            }
        }

        item.dataPict.length!==0 ? 
        this.setState(data,()=>{
            console.log('data',this.state.selPhotos);
        })
        :
        console.log('kosong');
    }

    renderItem =({item,index})=>{
        console.log('Render Item ',item);
        const satuan = {
            E : 'Kwh',
            G : 'M2',
            W : 'm2'
        }
        
        return(
            <View key={index} style={Styles.listView}>
                
                <View style={Styles.view}>
                    <View style={Styles.listViewContent}>
                        <TouchableOpacity style={Styles.viewPhoto} onPress={()=>this.showPhotos(item)}>
                            {item.dataPict.length !== 0 ?
                                <Image style={Styles.viewPhotoIcon} source={{uri:item.dataPict[0].uri}} />
                                :console.log('ok')
                            }
                            <View style={Styles.photoBadge}>
                                <Text style={Style.textBlack}>{item.dataPict.length} Photos</Text>
                            </View>
                        </TouchableOpacity>
                        <View style={Styles.viewContent}>
                            <Text style={[Styles.text,{fontSize  : 17, fontWeight :'bold',marginLeft : 10}]}>Meter ID : {item.meterId}</Text>
                            <View style={Styles.textWrap}><Text style={Styles.text}>Last Read : {item.lastRead} {satuan[item.meterType]}</Text></View>
                            <View style={Styles.textWrap}><Text style={Styles.text}>Read : {item.meteran} {satuan[item.meterType]}</Text></View>
                            
                            <View style={Styles.textWrap}><Text style={Styles.text}>Debtor List :</Text></View>
                            {item.cpName.map((val,key)=>
                                <View key={key} style={Styles.textWrap}><Text style={Styles.text}> - {val.debtor_name}</Text></View>
                            )}
                            <View style={Styles.textWrap}><Text style={[Styles.text,{color : '#adadad'}]}><Icon size={15} style={{color : '#adadad'}} name="md-time" /> {moment(item.readingDate).format('DD-MMMM-YYYY')}</Text></View>
                            {/* <View style={{marginVertical: 3}}></View>
                            <View style={Styles.listBottom}>
                                <TouchableOpacity style={[Styles.btnWhite,{backgroundColor:background.primary}]}  onPress={()=>this.handleAlert('delete',item)}>
                                    <Text style={{fontFamily : 'Montserrat-Regular'}}>Delete</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={Styles.btnWhite}  onPress={()=>this.handleAlert('uploadData',item)}>
                                    <Text style={{fontFamily : 'Montserrat-Regular'}}>Upload</Text>
                                </TouchableOpacity>
                            </View> */}
                        </View>
                        
                    </View>
                    
                    
                    
                </View>
                {/* <View style={{alignSelf:'center',width:"88%",height:'0.5%', backgroundColor:'#333'}} /> */}
            </View>
        )
    }

    render() {
        const ts = this.state

        const tabColor ={
            T : {backgroundColor : '#fff'},
            F : {backgroundColor : MAIN.COLORS.PRIMARY},
        }

        const tabRadius = {
            left : {borderTopLeftRadius: 20},
            right : {borderTopRightRadius: 20}
        }

        


        return (
            <View style={styles.container}>

                <View style={styles.top}>
                    <RoundedView renderContent={this.renderPicker('Tower')} width='85%' height="8%"/>
                </View>
                <View style={styles.content}>
          
                    <View>
                        <View style={Styles.cardContainer}>
                            <View style={Styles.cardHead}>
                                <TouchableOpacity style={[Styles.tab,tabColor[this.state.selType == 'E' ? 'T' : 'F'],tabRadius['left']]} onPress={()=>this.handleChangeTab('E')}>
                                    <Text style={{fontFamily : 'Montserrat-Regular'}}>Electric</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[Styles.tab,tabColor[this.state.selType == 'W' ? 'T' : 'F']]} onPress={()=>this.handleChangeTab('W')}>
                                    <Text style={{fontFamily : 'Montserrat-Regular'}}>Water</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[Styles.tab,tabColor[this.state.selType == 'G' ? 'T' : 'F'],tabRadius['right']]} onPress={()=>this.handleChangeTab('G')}>
                                    <Text style={{fontFamily : 'Montserrat-Regular'}}>Gas</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={Styles.cardContent}>
                                <View style={Styles.cardContext}>
                                    <Text style={Styles.textTitle}>{this.state.selTab} Summary</Text>
                                    <Text style={Styles.text}>Project : {ts.selTower.project_descs}</Text>
                                    <Text style={Styles.text}>Total Reading : {ts.dataCount.total}</Text>
                                    <Text style={Styles.text}>Reading : {ts.dataCount.reading}</Text>
                                    <Text style={Styles.text}>Unreading: {ts.dataCount.unreading}</Text>
                                </View> 
                            </View>
                            <View style={Styles.cardFooter}>
                                <View style={Styles.cardBottom}>
                                    <TouchableOpacity style={Styles.btnWhite} onPress={()=>this.seeAll()}>
                                        <Text style={{fontFamily : 'Montserrat-Regular'}}>See All</Text>
                                    </TouchableOpacity>
                                    {/* <TouchableOpacity style={Styles.btnWhite} onPress={()=>this.handleAlert('uploadAll')}>
                                        <Text style={{fontFamily : 'Montserrat-Regular'}}>Upload All</Text>
                                    </TouchableOpacity> */}
                                </View>
                            </View>
                        </View>
                    </View>

                </View>
                
                <Modal 
                visible={this.state.selModal}
                animationType="fade"
                transparent={false}
                onRequestClose={() => {
                    this.setState({selModal:false})
                }}>
                    <View style={[{flex:1},background.primary]}>
                        <View style={Styles.headerModal}>
                            <Text style={[Style.textGreyLight,{fontSize:fonts.md,textAlign:'center'}]}>Meter Type : {type[this.state.selType]}</Text>
                            
                        </View>
                        <CSpinner visible={this.state.isLoading} />
                        <FlatList 
                        // style={{marginTop:20}}
                        data={this.state.dataSave} 
                        renderItem={(item,index)=>this.renderItem(item,index)}
                        keyExtractor={(item,index)=>item.meterId}
                        scrollEnabled={true}/>
                        <TouchableOpacity style={styles.iconBack} onPress={()=>this.setState({selModal:false})} >
                            <Icon size={30} name="md-close"/>
                        </TouchableOpacity>
                       
                    </View>
                </Modal>
                <Modal animationType="slide"
                transparent={true} visible={this.state.viewI} onRequestClose={() => {
                    this.setState({viewI:false})
                }}>
                    <View style={Styles.photoViewer}>
                        <View style={Styles.photoViewerContent}>
                        <TouchableOpacity style={styles.iconBack} onPress={()=>this.setState({viewI:false})}>
                            <Icon size={25} name="md-close" />
                        </TouchableOpacity>
                            <View style={Styles.photoWrap}>
                                <Text style={{textAlign:'center',fontWeight: 'bold'}}>{this.state.selPhotos.id}</Text>
                                <ScrollView contentContainerStyle={Styles.photo}>
                                    {this.state.selPhotos.dataPhoto.map(photo => (
                                        <View style={Styles.photoItem} key={photo.uri}>
                                            <Image 
                                            source={{ uri: photo.uri }}
                                            style={Styles.photoIcon}
                                            />
                                        </View>
                                    ))}
                                </ScrollView>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
            
        );
    }
}
export default SummaryView;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: background.primary
    },
    top :{
        marginTop : 10,
    },  
    content  : {
        marginVertical : 20
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
    iconBack : {
        position:'absolute',
        right:16,
        top:4,
    },
});