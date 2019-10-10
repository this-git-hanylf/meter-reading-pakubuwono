import React, { Component } from 'react';
import {ActivityIndicator,AsyncStorage,StatusBar} from 'react-native';
import { Scene, Router, Actions, Stack, ActionConst } from 'react-native-router-flux';
import {USER_KEY} from '@Config/Services';
import Style from './theme/Style';

import Home from './view/Home';
import Launch from './view/Launch';
import Login from './view/Auth';
import ResetPass from './view/ResetPass';

import Download from './view/Download';

import Reading from './view/Reading/Reading';
import ReadingScan from './view/Reading/ReadScan';
import ReadingForm from './view/Reading/ReadingForm';
import ReadCode from './view/Reading/ReadCode';


import Project from './view/Sumarry/Project';
import Air from './view/Sumarry/Air';
import Electricity from './view/Sumarry/Electricity';
import Water from './view/Sumarry/Water';

import FilterSearch from './view/ScanSearch/FilterSearch';
import ViewSearch from './view/ScanSearch/ViewSearch';

import SeeAll from './view/Upload/SeeAll';
import UploadAll from './view/Upload/UploadAll';
import TypeProject from './view/Sumarry/Type';
import SumaryView from './view/Sumarry/SumaryView';

import Setting from './view/Setting/setting';

class Routes extends Component {

    constructor(){
        super()

        this.state = {
            hasLogin : false,
            isLoaded : false
        }
    }

    async componentDidMount() {
        StatusBar.setBarStyle('dark-content', true)
        StatusBar.setBackgroundColor('#4A98F7',true)
        try {
            const user = await AsyncStorage.getItem(USER_KEY)
            console.log('user: ', user)
            if (user) {
                this.setState({hasLogin:true,isLoaded:true})
            } else {
                this.setState({hasLogin:null,isLoaded:true})
            }
        } catch (err) {
            console.log('error: ', err)
        }
    }
    
    render() {
        if(!this.state.isLoaded){
            return(
                <ActivityIndicator />
            )
        } else {
            return (
                <Router navigationBarStyle={Style.textBlack}>
                    <Stack key='root'  headerLayoutPreset="center">
                    {/* <Scene key='launch' component={Launch} hideNavBar={true} title=""/> */}

                    <Scene key='auth' initial={!this.state.hasLogin} component={Login} hideNavBar={true} title=""/>
                    <Scene key='home' initial={this.state.hasLogin} component={Home} hideNavBar={true} title="" type={ActionConst.RESET} />
                    
                    <Scene key='resetPass' component={ResetPass} hideNavBar={true} title=""/>
                    <Scene key='download' component={Download} titleStyle={Style.textBlack} title="Download"/>
                    <Scene key='reading' component={Reading} NavBar={true} titleStyle={Style.textBlack} title="Reading"/>
                    <Scene key='readingScan' component={ReadingScan} NavBar={true} titleStyle={Style.textBlack} title="Scan Barcode"/>
                    <Scene key='readCode' component={ReadCode} NavBar={true} titleStyle={Style.textBlack} title=""/>
                    <Scene key='readingForm' component={ReadingForm} NavBar={true} titleStyle={Style.textBlack} title="Reading Form"/>
                    <Scene key='project' component={Project} NavBar={true} titleStyle={Style.textBlack} title="Project"/>
                    <Scene key='air' component={Air} hideNavBar={true} titleStyle={Style.textBlack} title=""/>
                    <Scene key='electricity' component={Electricity} hideNavBar={true} titleStyle={Style.textBlack} title=""/>
                    <Scene key='typeproject' component={TypeProject} NavBar={true} titleStyle={Style.textBlack} title="Type"/>
                    <Scene key='sumaryview' component={SumaryView} NavBar={true} titleStyle={Style.textBlack} title="Summary"/>
                    <Scene key='water' component={Water} hideNavBar={true} titleStyle={Style.textBlack} title=""/>
                    <Scene key='filterSearch' component={FilterSearch} NavBar={true} titleStyle={Style.textBlack} title="Filter Search"/>
                    <Scene key='viewSearch' component={ViewSearch} NavBar={true} titleStyle={Style.textBlack} title="View Search"/>
                    <Scene key='seeAll' component={SeeAll} hideNavBar={true} titleStyle={Style.textBlack} title=""/>
                    <Scene key='uploadAll' component={UploadAll} NavBar={true} titleStyle={Style.textBlack} title="Upload"/>
                    <Scene key='setting' component={Setting} NavBar={true} titleStyle={Style.textBlack} title="Setting"/>
                    </Stack>
                </Router>

            );
        }
    }

}


export default Routes;