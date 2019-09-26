//import liraries
import React, { Component } from "react";
import { Fade } from "rnal";
import {
    View,
    Text,
    StyleSheet,
    AsyncStorage,
    Dimensions,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Image,
    Modal,
    ScrollView,
    FlatList,
    Animated
} from "react-native";
import { Query, Select } from "@Components/Function/Query";
import Styles from "../Sumarry/Style2";
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
import { background, fonts, colors } from "@Assets/styles/base";
import Icon from "react-native-vector-icons/Ionicons";
import Icons from "react-native-vector-icons/FontAwesome";
import moment from "moment";
import Style from "../../theme/Style";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from "react-native-responsive-screen";
import TextInputs from "../components/InputText/TextInput";
import CSpinner from '../components/Alert/CSpinner';
import FlatItem from './_item';
// create a component
class ViewSearch extends Component {
    mounted = false;

    constructor(props) {
        super(props);

        this.state = {
            dataqr : "",
            dataMeter: [],
            selData: [],
            selPict: [],
            showModalData: false,
            showModalPict: false,
            activeTab: "read",
            isLoading : false,

            expandItem : null,
            animation : new Animated.Value()
        };

        console.log("Props", props);
    }

    componentDidMount() {
        this.mounted = true;
        this.getData();
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    getData = async () => {
        const { selMeterType, selTower } = this.props;
        if (this.state.activeTab == "read") {
            const dataAsync = await AsyncStorage.getItem("@SaveDataMeter");
            let dataJson = JSON.parse(dataAsync);
            
            let resultQuery = [] ;

            if(dataJson){
                resultQuery = dataJson.filter(
                    item =>{
                        if(this.state.dataqr !== ""){
                            return item.project == selTower.project_no &&
                            item.meterType == selMeterType.type &&
                            item.meterId.toUpperCase().indexOf(this.state.dataqr.toUpperCase()) >= 0
                        } else {
                            return item.project == selTower.project_no &&
                            item.meterType == selMeterType.type
                        }
                    }
                        
                );
            }

            const result = resultQuery;

            if (this.mounted) {
                this.setState({ dataMeter: result, isLoading : false });
            }
        } else {
            const dataAsync = await AsyncStorage.getItem("@DataMeter");
            const dataSave = await AsyncStorage.getItem("@SaveDataMeter");

            let dataJson = JSON.parse(dataAsync);
            let saveJson = JSON.parse(dataSave);

            const resultJson = dataJson.filter(({ meter_id : id1, meter_type : type1,project_no : proj1 }) => 
            !saveJson.some(({ meterId: id2, meterType : type2, project : proj2 }) => id2 === id1 && type1 === type2 && proj1.trim() === proj2.trim() ));
            
            const resultQuery = resultJson.filter(
                item => {
                    if(this.state.dataqr !== ""){
                        return item.project_no == selTower.project_no &&
                        item.meter_type == selMeterType.type &&
                        item.meter_id.toUpperCase().indexOf(this.state.dataqr.toUpperCase()) >= 0
                    } else {
                        return item.project_no == selTower.project_no &&
                        item.meter_type == selMeterType.type
                    }
                }
            );
            let result = [];
            let parser = {};
            resultQuery.map((data,key)=>{
                if(result.filter(item => item.meterId == data.meter_id) < 1){
                    result.push({
                        entity : data.entity_cd.trim(),
                        project : data.project_no.trim(),
                        meterId : data.meter_id,
                        dataPict : [],
                        meteran : 0,
                        lastRead : data.last_read,
                        lastDate : data.last_read_date,
                        meterType : data.meter_type,
                        cpName : [{debtor_name : data.debtor_name, lot_no:data.lot_no}]
                    })
                } else {
                    let fillData = result.filter(item => item.meterId !== data.meter_id);
                    let dbtor = Select(resultQuery.filter(item => item.meter_id === data.meter_id),["debtor_name","lot_no"]);
                    result = fillData;
                    result.push(
                    {
                        entity : data.entity_cd.trim(),
                        project : data.project_no.trim(),
                        meterId : data.meter_id,
                        dataPict : [],
                        lastDate : data.last_read_date,
                        meteran : 0,
                        lastRead : data.last_read,
                        meterType : data.meter_type,
                        cpName : dbtor
                    })
                }
            });
            if (result) {
                if (this.mounted) {
                    this.setState({ dataMeter: result},()=>{
                        this.setState({isLoading : false })
                    });
                }
            }
        }
    };

    handleTextSearch = val => {
        this.setState({ dataqr: val },()=>{
            this.getData()
        })
    }

    handleChangeTab = (tab) =>{
        this.setState({isLoading : true },()=>{
            setTimeout(() => {
                this.setState({activeTab : tab},()=>{
                    this.getData();
                });
            }, 200);
        })
    }

    handlePressPict = data => {
        this.setState({ showModalPict: true, selPict: data.dataPict, selPictId : data.meterId });
    };

    handleLoadMore = () =>{
        alert("oe")
    }

    renderItem = ({item,index}) =>{
        const { dataMeter, selPict, activeTab, expandItem } = this.state;
        
        const data = item;
        return(
            <FlatItem data={data} index={index} activeTab={activeTab} handlePressPict={this.handlePressPict} />
        );
    }

    render() {
        const { dataMeter, selPict, activeTab,expandItem } = this.state;
        
        return (
            <View style={styles.container}>
                <View style={styles.readForm}>
                    <TextInputs
                        width="78%"
                        height="8%"
                        placeholder="Search by Meter ID"
                        value={this.state.dataqr}
                        onChangeText={val => this.handleTextSearch(val)}
                    />
                    <TouchableOpacity
                        style={styles.btnScan}
                        onPress={() => this.clickReadingScan()}
                    >
                        <Icons name="qrcode" size={25} />
                    </TouchableOpacity>
                </View>
                <View
                    style={{
                        width: "100%",
                        backgroundColor: "#4A98F7",
                        height: 50,
                        flexDirection: "row",
                        borderBottomRightRadius: 20,
                        borderBottomLeftRadius: 20,
                        elevation: 5
                    }}
                >
                    <TouchableOpacity style={[styles.btnFilter, { borderBottomLeftRadius: 20,backgroundColor: activeTab == "read" ?  "#4A98F7" : '#fff' }]}
                        onPress={()=>this.handleChangeTab("read")}
                    >
                        <Text style={Style.textBlack}>
                            READ
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.btnFilter, { borderBottomRightRadius: 20,backgroundColor: activeTab == "unread" ?  "#4A98F7" : '#fff' }]}
                        onPress={()=>this.handleChangeTab("unread")}
                    >
                        <Text style={Style.textBlack}>
                            UNREAD
                        </Text>
                    </TouchableOpacity>
                </View>
                
                <FlatList
                    data={dataMeter}
                    keyExtractor={(item,index)=>item.meterId}
                    refreshing={false}
                    onRefresh={()=>{
                        this.getData()
                    }}
                    indicatorStyle={"black"}
                    renderItem={(item,index)=>this.renderItem(item,index)}
                    scrollEnabled={true}
                    ListEmptyComponent={()=>{
                        return(
                            <View style={styles.nullList}>
                                <Text style={styles.title}>Data Kosong</Text>
                            </View>
                        )
                    }}
                    extraData={this.state}
                />
                
                <Modal animationType="slide"
                transparent={true} visible={this.state.showModalPict} onRequestClose={() => {
                    this.setState({showModalPict:false})
                }}>
                    <View style={Styles.photoViewer}>
                        <View style={Styles.photoViewerContent}>
                        <TouchableOpacity style={styles.iconBack} onPress={()=>this.setState({showModalPict:false})}>
                            <Icon size={25} name="md-close" />
                        </TouchableOpacity>
                            <View style={Styles.photoWrap}>
                                <Text style={{textAlign:'center',fontWeight: 'bold'}}>{this.state.selPictId}</Text>
                                <ScrollView contentContainerStyle={Styles.photo}>
                                    {this.state.selPict.map(photo => (
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
                <CSpinner visible={this.state.isLoading} />
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
        backgroundColor: background.primary
    },
    list: {
        marginHorizontal: 10,
        marginVertical: 10
    },
    nullList: {
        height: deviceHeight - deviceHeight / 3,
        justifyContent: "center",
        alignItems: "center"
    },
    title: {
        fontSize: 25,
        fontFamily: "Montserrat-SemiBold",
        color: "#333"
    },
    readForm: {
        flexDirection: "row",
        width: wp("100%"),
        alignSelf: "center",
        justifyContent: "space-between",
        paddingVertical: 10,
        paddingHorizontal: 10,
        backgroundColor: "#fff"
    },
    btnScan: {
        marginTop: 5,
        backgroundColor: "#fff",
        width: wp("14%"),
        height: hp("8%"),
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 16,
        elevation: 3
    },
    btnFilter: {
        flex: 1,
        padding: 10,
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden"
    },
    iconBack : {
        position:'absolute',
        right:16,
        top:4,
    },
});

//make this component available to the app
export default ViewSearch;
