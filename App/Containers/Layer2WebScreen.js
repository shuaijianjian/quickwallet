
import React, { Component } from 'react';
import { Share, Platform, View, WebView} from 'react-native';
import { connect } from 'react-redux';
import styles from './Styles/Layer2WebScreenStyle';
import RightComponent from '../Components/RightComponent';
import PassphraseInputAlert from '../Components/PassphraseInputAlert';
import SignTxResultAlert from '../Components/SignTxResultAlert';
import SignMsgResultAlert from '../Components/SignMsgResultAlert';
import WalletActions from '../Redux/WalletRedux';
import { EventEmitter, EventKeys } from '../Lib/EventEmitter';
import Spinner from 'react-native-loading-spinner-overlay';

const DEFAULT_URI = 'https://www.baidu.com';

class Layer2WebScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
      title:'Layer2',
      headerRight: (
          <RightComponent
              onPressRefresh={navigation.getParam('onPressRefresh')}
              onPressShare={navigation.getParam('onPressShare')}/>),
  });

  constructor(props){
      super(props);
      this.state={
          isShowPassphrase:false,
          isShowSignTx:false,
          isShowSignMsg:false,
      };
      this.passphrase = '';
  }

  componentDidMount() {
      this.props.navigation.setParams({ onPressRefresh: this._onPressRefresh });
      this.props.navigation.setParams({ onPressShare: this._onPressShare });

      this.isUnlockListener = EventEmitter.addListener(EventKeys.IS_UNLOCK_ACCOUNT, ({isUnlock})=>{
          if (isUnlock) {
              this._signInfo();
              return;
          }
          this.setState({
              isShowPassphrase:true,
          });
      });
      this.lockListener = EventEmitter.addListener(EventKeys.WALLET_UNLOCKED, ()=>this._signInfo());
  }

componentWillUnmount=()=>{
    this.lockListener.remove();
    this.isUnlockListener.remove();
}

_signInfo=()=>{
    const signInfo = {
        type:1,
        symbol:'ETH',
        decimal:18,
        tokenAddress:'',
        fromAddress:'0xb5538753F2641A83409D2786790b42aC857C5340',
        toAddress:'0x38bCc5B8b793F544d86a94bd2AE94196567b865c',
        value:'1',
        gasPrice:'12',
        msgInfo:'我怎么这么好看'
    };
    this.props.gethSignHash({passphrase:'11111111', signInfo});
}

_signTxCancel=()=>{
    this.setState({
        isShowSignTx:false,
    });
}

_signTxConfirm=()=>{
    this.setState({
        isShowSignTx:false,
    });
    this.props.gethIsUnlockAccount();
}

_signMsgCancel=()=>{
    this.setState({
        isShowSignMsg:false,
    });
}

_signMsgConfirm=()=>{
    this.setState({
        isShowSignMsg:false,
    });
    this.props.gethIsUnlockAccount();
}

_pswdCancel=()=>{
    this.setState({
        isShowPassphrase:false,
    });
}

_pswdConfirm=(passphrase)=>{
    this.setState({
        isShowPassphrase:false,
    });
    this.passphrase = passphrase;
    this.props.gethUnlockAccount({passphrase});
}

_onPressRefresh=()=>{
    this.webview.reload();
}

_onPressShare=()=> {
    const shareUrl = 'http://litex.io/';
    const {sharecode} = this.props;
    let shareParams = {};
    if (Platform.OS === 'ios') {
        const url =  shareUrl + '?sharecode=' + sharecode;
        shareParams = {url};
    } else {
        const message = shareUrl + '?sharecode=' + sharecode;
        shareParams = {message};
    }
    Share.share(shareParams);
};


_onMessage=(evt)=>{
    this._signInfo();
    // this.setState({
    //     isShowSignTx:true,
    // });

    // console.log('======ZJ====RN_onMessage==========================');
    // console.log(JSON.parse(evt.nativeEvent.data));
    // console.log('======ZJ====RN_onMessage==========================');

    //     const params = JSON.parse(evt.nativeEvent.data);
    //     const {name} = params;
    //     switch (name) {
    //     case 'signTransaction':{
    //         const message = {
    //             id: 8888,
    //             error: null ,
    //             value: {
    //                 from: '0xb5538753F2641A83409D2786790b42aC857C5340',
    //                 gasPrice: '20000000000',
    //                 gas: '21000',
    //                 to: '0x38bCc5B8b793F544d86a94bd2AE94196567b865c',
    //                 value: '1000000000000000000',
    //                 data: ''
    //             }
    //         };
    //         this.webview.postMessage(JSON.stringify(message));

    //     }
    //         break;
    //     case 'signMessage':{
    //         const message = {
    //             id: 8888,
    //             error: null ,
    //             value: {
    //                 data:'signMessage'
    //             }
    //         };
    //         this.webview.postMessage(JSON.stringify(message));
    //     }
    //         break;
    //     case 'signPersonalMessage':{
    //         const message = {
    //             id: 8888,
    //             error: null ,
    //             value: {
    //                 dataToSign:'data to sign',
    //                 address:'0xb5538753F2641A83409D2786790b42aC857C5340',
    //                 password:'11111111'
    //             }
    //         };
    //         this.webview.postMessage(JSON.stringify(message));
    //     }
    //         break;

//     default:
//         break;
//     }
}

render () {
    const uri = DEFAULT_URI;
    const {isShowPassphrase, isShowSignTx, isShowSignMsg} = this.state;
    const {loading} = this.props;
    const signInfo = {to:'0x1e1066173a1cf3467ec087577d2eca919cabef5cd7db', balance:'100', gas:'10'};
    const {to, balance, gas} = signInfo;

    // const alpha = require('../Resources/AlphaWallet-min.js');
    // const injectScript = alpha + signer;

    return (
        <View style={styles.container}>
            <SignTxResultAlert
                isInit={isShowSignTx}
                to={to}
                balance={balance}
                gas={gas}
                onPressCancel={()=>this._signTxCancel()}
                onPressConfirm={()=>this._signTxConfirm()}/>
            <PassphraseInputAlert
                isInit={isShowPassphrase}
                onPressCancel={()=>this._pswdCancel()}
                onPressConfirm={(passphrase)=>this._pswdConfirm(passphrase)}/>
            <SignMsgResultAlert
                isInit={isShowSignMsg}
                onPressCancel={()=>this._signMsgCancel()}
                onPressConfirm={()=>this._signMsgConfirm()}/>
            <Spinner visible={loading} cancelable
                textContent={'Loading...'}
                textStyle={styles.spinnerText}/>
            <WebView useWebKit
                ref ={ref=>this.webview = ref}
                onMessage={this._onMessage}
                style={styles.container}
                // injectedJavaScript={injectScript}
                source={require('./index.html')}/>
        </View>);
}
}

const mapStateToProps = (state) => {
    const {
        wallet:{ loading }
    } = state;
    return { loading };
};

const mapDispatchToProps = (dispatch) => ({
    gethIsUnlockAccount: () => dispatch(WalletActions.gethIsUnlockAccount()),
    gethUnlockAccount: (params) => dispatch(WalletActions.gethUnlockAccount(params)),
    gethSignHash: (params) => dispatch(WalletActions.gethSignHash(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Layer2WebScreen);

