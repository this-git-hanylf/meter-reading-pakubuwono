import { StyleSheet,Dimensions,Platform } from "react-native";

const bg = "#F3F3F3";
const text = "#4A4A4A";

export const css = StyleSheet.create({
    center: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    rowPad10: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginLeft: Dimensions.get('window').width / 12,
        marginRight: Dimensions.get('window').width / 12,
    },
    h1: {
        fontSize: 28
    },
    pad10: {
        padding: 10
    },
    sm6: {
        margin: Dimensions.get('window').width / 13,
        width: Dimensions.get('window').width / 6 + 4,
        height: Dimensions.get('window').height / 10,
    },
    lg4: {
        margin: 15,
        width: Dimensions.get('window').width / 2.8 + 16,
        height: Dimensions.get('window').height / 3.6,
    },
    md4: {
        margin: 15,
        width: Dimensions.get('window').width / 4 - 6,
        height: Dimensions.get('window').height / 7,
    },
    md5: {
        margin: 20,
        width: Dimensions.get('window').width / 3 - 20,
        height: Dimensions.get('window').height / 6.4
    },
    md6: {
        margin: 2,
        width: Dimensions.get('window').width / 2 - 6,
        height: Dimensions.get('window').height / 3.5,
        backgroundColor: '#ccc'
    },
    md12: {
        margin: 2,
        width: Dimensions.get('window').width / 1 - 6,
        height: Dimensions.get('window').height / 3.5,
        backgroundColor: '#ccc'
    },
    /* Text */
    txtWhite: {
        color: '#fff'
    },
    txtBlack: {
        color: '#000'
    },
    txtLG: {
        fontSize: 40,
    },
    txtMD: {
        fontSize: Dimensions.get('window').width/13,
    },

    /*Input Text*/
    inputMd12: {
        // marginLeft: Dimensions.get('window').width / 12,
        // marginRight: Dimensions.get('window').width / 12,
        paddingTop: 30,
        width: Dimensions.get('window').width / 1.2,
        height: Dimensions.get('window').height / 10,
        borderBottomWidth: 2,
        borderBottomColor: '#4db8ff'
    },
    inputSm6: {
        paddingBottom: 10,
        width: Dimensions.get('window').width / 2,
        height: Dimensions.get('window').height / 20,
        borderBottomWidth: 2,
        borderBottomColor: '#4db8ff',
        fontSize: 16
    },
    inputMd6: {
        // marginLeft: Dimensions.get('window').width / 12,
        width: Dimensions.get('window').width / 2,
        height: Dimensions.get('window').height / 10,
        paddingTop: 20,
        borderBottomWidth: 2,
        borderBottomColor: '#4db8ff'
    },

    /* BUTTON */
    btn12: {
        marginLeft: Dimensions.get('window').width / 12,
        marginRight: Dimensions.get('window').width / 12,
        width: Dimensions.get('window').width / 1.2,
        height: Dimensions.get('window').height / 10,
        backgroundColor: '#008ae6',
        justifyContent: 'center',
        alignItems: 'center',
    },
    btn6: {
        marginLeft: Dimensions.get('window').width / 75,
        marginRight: Dimensions.get('window').width / 75,
        width: Dimensions.get('window').width / 2.5,
        height: Dimensions.get('window').height / 10,
        justifyContent: 'center',
        alignItems: 'center',
    },

    smBtn6: {
        // marginRight: 40,
        width: Dimensions.get('window').width / 3,
        height: Dimensions.get('window').height / 10,
        backgroundColor: '#008ae6',
        justifyContent: 'center',
        alignItems: 'center',
    },

    /* Navigator */
    navigationBarStyle: {
        backgroundColor: bg
    },
    titleStyle: {
        backgroundColor: bg,
        color: text
    },
    sceneStyle: {
        backgroundColor: bg
    },
    /* BG */
    bgCover: {
        flex: 1,
        flexDirection: 'column',
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    },

    /*LOADING*/

    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    /* CAMERA */
    camContainer: {
        flex: 1,
    },
    camPreview: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    camCapture: {
        marginTop: Dimensions.get('window').height / 1.8,
        fontSize: 40,
        color: 'white',
        alignSelf: 'center',
    },

    /*DRAWER*/
    Root_Sliding_Drawer_Container:
    {
        position: 'absolute',
        flexDirection: 'row',
        left: -40,
        bottom: 0,
        top: (Platform.OS == 'ios') ? 0 : 0,
        width: Sliding_Drawer_Width,
        zIndex: 10,

    },

    Main_Sliding_Drawer_Container:
    {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#CCCCCC',
        marginLeft: 40,
        paddingTop: 30,
        paddingLeft: 30
    },

    /*Indicator*/
    green: {
        width: Dimensions.get('window').width / 30,
        height: Dimensions.get('window').width / 30,
        borderRadius: 25,
        backgroundColor: '#41ef07',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 7,
        marginLeft: 3
    },
    red: {
        width: Dimensions.get('window').width / 30,
        height: Dimensions.get('window').width / 30,
        borderRadius: 25,
        backgroundColor: '#ff0000',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 7,
        marginLeft: 3
    }

});