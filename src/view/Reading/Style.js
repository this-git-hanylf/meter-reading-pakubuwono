import {Dimensions} from 'react-native'
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;


export default {
    content :{
        width: '100%',
        justifyContent: 'center',
    },
    Wrap : {
        flexDirection : 'row',
        justifyContent : 'space-between',
        marginHorizontal : 32,
        marginVertical : 32,
        flex :1
    },
    subWrap :{
        marginHorizontal : 32,
        marginVertical : 8
    },
    icon : {
        color : '#fff',
        fontSize : 25
    },
    headerText : {
        color : '#fff',
        fontSize : 25,
        fontFamily : 'Montserrat-Regular'
    },
    headerTextBlack : {
        color : '#333',
        fontSize : 25,
        fontFamily : 'Montserrat-Regular'
    },
    labelText :{
        color : '#fff',
        fontSize : 12,
        fontFamily : 'Montserrat-Regular'
    },
    contentText :{
        color : '#fff',
        fontSize : 18,
        fontFamily : 'Montserrat-Regular'
    },
    buttonText : {
        color : '#fff',
        fontSize : 16.5,
        fontFamily : 'Montserrat-Regular'
    },
    image : {
        width : 100,
        height : 100,
        borderRadius : 50,
    },
    imageWrap :{
        width:100,
        height :100,
    },
    modalView :{
        flex: 1,
        justifyContent: 'flex-end',
    },
    modalContainer : {
        backgroundColor : '#fff',
        height: deviceHeight/2,
        width : deviceWidth,
        // justifyContent : 'center',
        alignItems: 'center',
        borderTopLeftRadius : 18,
        borderTopRightRadius : 18,        
    },
    modalHeader :{
        flexDirection : 'row',
        justifyContent : 'space-between',
        width : deviceWidth,
        paddingHorizontal : 25,
        paddingTop : 22

    },
    modalBody :{
        justifyContent : 'center',
        height: deviceHeight - (deviceHeight/1),
        width : deviceWidth,
        paddingHorizontal : 25,
        paddingTop : 22

    },
    iconModal :{
        fontSize : 25,
        color : '#333',
        right: 0,
        top :0,
        position : 'absolute'
    },
    textModal :{
        fontSize : 18,
        color : '#333'
    },
    subTitleModal :{
        // paddingVertical : 30,
        marginHorizontal : 24,
        paddingBottom : 50,
        fontSize : 16,
        color : '#333'
    },
    btnWrapModal :{
        marginHorizontal : 60,
        flexDirection : 'row',
        justifyContent : 'space-between'
    },
    btnYes :{
        width : 100,
        borderWidth : 1,
        borderColor : '#F9A233',
        borderRadius : 5,
        paddingVertical : 7,
        paddingHorizontal : 10,
    },
    btnNo :{
        width : 100,
        borderRadius : 5,
        backgroundColor : '#F99B23',
        paddingVertical : 7,
        paddingHorizontal : 10 
    },
    btnOrange :{
        width : 120,
        borderRadius : 5,
        backgroundColor : '#F99B23',
        paddingVertical : 7,
        paddingHorizontal : 10 
    },
    textNo :{
        color : '#fff',
        textAlign : 'center'
    },
    textYes : {
        color: '#F9A233',
        textAlign : 'center'
    },
    iconRemove: {
        backgroundColor: '#f3f3f3',
        position: 'absolute',
        borderRadius: 50,
        padding: 5,
        right: 0,
        bottom : 0
    },
    accordion: {
        width: '100%',
    },
    accordionTab: {
        flexDirection: 'row',
        padding: 15,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
        marginBottom: 1,
    },
    accordionTabText: {
        color: '#333',
        fontSize: 12,
        fontFamily: 'Montserrat-SemiBold',
    },
    accordionTabIcon: {
        fontSize: 14,
        color: '#666',
    },
    accordionContent: {
        paddingTop: 10,
        paddingBottom: 20,
    },

}