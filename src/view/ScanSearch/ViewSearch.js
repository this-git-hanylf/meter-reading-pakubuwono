//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,AsyncStorage,Dimensions,TouchableOpacity,Image,Modal,ScrollView} from 'react-native';
import Query from '@Components/Function/Query';
import Styles from '../Sumarry/Style2';
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
import {background,fonts,colors} from '@Assets/styles/base';
import Icon from "react-native-vector-icons/Ionicons";
import moment from 'moment';


// create a component
class ViewSearch extends Component {
    mounted = false

    constructor(props){
        super(props)

        this.state = {
            dataMeter : null,
            selModal:false
        }

        console.log('Props',props.meterId)
    }

    componentDidMount(){
        this.mounted = true
        this.getData(this.props.meterId)
    }

    componentWillUnmount(){
        this.mounted = false
    }

    loadData = async() =>{
        const data = await AsyncStorage.getItem('@SaveDataMeter')
        if(data){
            const datas =  JSON.parse(data)
            this.setState({dataMeter:datas})
        }
        
    }

    getData = async(data)=>{
        const dataAsync = await AsyncStorage.getItem('@SaveDataMeter')
        if(dataAsync){
            let dataJson = JSON.parse(dataAsync)
            const resultQuery = Query(dataJson, data => data.meterId)
            const result = resultQuery.get(data);
            console.log('result',result);
            if(result){
                const x = result[0]
            
                console.log('data',x);
            
                if(this.mounted){
                    this.setState({dataMeter:x})
                }
            }
        }
    }

    render() {
        const data = this.state.dataMeter
        console.log('datapic',data);
        const satuan = {
            E : 'KWH',
            G : 'M2',
            W : 'm2'
        }
        return (
            <View style={styles.container}>
                {
                    data ? 
                    // <View style={styles.list} >
                    //     <View style={{flexDirection : 'row',justifyContent:'space-between'}}>
                    //         <Text>{data.meterId}</Text>
                    //         <Text>{data.unitNo}</Text>
                    //     </View>
                    //     <View style={{flexDirection : 'row',justifyContent:'space-between'}}>
                    //         <Text>{data.cpName}</Text>
                    //         <Text>{data.csName}</Text>
                    //     </View>
                    // </View>
                    <View style={Styles.listView}>
                
                        <View style={Styles.view}>
                            <View style={Styles.listViewContent}>
                                <TouchableOpacity style={Styles.viewPhoto} onPress={()=>this.setState({selModal : true})}>
                                    {data.dataPict.length !== 0 ?
                                        <Image style={Styles.viewPhotoIcon} source={{uri:data.dataPict[0].uri}} />
                                        :console.log('ok')
                                    }
                                    <View style={Styles.photoBadge}>
                                        <Text>{data.dataPict.length} Photos</Text>
                                    </View>
                                </TouchableOpacity>
                                <View style={Styles.viewContent}>
                                    <View style={Styles.textWrap}><Text style={Styles.text}>{data.meterId}</Text></View>
                                    <View style={Styles.textWrap}><Text style={Styles.text}>{data.unitNo}</Text></View>
                                    <View style={Styles.textWrap}><Text style={Styles.text}>{data.cpName}</Text></View>
                                    <View style={Styles.textWrap}><Text style={Styles.text}><Icon size={15} name="md-time" /> {moment(data.readingDate).format('DD-MMMM-YYYY')}</Text></View>
                                    <View style={Styles.textWrap}><Text style={Styles.text}>Read : {data.meteran} {satuan[data.meterType]}</Text></View>
                                </View>
                                
                            </View>
                            
                            
                            
                        </View>
                        <Modal animationType="slide"
                        transparent={true} visible={this.state.selModal} onRequestClose={() => {
                            this.setState({selModal:false})
                        }}>
                            <View style={Styles.photoViewer}>
                                <View style={Styles.photoViewerContent}>
                                <TouchableOpacity style={Styles.iconBack} onPress={()=>this.setState({selModal:false})}>
                                    <Icon size={25} name="md-close" />
                                </TouchableOpacity>
                                    <View style={Styles.photoWrap}>
                                        <ScrollView contentContainerStyle={Styles.photo}>
                                            {data.dataPict.map(photo => (
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
                        {/* <View style={{alignSelf:'center',width:"88%",height:'0.5%', backgroundColor:'#333'}} /> */}
                    </View>
                    :
                    <View style={styles.nullList}>
                        <Text style={styles.title}>Data Kosong</Text>
                    </View>
                }
                
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: background.primary,
    },
    list :{
        marginHorizontal : 10,
        marginVertical: 10,
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
export default ViewSearch;
