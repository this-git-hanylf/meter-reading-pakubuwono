import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';

import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome';

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from "react-native-responsive-screen";

export default class MeterPhoto extends Component {

    handleChoosePhoto = () => {
        const options = {
            title: 'Select Avatar',
            customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
            noData: true,
            storageOptions :{
                skipBackup: true,
                path : 'MeterRiding'
            }
        };
        ImagePicker.launchCamera(options, response => {
            if (response.uri){
                // this.setState({ photo:response })
                // this.setState(state => ({
                //         photos: [...state.photos, response]
                // }),()=>{
                //     this.props.image(response)
                // });
                this.props.image(response)
            }
            console.log('Response Photo',response);
        });
    };

    render(){
        const { photos } = this.props;
        return(
            <View style={styles.container}>
            <View style={styles.photo}>
                {photos.map(photo => (
                    <View style={styles.photoItem} key={photo.uri}>
                        <Image
                        resizeMode='cover'
                        source={{ uri: photo.uri }}
                        style={styles.photoIcon}
                        />
                        <Icon name="times" size={30} style={styles.IconRemove} onPress={()=>this.props.remove(photo.fileName)} />
                    </View>
                ))}
                {photos.length < 5 && (
                    <TouchableOpacity style={styles.photoItem}  onPress={this.handleChoosePhoto.bind(this)}>
                        <Text style={styles.text}>Add Photo</Text>
                    </TouchableOpacity>
                )}
            </View>
            {/* {photos.length < 5 && (
                <React.Fragment>
                    <TouchableOpacity style={styles.button} onPress={this.handleChoosePhoto.bind(this)}>
                        <Text style={styles.text}>Upload Photo</Text>
                    </TouchableOpacity>
                </React.Fragment>
            )} */}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:20,
        marginHorizontal : 16,
        backgroundColor :'#fff',
        borderRadius : 20,
        elevation : 5
    },
    button:{
        width: 250,
        height: 50,
        backgroundColor: '#dbfcfa',
        borderRadius: 30 ,
        justifyContent:'center',
        marginTop: 10,
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 1,
    },
    text: {
        fontSize:16,
        alignSelf: 'center',
        color: '#848484'
    },
    images:{
        width: 200,
        height: 200,
        marginTop: 30,
    },
    photo: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        flex: 1,
        flexWrap: 'wrap',
        width : wp('81%'),
        marginVertical: 10,
    },
    photoItem: {
        backgroundColor: '#f0f0f0',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 1,
        borderRadius: 5,
        width: wp('26.45%'),
        height : wp('26.45%'),
    },
    photoIcon: {
        borderRadius: 5,
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    IconRemove : {
        position :'absolute',
        right : 10,
        top : 10
    }
})