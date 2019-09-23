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
    ScrollView
} from "react-native";
import Query from "@Components/Function/Query";
import Styles from "../Sumarry/Style2";
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
import { background, fonts, colors } from "@Assets/styles/base";
import Icon from "react-native-vector-icons/Ionicons";
import moment from "moment";
import Style from '../../theme/Style';

// create a component
class ViewSearch extends Component {
    mounted = false;

    constructor(props) {
        super(props);

        this.state = {
            dataMeter: null,
            selData : [],
            selPict : [],
            showModalData : false,
            showModalPict: false,
        };

        console.log("Props", props);
    }

    componentDidMount() {
        this.mounted = true;
        this.getData(this.props.meterId);
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    getData = async data => {
        const dataAsync = await AsyncStorage.getItem("@SaveDataMeter");
        let dataJson = JSON.parse(dataAsync);
        console.log("dataAsync", dataJson);

        this.setState({ dataMeter: dataJson });
        // if(dataAsync){
        //     let dataJson = JSON.parse(dataAsync)

        //     const resultQuery = Query(dataJson, data => data.meterId)

        //     const result = dataJson;
        //     console.log('result',result);

        //     if(result){
        //         const x = result[0]

        //         console.log('data',x);

        //         if(this.mounted){
        //             this.setState({dataMeter:x})
        //         }
        //     }
        // }
    };

    handlePressData = (data) => {
        this.setState({showModalData : true, selData : data })
    }

    handlePressPict = (data) => {
        this.setState({ showModalPict: true, selPict : data.dataPict })
    }

    render() {
        const {dataMeter, selPict} = this.state;
        const satuan = {
            E: "KWH",
            G: "M2",
            W: "m2"
        };
        return (
            <View style={styles.container}>
                {dataMeter ? (
                    dataMeter.map((data, key) => (
                        <TouchableOpacity key={key} style={Styles.listView} onPress={()=>this.handlePressData(data)}>
                            <View style={Styles.view}>
                                <View style={Styles.listViewContent}>
                                    <TouchableOpacity
                                        style={Styles.viewPhoto}
                                        onPress={() => this.handlePressPict(data) }
                                    >
                                        {data.dataPict.length !== 0 ? (
                                            <Image
                                                style={Styles.viewPhotoIcon}
                                                source={{
                                                    uri: data.dataPict[0].uri
                                                }}
                                            />
                                        ) : (
                                            console.log("ok")
                                        )}
                                        <View style={Styles.photoBadge}>
                                            <Text style={[Style.textSmall,Style.textBlack]}>
                                                {data.dataPict.length} Photos
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                    <View style={Styles.viewContent}>
                                        <View style={Styles.textWrap}>
                                            <Text style={[Styles.text,Style.textBlack]}>
                                                {data.meterId}
                                            </Text>
                                        </View>
                                        <View style={Styles.textWrap}>
                                            <Text style={[Styles.text,Style.textGreyDark]}>
                                                {data.unitNo}
                                            </Text>
                                        </View>
                                        {/* <View style={Styles.textWrap}><Text style={Styles.text}>{data.cpName}</Text></View> */}
                                        <View style={Styles.textWrap}>
                                            <Text style={[Styles.text,Style.textGrey]}>
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
                                            <Text style={[Styles.text,Style.textBlack]}>
                                                Read : {data.meteran}{" "}
                                                {satuan[data.meterType]}
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <Modal animationType="slide"
                            transparent={true} visible={this.state.showModalData} onRequestClose={() => {
                                this.setState({showModalData:false})
                            }}>
                            <View style={Styles.photoViewer}>
                                <View style={Styles.photoViewerContent}>
                                <TouchableOpacity style={Styles.iconBack} onPress={()=>this.setState({showModalData:false})}>
                                    <Icon size={25} name="md-close" />
                                </TouchableOpacity>
                                    <View style={Styles.photoWrap}>
                                        {selPict.length == 0 ?
                                            <View style={Styles.text}>
                                                <Text>Foto Kosong</Text>
                                            </View>
                                        :
                                            <ScrollView contentContainerStyle={Styles.photo}>
                                                {selPict.map(photo => (
                                                    <View style={Styles.photoItem} key={photo.uri}>
                                                        <Image 
                                                        source={{ uri: photo.uri }}
                                                        style={Styles.photoIcon}
                                                        />
                                                    </View>
                                                ))}
                                            </ScrollView>
                                        }
                                    </View>
                                </View>
                            </View>
                            </Modal>
                            <Modal animationType="slide"
                            transparent={true} visible={this.state.showModalPict} onRequestClose={() => {
                                this.setState({showModalPict:false})
                            }}>
                            <View style={Styles.photoViewer}>
                                <View style={Styles.photoViewerContent}>
                                <TouchableOpacity style={Styles.iconBack} onPress={()=>this.setState({showModalPict:false})}>
                                    <Icon size={25} name="md-close" />
                                </TouchableOpacity>
                                    <View style={Styles.photoWrap}>
                                        {selPict.length == 0 ?
                                            <View style={Styles.text}>
                                                <Text>Foto Kosong</Text>
                                            </View>
                                        :
                                            <ScrollView contentContainerStyle={Styles.photo}>
                                                {selPict.map(photo => (
                                                    <View style={Styles.photoItem} key={photo.uri}>
                                                        <Image 
                                                        source={{ uri: photo.uri }}
                                                        style={Styles.photoIcon}
                                                        />
                                                    </View>
                                                ))}
                                            </ScrollView>
                                        }
                                    </View>
                                </View>
                            </View>
                            </Modal>
                            {/* <View style={{alignSelf:'center',width:"88%",height:'0.5%', backgroundColor:'#333'}} /> */}
                        </TouchableOpacity>
                    ))
                ) : (
                    <View style={styles.nullList}>
                        <Text style={styles.title}>Data Kosong</Text>
                    </View>
                )}
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
    }
});

//make this component available to the app
export default ViewSearch;
