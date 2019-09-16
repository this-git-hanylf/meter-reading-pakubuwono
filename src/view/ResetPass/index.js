import React, { Component } from "react";
import {
    View,
    Text,
    Image,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    AsyncStorage,
    StatusBar,
    ActivityIndicator,
    Platform
} from "react-native";
import { USER_KEY, urlApi } from "@Config/Services";
import { Actions } from "react-native-router-flux";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from "react-native-responsive-screen";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import DeviceInfo from "react-native-device-info";

class ResetPassword extends Component {
    constructor(props) {
        super(props);

        this.state = {
            txtPassword: "",
            txtConfirmPassword : "",

            isHidden: true,
            isLoaded: true
        };
    }

    ResetPress = () =>{
        const { txtConfirmPassword, txtPassword } = this.state
        if(txtConfirmPassword != txtPassword){
            alert('Password does not match')
        } else {
            const formData = {
                matching_passwords : {
                    newpass : txtPassword
                },
                email : this.props.email
            }

            console.log('form',formData);

            fetch(urlApi+'c_auth/Resetpass/',{
                method : "POST",
                body :JSON.stringify(formData),
                headers :{
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                }
            })
            .then((response) => response.json())
            .then((res)=>{
                if(!res.Error){
                    alert(res.Pesan);
                    Actions.replace('auth');
                }
                console.log('save profile',res)
            }).catch((error) => {
                console.log(error);
            });
        }
    }

    handleEyeChanger = () =>{
        this.setState({isHidden : !this.state.isHidden},()=>{
            this.refs['password'].blur()
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar />
                <View
                    style={styles.loginFormWrap}
                    pointerEvents={this.state.isLoaded ? "auto" : "none"}
                >
                    <Image
                        style={styles.stretch}
                        source={require("@Assets/images/login/head-login.png")}
                    />
                    <Text style={styles.textlogin}>Reset Password</Text>
                    <View style={styles.textInputWrap}>
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center"
                            }}
                        >
                            <TextInput
                                ref="password"
                                style={styles.input}
                                placeholder="Password"
                                value={this.state.txtPassword}
                                onChangeText={val =>
                                    this.setState({ txtPassword: val })
                                }
                                secureTextEntry={this.state.isHidden}
                            />
                            <Icon
                                style={styles.EyePasswordBtnIcon}
                                name={this.state.isHidden ? "eye" : "eye-off"}
                                size={5}
                                onPress={() => this.handleEyeChanger()}
                            />
                        </View>
                        <View
                            style={{
                                backgroundColor: "#D7D7D7",
                                height: 1,
                                width: "80%"
                            }}
                        ></View>
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center"
                            }}
                        >
                            <TextInput
                                ref="cPassword"
                                style={styles.input}
                                placeholder="Confirm Password"
                                value={this.state.txtConfirmPassword}
                                onChangeText={val =>
                                    this.setState({ txtConfirmPassword: val })
                                }
                                secureTextEntry={this.state.isHidden}
                            />
                            <Icon
                                style={styles.EyePasswordBtnIcon}
                                name={this.state.isHidden ? "eye" : "eye-off"}
                                size={5}
                                onPress={() => this.handleEyeChanger()}
                            />
                        </View>
                        <View
                            style={{
                                backgroundColor: "#D7D7D7",
                                height: 1,
                                width: "80%"
                            }}
                        ></View>
                    </View>
                    <View style={styles.button}>
                        <TouchableOpacity
                            style={styles.loginBtn}
                            onPress={() => this.ResetPress()}
                        >
                            {this.state.isLoaded ? (
                                <Text style={{ color: "white", fontSize: 16 }}>
                                    Reset
                                </Text>
                            ) : (
                                <ActivityIndicator color="#fff" size={30} />
                            )}
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}
export default ResetPassword;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#4A98F7"
    },
    textlogin: {
        color: "#F4B132",
        // width: 50,
        fontWeight: "bold",
        fontSize: 22,
        textAlign: "center"
    },
    stretch: {
        width: "100%",
        height: "43%",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 5,
        marginTop: 8,
        flexDirection: "column"
    },
    loginFormWrap: {
        width: wp("89%"),
        height: hp("80%"),
        backgroundColor: "#FFFFFF",
        borderRadius: 16,
        flexDirection: "column",
        elevation: 20
    },
    textInputWrap: {
        marginTop: 20,
        borderTopLeftRadius: 16,
        borderBottomLeftRadius: 16,
        backgroundColor: "#fff",
        flexDirection: "column",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column"
    },
    button: {
        justifyContent: "center",
        alignItems: "center"
        // width:'80%',
        // height: '10%',
    },
    loginBtn: {
        borderBottomRightRadius: 30,
        borderTopRightRadius: 30,
        borderBottomLeftRadius: 30,
        borderTopLeftRadius: 30,
        marginTop: 50,
        // marginLeft: 25,
        backgroundColor: "#F4B132",
        width: "80%",
        height: 45,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
    input: {
        width: "60%",
        fontSize: 16
    },
    EyePasswordBtnIcon: {
        color: "black",
        fontSize: 24,
        position: "absolute",
        right: -25,
        flexDirection: "column"
    }
});
