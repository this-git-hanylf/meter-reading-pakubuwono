import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableWithoutFeedback,
    Image,
    TouchableOpacity,
    Animated
} from "react-native";
import Styles from "../Sumarry/Style2";
import Style from "../../theme/Style";
import Icon from "react-native-vector-icons/Ionicons";
import moment from "moment";
class Item extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            expandItem: false,
            animation: new Animated.Value(121),
        };
    }

    _setInitialHeight(event){
        this.setState({
            animation: new Animated.Value(event.nativeEvent.layout.height + 20)
        });
    }

    _setMaxHeight(event) {
        this.setState({
            maxHeight: event.nativeEvent.layout.height
        });
    }

    _setMinHeight(event) {
        this.setState({
            minHeight: event.nativeEvent.layout.height
        });
    }

    handlePressData = () => {
        
        let initialValue = this.state.expandItem
            ? this.state.maxHeight
            : this.state.maxHeight - this.state.minHeight;
        let finalValue = this.state.expandItem
            ? this.state.maxHeight - this.state.minHeight
            : this.state.maxHeight;
        
        this.setState({
            expandItem: !this.state.expandItem
        });

        this.state.animation.setValue(initialValue);
        Animated.spring(
            this.state.animation,
            {
                toValue: finalValue
            }
        ).start();
    };

    render() {
        const { activeTab, data, index } = this.props;
        const { expandItem } = this.state;
        const satuan = {
            E: "KWH",
            G: "M2",
            W: "m2"
        };
        return (
            <TouchableWithoutFeedback
                key={index}
                onPress={() => this.handlePressData(index)}
            >
                <Animated.View style={[Styles.listView,{height : this.state.animation}]}>
                    <View style={Styles.view}
                        onLayout={this._setMaxHeight.bind(this)}
                    >
                        <View
                            style={Styles.listViewContent}
                            onLayout={this._setInitialHeight.bind(this)}
                        >
                            {activeTab == "read" ? (
                                <TouchableOpacity
                                    style={Styles.viewPhoto}
                                    onPress={() => this.props.handlePressPict(data)}
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
                            ) : null}
                            <View style={{marginLeft : activeTab == "read" ? 0 : 0, flex :2}}>
                                <View style={Styles.textWrap}>
                                    <Text
                                        style={[Styles.text, Style.textBlack]}
                                    >
                                        {data.meterId}
                                    </Text>
                                </View>
                                {/* <View style={Styles.textWrap}><Text style={Styles.text}>{data.cpName}</Text></View> */}
                                <View style={Styles.textWrap}>
                                    <Text style={[Styles.text, Style.textGrey]}>
                                        <Icon size={15} name="md-time" />{" "}
                                        {moment(activeTab == "read" ? data.readingDate : data.lastDate).format(
                                            "DD-MMMM-YYYY"
                                        )}
                                    </Text>
                                </View>
                                <View style={Styles.textWrap}>
                                    <Text
                                        style={[Styles.text, Style.textBlack]}
                                    >
                                        {activeTab == "read" ?"Read":"Last Read"}
                                        {" : "}
                                        {activeTab == "read" ? data.meteran : data.lastRead }{" "}
                                        {satuan[data.meterType]}
                                    </Text>
                                </View>
                            </View>
                        </View>
                        <View style={[Styles.expandItem,{paddingHorizontal : activeTab == "read" ? 0 : 10}]} onLayout={this._setMinHeight.bind(this)}>
                            <View style={Styles.divider} ></View>
                            <Text style={[Styles.text, Style.textBlack]} >Debtor Name</Text>
                            {data.cpName.map((x, key) => (
                                <Text
                                    style={[Style.textGrey]}
                                    key={key}
                                >{`- ${x.debtor_name}, ${x.lot_no}`}</Text>
                            ))}
                        </View>
                    </View>

                </Animated.View>
            </TouchableWithoutFeedback>
        );
    }
}
export default Item;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    }
});
