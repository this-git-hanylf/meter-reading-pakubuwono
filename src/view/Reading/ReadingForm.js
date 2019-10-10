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
import { Query, Select } from "@Components/Function/Query";
import Tooltip from "rn-tooltip";
import { Button } from "react-native-elements";
import CAlert from "@Components/Alert/CAlert";
import MAIN from "@Assets/styles/Theme";
import Style from "../../theme/Style";
const Alert = new CAlert();

// create a component
class ReadingForm extends Component {
    mounted = false;

    constructor(props) {
        super(props);

        this.state = {
            meterId: "",
            cpName: [{ debtor_name: "" }],
            lotNo: "",
            meterType: "",
            meteran: "",
            dataMeter: null,
            readingDate: new Date(),
            dataPict: [],
            isloading: false,
            loadingText: "Loading...",
            isAvailable: true,
            loadPage: false
        };
        this.saveImage = this.saveImage.bind(this);
        this.removeImage = this.removeImage.bind(this);
        console.log("props", props);
    }

    componentDidMount() {
        this.mounted = true;
        this.getData(this.props.meterId);
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    getData = async data => {
        const saveDataAsync = await AsyncStorage.getItem("@SaveDataMeter");
        const keySaveData = {
            a: "meterId",
            b: data,
            c: "meterType",
            d: "project"
        };
        const cek = this.cekStore(saveDataAsync, keySaveData);
        console.log("cek", cek);
        if (cek.length !== 0) {
            const dataParse = {
                readingDate: cek[0].readingDate,
                meterId: cek[0].meterId,
                cpName: cek[0].cpName,
                lotNo: cek[0].unitNo,
                lastRead: cek[0].lastRead,
                meterType: cek[0].meterType,
                meteran: cek[0].meteran,
                dataMeter: cek[0].dataMeter,
                dataPict: cek[0].dataPict,
                loadPage: true
            };
            this.setState(dataParse, () => {
                console.log("this.state", this.state);
            });
        } else {
            const dataAsync = await AsyncStorage.getItem("@DataMeter");
            const keyData = {
                a: "meter_id",
                b: data,
                c: "meter_type",
                d: "project_no"
            };
            const cek2 = this.cekStore(dataAsync, keyData);
            console.log("cek2", cek2);
            if (cek2.length !== 0) {
                const x = cek2[0];
                const datas = {
                    meterId: x.meter_id,
                    cpName: Select(cek2, ["debtor_name", "lot_no"]),
                    lotNo: x.lot_no,
                    lastRead: x.last_read,
                    meterType: x.meter_type,
                    loadPage: true,
                    dataMeter: {
                        ...x
                    }
                };
                console.log("t", datas);
                if (this.mounted) {
                    this.setState(datas);
                }
            } else {
                // Alert.show("No Data Available", "pop");
                this.setState({ isAvailable: false, loadPage: true });
            }
        }
    };

    cekStore = (data, key) => {
        const dataJson = JSON.parse(data);
        console.log("key.b", dataJson.filter(item => item.meter_id == key.b));

        let result = "";
        if (dataJson) {
            result = dataJson.filter(item => {
                return (
                    item[key.a] == key.b &&
                    item[key.c] == this.props.selMeterType.type &&
                    item[key.d].trim() == this.props.selTower.project_no.trim()
                );
            });
        }

        return result;
    };

    clickSave = () => {
        const x = this.state;
        const data = {
            entity: x.dataMeter.entity_cd,
            project: x.dataMeter.project_no.trim(),
            meterId: x.meterId,
            cpName: x.cpName,
            unitNo: x.lotNo,
            lastRead: x.lastRead,
            lastDate: x.dataMeter.last_read_date,
            meterType: x.meterType,
            meteran: x.meteran,
            dataMeter: x.dataMeter,
            readingDate: x.readingDate,
            dataPict: x.dataPict
        };
        console.log(
            "data",
            parseFloat(x.lastRead) + "|" + parseFloat(x.meteran)
        );
        if (parseFloat(x.lastRead) <= parseFloat(x.meteran)) {
            this.saveData(data);
        } else {
            Alert.show("Meteran doesn't allow low than last read", "cl");
        }
    };

    saveData = async data => {
        this.setState({ isloading: true, loadingText: "Saving Meteran" });
        Alert.show("Data saved sucessfuly", "popWithData", { type: "saving" });
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
        this.setState(state => ({
            dataPict: [...state.dataPict, data]
        }));
    }

    removeImage(data) {
        const dataImage = this.state.dataPict;
        const remImage = dataImage.filter(item => item.fileName !== data);
        this.setState({ dataPict: remImage });
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

        const satuan = {
            W: "m2",
            E: "Kwh",
            G: "gas"
        };

        return !this.state.isAvailable ? (
            <View
                style={[
                    styles.container,
                    { alignItems: "center", justifyContent: "center", flex: 1 }
                ]}
            >
                <Text style={[Style.textBlack, { fontSize: 25 }]}>
                    Data Kosong
                </Text>
            </View>
        ) : !this.state.loadPage ? (
            <View
                style={[
                    styles.container,
                    { alignItems: "center", justifyContent: "center", flex: 1 }
                ]}
            >
                <ActivityIndicator size={50} />
            </View>
        ) : (
            <ScrollView>
                <View style={styles.container}>
                    <Text style={[Style.textBlack, styles.text]}>
                        Date Reading
                    </Text>
                    <DatePicker
                        style={styles.dates}
                        date={this.state.readingDate}
                        format={"YYYY-MM-DD"}
                        onChange={date => this.setState({ readingDate: date })}
                    />

                    <View style={styles.cardsumary}>
                        <Text style={[Style.textBlack, styles.text]}>
                            Meter ID : {data.meterId}
                        </Text>
                        {/* <Text style={[Style.textBlack, styles.text]}>
                            Lot No : {data.lotNo}
                        </Text> */}

                        <Text style={[Style.textBlack, styles.text]}>
                            Last Read : {parseFloat(data.lastRead)}
                            {" " + satuan[data.meterType]}
                        </Text>
                        <View
                            style={{
                                width: "95%",
                                backgroundColor: "#c2c2c2",
                                height: 1,
                                marginVertical: 10,
                                alignSelf: "center"
                            }}
                        ></View>
                        <Text
                            style={[
                                Style.textBlack,
                                styles.text,
                                { marginTop: 0 }
                            ]}
                        >
                            Debtor List :
                        </Text>
                        {data.cpName.map((deb, key) => (
                            <Text
                                key={key}
                                style={[Style.textBlack, styles.text]}
                            >
                                - {deb.debtor_name}, {deb.lot_no}
                            </Text>
                        ))}
                    </View>
                    <Text style={[Style.textBlack, styles.text]}>
                        Input Meteran
                    </Text>
                    <TextInputs
                        width="85%"
                        height="7%"
                        value={data.meteran}
                        keyboardType="numeric"
                        placeholder="Please Input Meteran"
                        onChangeText={val => this.setState({ meteran: val })}
                    />

                    <MeterPhoto
                        style={styles.media}
                        image={this.saveImage}
                        photos={this.state.dataPict}
                        remove={this.removeImage}
                    />
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => this.clickSave()}
                    >
                        <Text style={[Style.textBlack, styles.textscan]}>
                            Save
                        </Text>
                    </TouchableOpacity>
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
        elevation: 3,
        justifyContent: "center",
        borderWidth: 0
    },
    media: {
        marginTop: margin.sm
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
        shadowColor: "#000",
        shadowOffset: { width: 3, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 3
    },
    cardsumary: {
        backgroundColor: MAIN.COLORS.CLEAN,
        paddingBottom: padding.sm,
        marginTop: margin.sm,
        marginBottom: margin.sm,
        marginHorizontal: margin.sm,
        borderRadius: 20,
        elevation: 3,
        width: null,
        height: null,
        justifyContent: "center"
    }
});

//make this component available to the app
export default ReadingForm;
