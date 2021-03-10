import React, { Component } from "react";
import { View,Text,Image, StyleSheet,TextInput,TouchableOpacity, AsyncStorage,StatusBar,ActivityIndicator,Platform } from "react-native";
import {USER_KEY,urlApi} from '@Config/Services';
import { Actions } from "react-native-router-flux";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DeviceInfo from 'react-native-device-info';
import TextInputs from "../components/InputText/TextInput";
class Login extends Component {

    constructor(props){
        super(props)

        this.state = {
            txtUsername : '',
            txtPassword : '',

            isHidden : true,
            isLoaded : true
        }
    }

    componentDidMount(){
        // this.setState({device:Platform.OS});
    }

    btnLoginClick = async () => {
        const mac = await DeviceInfo.getMACAddress().then(mac => {return mac});
        const formData = {
            email : this.state.txtUsername,
            password : this.state.txtPassword,
            token : '',
            token_firebase : "",
            device : Platform.OS,
            mac : mac,
            app : "M"
        }
        var lengthPass = this.state.txtPassword.length;
        if(lengthPass < 4 ){
            // this.setState({isCorrect:false,titleButtonAlert:"Try Again"});
            alert('Wrong password !!!')
        }else{
            this.doLogin(formData);
        }
        
        
    }

    async doLogin (value) {
        this.setState({isLoaded: !this.state.isLoaded});
        data = JSON.stringify(value);

        fetch(urlApi+'c_auth/Login',{
            method:'POST',
            headers : {
                'Accept':'application/json',
                'Content-Type' : 'application/json',
            },
            body : data
        }).then((response) => response.json())
        .then((res)=>{
            if(!res.Error){
                if(res.Data.isResetPass == 1){
                    this.setState({isLoaded: !this.state.isLoaded},()=>{
                        Actions.resetPass({email : res.Data.user});
                    });
                } else {
                    if(res.Data.AllowMeterApp == "Y"){
                        this.signIn(res);
                    } else {
                        alert("Your user doesn't allow to using this app, please tell your administrator to help your problem");
                        this.setState({isLoaded: !this.state.isLoaded});
                    }
                }
                console.log('res',res);
            } else {
                this.setState({isLoaded: !this.state.isLoaded},()=>{
                    alert(res.Pesan)
                });
            }
            console.log('Login Result',res);
        }).catch((error) => {
            console.log(error);
        });
        
    }

    signIn = async(res) =>{
        const {txtUsername,txtPassword} = this.state
        try {
            const user = await AsyncStorage.setItem(USER_KEY, txtUsername)
            console.log('user successfully signed in!', txtUsername)

            this._storeData('@UserId', res.Data.UserId);
            this._storeData('@Name', res.Data.name);
            this._storeData('@Token', res.Data.Token);
            this._storeData('@User', res.Data.user);
            this._storeData('@Group', res.Data.Group);
            this._storeData("@isLogin","true");
            this._storeData("@isReset",res.Data.isResetPass.toString());
            this._storeData("@AgentCd",res.Data.AgentCd?res.Data.AgentCd:'');
            this._storeData("@Debtor",res.Data.Debtor_acct?res.Data.Debtor_acct:'');
            this._storeData('@rowID', res.Data.rowID.toString());
            this._storeData('@RefreshProfile', "false");
            this._storeData('@SaveDataMeter', "[]");

            this.setState({isLoaded : true},()=>{
                Actions.home()
            })

           
        } catch(err){
            console.log('error:', err)
        }
    }

    _storeData = async (name,data) =>{
        try {
            await AsyncStorage.setItem(name,data)
        } catch (error) {
            console.log('ErrorStoreData', error)
        }
    }

    handleEyeChanger = () =>{
        this.setState({isHidden : !this.state.isHidden},()=>{
            this.refs['password'].blur()
        })
    }

