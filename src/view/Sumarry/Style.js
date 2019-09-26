import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from "react-native-responsive-screen";
import { Dimensions } from "react-native";
import { background, fonts, color } from "@Assets/styles/base";
import MAIN from "@Assets/styles/Theme";
export default {
    listView: {
        marginHorizontal: 5,
        marginVertical: 10,
        backgroundColor: "#fff",
        borderRadius: 16,
        // borderWidth: 2,
        elevation: 7,
        backgroundColor: "#fff"
    },
    view: {
        paddingHorizontal: 10,
        paddingVertical: 10
    },
    listViewContent: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    viewPhoto: {
        backgroundColor: "#f0f0f0",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 1,
        borderRadius: 5,
        marginleft: 1,
        width: "33%",
        flex: 1
    },
    viewPhotoIcon: {
        width: "100%",
        height: 100,
        flex: 1,
        borderRadius: 5
    },
    photoBadge: {
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        bottom: 1,
        left: 1,
        paddingHorizontal: 4,
        backgroundColor: "#fff",
        borderRadius: 20,
        elevation: 5
    },
    viewContent: {
        marginLeft: 10,
        flex: 2
    },
    textWrap: {
        marginHorizontal: 10,
        flexDirection: "row",
        width : '100%',
        // justifyContent:'center',
        alignItems: "center"
    },
    text: {
        flex: 1,
        flexWrap: "wrap",
        fontFamily: "Montserrat-Regular",
    },
    photoWrap: {
        marginVertical: hp("4%"),
        marginHorizontal: wp("5%")
    },
    photo: {
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        // flex: 1,
        flexWrap: "wrap"
    },
    photoItem: {
        backgroundColor: "#f0f0f0",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: hp("1%"),
        borderRadius: 5,
        width: "49%"
    },
    photoIcon: {
        // flex:1,
        width: "100%",
        height: 200,
        borderRadius: 5
    },
    photoViewer: {
        backgroundColor: "rgba(0,0,0,0)",
        flex: 1,
        justifyContent: "flex-end"
    },
    photoViewerContent: {
        elevation : 10,
        height: hp("80%"),
        backgroundColor: "#fff",
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16
    },

    cardContainer: {
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: hp("4.4%"),
        elevation: 20,
        backgroundColor: "#FFF",
        borderRadius: 20
    },

    cardHead: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: MAIN.COLORS.PRIMARY,
        width: wp("29%") * 3
        // borderWidth : 1,]
    },
    cardContent: {
        width: wp("29%") * 3,
        // borderBottomLeftRadius: 20,
        // borderBottomRightRadius: 20,
        // borderWidth: 1,
        backgroundColor: "#fff"
    },
    cardContext: {
        marginVertical: hp("3.4%"),
        marginHorizontal: wp("9%")
    },
    cardFooter: {
        width: wp("29%") * 3,
        backgroundColor: "#fff",
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        justifyContent: "center",
        alignItems: "center"
    },
    cardBottom: {
        marginBottom: hp("3.4%"),
        flexDirection: "row"
    },

    tab: {
        width: "33%",
        // paddingHorizontal: dw * 0.099,
        alignItems: "center",
        paddingVertical: wp("3%")
        // borderWidth : 0.5,
    },
    text: {
        fontSize: 16,
        marginVertical: hp("0.5%"),
        fontFamily: "Montserrat-Regular",
    },
    textTitle: {
        fontSize: 17,
        fontWeight: "bold",
        marginVertical: hp("0.5%")
    },
    btnWhite: {
        justifyContent: "center",
        alignItems: "center",
        width: wp("25%"),
        marginHorizontal: wp("1.9%"),
        paddingVertical: hp("2%"),
        borderRadius: 20,
        backgroundColor: "#fff",
        elevation: 3
    },
    listBottom: {
        marginTop: 8,
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center"
    },
    headerModal: {
        marginVertical: 5
    }
};
