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
import FaIcon from "react-native-vector-icons/FontAwesome5";
import moment from "moment";
import THEME from "../../assets/styles/Theme";
class Item extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            expandItem: false,
            animation: new Animated.Value(121),
            dividerWidth: new Animated.Value(100)
        };

        this._setInitialHeight = this._setInitialHeight.bind(this);
        this._setMaxWidth = this._setMaxWidth.bind(this);
    }

    _setInitialHeight(event) {
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

    _setMaxWidth(event) {
        this.setState({
            maxWidth: event.nativeEvent.layout.width
        });
    }

    handlePressData = () => {
        let initialWidth = this.state.expandItem
            ? (width = this.state.maxWidth)
            : (width = 100);
        let finalWidth = this.state.expandItem
            ? (width = 100)
            : (width = this.state.maxWidth);

        this.state.dividerWidth.setValue(initialWidth);

        Animated.spring(this.state.dividerWidth, {
            toValue: finalWidth
        }).start();

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
        Animated.spring(this.state.animation, {
            toValue: finalValue
        }).start();
    };

    handlePressReadNow = () => {
        this.props.readNow(this.props.data.meterId);
    };

    render() {
        const { activeTab, data, index } = this.props;
        const { expandItem, animation, dividerWidth } = this.state;
        const satuan = {
            E: "Kwh",
            G: "M2",
            W: "m2"
        };
        return (
            <TouchableWithoutFeedback
                key={index}
                onPress={() => this.handlePressData(index)}
            >
                <Animated.View style={[Styles.listView, { height: animation }]}>
                    <View
                        style={Styles.view}
                        onLayout={this._setMaxHeight.bind(this)}
                    >
                        <View
                            style={Styles.listViewContent}
                            onLayout={event => {
                                this._setInitialHeight(event);
                                this._setMaxWidth(event);
                            }}
                        >
                            {activeTab == "read" &&
                            data.dataPict.length !== 0 ? (
                                <TouchableOpacity
                                    style={Styles.viewPhoto}
                                    onPress={() =>
                                        this.props.handlePressPict(data)
                                    }
                                >
                                    <Image
                                        style={Styles.viewPhotoIcon}
                                        source={{
                                            uri: data.dataPict[0].uri
                                        }}
                                    />
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
                            <View
                                style={{
                                    marginLeft:
                                        data.dataPict.length > 0 ? 10 : 0,
                                    flex: 2
                                }}
                            >
                                <View style={Styles.textWrap}>
                                    <Text
                                        style={[Styles.text, Style.textBlack]}
                                    >
                                        {"Meter ID : "}
                                        {data.meterId}
                                    </Text>
                                    <TouchableOpacity
                                        style={Styles.btnReadEdit}
                                        onPress={this.handlePressReadNow}
                                    >
                                        <FaIcon size={13} name={activeTab == "unread" ? "search" :  "edit"} color="#fff" />
                                        <Text style={Style.textWhite}>
                                            {activeTab == "unread" ? " Read Meter" : " Edit Meter"}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={Styles.textWrap}>
                                    <Text
                                        style={[
                                            Styles.textTitle,
                                            Style.textBlack
                                        ]}
                                    >
                                        {"Last Date"}
                                    </Text>
                                    <Text
                                        style={[
                                            Styles.textTitle,
                                            Style.textBlack
                                        ]}
                                    >
                                        {"Last Read"}
                                    </Text>
                                </View>
                                <View style={Styles.textWrap}>
                                    <Text
                                        style={[
                                            Styles.text,
                                            Style.textGreyLight
                                        ]}
                                    >
                                        <Icon size={15} name="md-time" />{" "}
                                        {moment(data.lastDate).format(
                                            "DD-MMM-YY"
                                        )}
                                    </Text>
                                    <Text
                                        style={[
                                            Styles.text,
                                            Style.textGreyLight
                                        ]}
                                    >
                                        <Icon size={15} name="md-speedometer" />{" "}
                                        {parseFloat(data.lastRead)}{" "}
                                        {satuan[data.meterType]}
                                    </Text>
                                </View>
                                {activeTab == "read" ? (
                                    <View style={Styles.textWrap}>
                                        <Text
                                            style={[
                                                Styles.textTitle,
                                                Style.textBlack
                                            ]}
                                        >
                                            {"Curr Date"}
                                        </Text>
                                        <Text
                                            style={[
                                                Styles.textTitle,
                                                Style.textBlack
                                            ]}
                                        >
                                            {"Curr Read"}
                                        </Text>
                                    </View>
                                ) : null}
                                {activeTab == "read" ? (
                                    <View style={Styles.textWrap}>
                                        <Text
                                            style={[
                                                Styles.text,
                                                Style.textGreyLight
                                            ]}
                                        >
                                            <Icon size={15} name="md-time" />{" "}
                                            {moment(data.readingDate).format(
                                                "DD-MMM-YY"
                                            )}
                                        </Text>
                                        <Text
                                            style={[
                                                Styles.text,
                                                Style.textGreyLight
                                            ]}
                                        >
                                            <Icon
                                                size={15}
                                                name="md-speedometer"
                                            />{" "}
                                            {parseFloat(data.meteran)}{" "}
                                            {satuan[data.meterType]}
                                        </Text>
                                    </View>
                                ) : null}
                            </View>
                        </View>
                        <View
                            style={Styles.expandItem}
                            onLayout={this._setMinHeight.bind(this)}
                        >
                            <Animated.View
                                style={[
                                    Styles.divider,
                                    { width: dividerWidth }
                                ]}
                            ></Animated.View>
                            <Text style={[Styles.textTitle, Style.textBlack]}>
                                Debtor Name
                            </Text>
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