    render() {
        return (
            // <View style={styles.container}>
            //     <StatusBar backgroundColor='#1d2c3a'/>
            //     <View style={styles.loginFormWrap} pointerEvents={this.state.isLoaded ? "auto" : "none"}>
            //         <View style={styles.textInputWrap}>
            //             <TextInput style={styles.input} placeholder="Username" value={this.state.txtUsername} onChangeText={(val)=>this.setState({txtUsername : val})} />
            //             <View style={{backgroundColor:'#D7D7D7',height:1,width:'80%' }}></View>
            //             <View style={{flexDirection:'row',alignItems: 'center',}}>
            //                 <TextInput ref="password" style={styles.input} placeholder="Password" value={this.state.txtPassword} onChangeText={(val)=>this.setState({txtPassword : val})} secureTextEntry={this.state.isHidden}/>
            //                 <Icon style={styles.EyePasswordBtnIcon} name={this.state.isHidden ? "eye" : "eye-off"} size={5} onPress={()=>this.handleEyeChanger()}/>
            //             </View>
            //         </View>
            //         <TouchableOpacity style={styles.loginBtn} onPress={()=>this.btnLoginClick()}>
            //             {this.state.isLoaded ? 
            //                 <Icon name="arrow-right" size={30} color="#fff" />
            //             :
            //                 <ActivityIndicator color="#fff" size={30} />
            //             }
            //         </TouchableOpacity>
            //     </View>
            // </View>

            <View style={styles.container}>
                <View style={styles.loginFormWrap} pointerEvents={this.state.isLoaded ? "auto" : "none"}>
                        <Image
                        style={styles.stretch}
                        source={require('@Assets/images/login/head-login.png')}/>
                         <Text style={styles.textlogin}>Login</Text>
                        <View style={styles.textInputWrap}>

                            <TextInputs
                                width="70%"
                                height="7%"
                                value={this.state.txtUsername}
                                placeholder="Username"
                                containerStyle={{elevation : 2}}
                                onChangeText={val => this.setState({ txtUsername: val })}
                            />
                            <View>
                                <TextInputs
                                    width="70%"
                                    height="7%"
                                    password = {true}
                                    value={this.state.txtPassword}
                                    placeholder="Password"
                                    containerStyle={{elevation : 2}}
                                    onChangeText={val => this.setState({ txtPassword: val })}
                                />
                            </View>
                                {/* <TextInput ref="password" style={styles.input} placeholder="Password" value={this.state.txtPassword} onChangeText={(val)=>this.setState({txtPassword : val})} secureTextEntry={this.state.isHidden}/>
                                <Icon style={styles.EyePasswordBtnIcon} name={this.state.isHidden ? "eye" : "eye-off"} size={5} onPress={()=>this.handleEyeChanger()}/> */}
                        </View>

                      
                      <View style={styles.button}>
                      <TouchableOpacity style={styles.loginBtn} onPress={()=>this.btnLoginClick()}>
                            {this.state.isLoaded ? 
                            // <Icon name="arrow-right" size={30} color="#fff" />
                            <Text style={{color: 'white', fontSize: 16}}>Continue</Text>
                        :
                            <ActivityIndicator color="#fff" size={30} />
                        }
                        </TouchableOpacity>
                      </View>
                        
                    
                    
                </View>
               
                
            </View>
        );
    }
}
export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor : '#4A98F7',  
    },
    textlogin:{
        color: '#F4B132',
        // width: 50,
        fontWeight: 'bold',
        fontSize: 22,
        textAlign: 'center'
    },
    stretch:{
        width: '100%',
        height: '43%',
        alignSelf: 'center',
        justifyContent: 'center',
        marginBottom: 5,
        marginTop: 8,
        flexDirection: 'column'  
    },
    loginFormWrap : {
        width: wp('89%'),
        height: hp('80%'),
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        flexDirection: 'column',
        elevation : 20
    },
    textInputWrap :{
        marginTop: 20,
        borderTopLeftRadius: 16,        
        borderBottomLeftRadius: 16,        
        backgroundColor : '#fff',
        flexDirection: 'column',
        width:'100%',
        alignItems: 'center',
        justifyContent : 'center',
        flexDirection: 'column'
    },
    button: {
        justifyContent:'center',
        alignItems : 'center',
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
        backgroundColor : '#F4B132',
        width:'80%',
        height: 45,
        flexDirection: 'column',
        justifyContent:'center',
        alignItems : 'center',
    },
    input : {
        width : '60%',
        fontSize : 16
    },
    EyePasswordBtnIcon : {
        color: 'black',
        fontSize: 24,
        position: 'absolute',
        right : 0,
        bottom : 9,
        flexDirection: 'column'
    }
});