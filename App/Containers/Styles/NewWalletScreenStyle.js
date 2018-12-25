import { StyleSheet, PixelRatio } from 'react-native';
import { ApplicationStyles, Colors, Fonts, Metrics } from '../../Themes/';

export default StyleSheet.create({
    ...ApplicationStyles.screen,
    topSection:{
        height:150,
        justifyContent:'center',
        alignItems:'center',
    },
    titleStytle:{
        fontSize:Fonts.size.input,
        color:Colors.backColor,
        marginTop: 10,
    },
    inputSection:{
    },
    inputView:{
        height:40,
        marginHorizontal:Metrics.section,
        borderBottomColor:Colors.separateLineColor,
        borderBottomWidth:1 / PixelRatio.get(),
        flexDirection:'row',
        alignItems:'center',
    },
    textInput:{
        flex:1,
    },
    bottomSection:{
        flex:1,
        justifyContent:'flex-end',
    },
    containerViewStyle:{
        marginBottom:Metrics.bottomSpace + Metrics.baseMargin,
    },
    buttonStyle:{

    },
    btnTitle:{
        fontSize:Fonts.size.input,
    },
    remindView:{
        width:Metrics.screenWidth - Metrics.section * 2,
        backgroundColor:'#FED605',
        position:'absolute',
        alignSelf:'center',
        bottom:85,

        flexDirection:'row',
        padding:Metrics.doubleBaseMargin,
        alignItems:'center',
        borderRadius:10,
    },
    rightRemind:{
        flex:1,
        paddingLeft:Metrics.doubleBaseMargin,
    },
    remindText:{
        fontSize:Fonts.size.small,
    }

});
