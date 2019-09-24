//import liraries
import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    AsyncStorage,
    Dimensions,
    TouchableOpacity,
    Image,
    Modal,
    ScrollView,
    FlatList
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
// create a component
class ViewSearch extends Component {
    mounted = false;

    constructor(props) {
        super(props);

        this.state = {
            dataMeter: [],
            selData: [],
            selPict: [],
            showModalData: false,
            showModalPict: false,
            activeTab: "read",
            isLoading : true
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

            const resultQuery = dataJson.filter(
                item =>
                    item.project == selTower.project_no &&
                    item.meterType == selMeterType.type
            );

            const result = resultQuery;
            console.log("result", result);

            if (result) {
                if (this.mounted) {
                    this.setState({ dataMeter: result, isLoading : false });
                }
            }
        } else {
            const dataAsync = await AsyncStorage.getItem("@DataMeter");
            let dataJson = JSON.parse(dataAsync);
            const resultQuery = dataJson.filter(
                item =>
                    item.project_no == selTower.project_no &&
                    item.meter_type == selMeterType.type 
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
                        meteran : 0,
                        lastRead : data.last_read,
                        meterType : data.meter_type,
                        cpName : dbtor
                    })
                }
            });
            if (result) {
                if (this.mounted) {
                    this.setState({ dataMeter: result.slice(0,9)},()=>{
                        this.setState({isLoading : false })
                    });
                }
            }
        }
    };

    handleChangeTab = (tab) =>{
        this.setState({isLoading : true },()=>{
            setTimeout(() => {
                this.setState({activeTab : tab},()=>{
                    this.getData();
                });
            }, 200);
        })
    }

    handlePressData = data => {
        this.setState({ showModalData: true, selData: data });
    };

    handlePressPict = data => {
        this.setState({ showModalPict: true, selPict: data.dataPict });
    };

    render() {
        const { dataMeter, selPict, activeTab } = this.state;
        const satuan = {
            E: "KWH",
            G: "M2",
            W: "m2"
        };
        return (
            <View style={styles.container}>
                <View style={styles.readForm}>
                    <TextInputs
                        width="78%"
                        height="8%"
                        placeholder="Input Meter ID"
                        value={this.state.dataqr}
                        onChangeText={val => this.setState({ dataqr: val })}
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
                        marginBottom: 10,
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
                <ScrollView>
                {dataMeter.length > 0 ? (
                    dataMeter.map((data, key) => (
                        <TouchableOpacity
                            key={key}
                            style={Styles.listView}
                            onPress={() => this.handlePressData(data)}
                        >
                            <View style={Styles.view}>
                                <View style={Styles.listViewContent}>
                                    {activeTab == "read"?
                                        <TouchableOpacity
                                            style={Styles.viewPhoto}
                                            onPress={() =>
                                                this.handlePressPict(data)
                                            }
                                        >
                                            {data.dataPict.length !== 0 ? (
                                                <Image
                                                    style={Styles.viewPhotoIcon}
                                                    source={{
                                                        uri: data.dataPict[0].uri
                                                    }}
                                                />
                                            ) : null}
                                            <View style={Styles.photoBadge}>
                                                <Text
                                                    style={[
                                                        Style.textSmall,
                                                        Style.textBlack
                                                    ]}
                                                >
                                                    {data.dataPict.length} Photos
                                                </Text>
                                            </View>
                                        </TouchableOpacity>
                                        :
                                        null
                                    }
                                    <View style={Styles.viewContent}>
                                        <View style={Styles.textWrap}>
                                            <Text
                                                style={[
                                                    Styles.text,
                                                    Style.textBlack
                                                ]}
                                            >
                                                {data.meterId}
                                            </Text>
                                        </View>
                                        <View style={Styles.textWrap}>
                                            <Text
                                                style={[
                                                    Styles.text,
                                                    Style.textGreyDark
                                                ]}
                                            >
                                                {data.unitNo}
                                            </Text>
                                        </View>
                                        {/* <View style={Styles.textWrap}><Text style={Styles.text}>{data.cpName}</Text></View> */}
                                        <View style={Styles.textWrap}>
                                            <Text
                                                style={[
                                                    Styles.text,
                                                    Style.textGrey
                                                ]}
                                            >
                                                <Icon
                                                    size={15}
                                                    name="md-time"
                                                />{" "}
                                                {moment(
                                                    data.readingDate
                                                ).format("DD-MMMM-YYYY")}
                                            </Text>
                                        </View>
                                        <View style={Styles.textWrap}>
                                            <Text
                                                style={[
                                                    Styles.text,
                                                    Style.textBlack
                                                ]}
                                            >
                                                Read : {data.meteran}{" "}
                                                {satuan[data.meterType]}
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            {/* <View style={{alignSelf:'center',width:"88%",height:'0.5%', backgroundColor:'#333'}} /> */}
                        </TouchableOpacity>
                    ))
                ) : (
                    <View style={styles.nullList}>
                        <Text style={styles.title}>Data Kosong</Text>
                    </View>
                )}
                </ScrollView>
                <Modal 
                visible={this.state.showModalData}
                animationType="fade"
                transparent={false}
                onRequestClose={() => {
                    this.setState({showModalData:false})
                }}>
                    <View style={[Styles.photoViewer,background.primary]}>
                        <View style={Styles.headerModal}>
                            {/* <Text style={{fontSize:fonts.md,textAlign:'center'}}>Meter Type : {type[this.state.selType]}</Text> */}
                            
                        </View>
                        <FlatList 
                        // style={{marginTop:20}}
                        data={this.state.dataSave} 
                        renderItem={(item,index)=>this.renderItem(item,index)}
                        keyExtractor={(item,index)=>item.meterId}
                        scrollEnabled={true}/>
                        <TouchableOpacity style={styles.iconBack} onPress={()=>this.setState({showModalData:false})} >
                            <Icon size={30} name="md-close"/>
                        </TouchableOpacity>
                       
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
