import { call, put, select, all } from 'redux-saga/effects';
import GethModule from '../Lib/NativeBridge/WalletUtils';
import WalletActions from '../Redux/WalletRedux';


export function *gethInit (action) {
    const {isLogin=false, rawurl='', passphrase=''} = action;
    yield put(WalletActions.setLoading({loading:true}));
    yield GethModule.init({isLogin, rawurl, passphrase});
    yield put(WalletActions.setLoading({loading:false}));

}

// const passphrase = '11111111';
export function *gethNewAccount (action) {
    const {passphrase=''} = action;
    yield put(WalletActions.setLoading({loading:true}));
    const address = yield GethModule.newAccount({passphrase});
    console.log('===========address=========================');
    console.log(address);
    console.log('===========address=========================');
    yield put(WalletActions.setLoading({loading:false}));
}

// const mnemonic = 'tag fee recycle palace nominee van dawn mail approve crash opinion scheme';
// const passphrase = '11111111';
export function *gethImportMnemonic (action) {
    const {mnemonic='', passphrase=''} = action;
    yield put(WalletActions.setLoading({loading:true}));
    yield GethModule.importMnemonic({mnemonic, passphrase});
    yield put(WalletActions.setLoading({loading:false}));
}

// const privateKey = '0x1e1066173a1cf3467ec087577d2eca919cabef5cd7db5d004fb9945cc090abce';
// const passphrase = '11111111';
export function *gethImportPrivateKey (action) {
    const {privateKey='', passphrase=''} = action;
    yield put(WalletActions.setLoading({loading:true}));
    yield GethModule.importPrivateKey({privateKey, passphrase});
    yield put(WalletActions.setLoading({loading:false}));
}

// const passphrase = '11111111';
export function *gethExportPrivateKey (action) {
    const {passphrase=''} = action;
    yield put(WalletActions.setLoading({loading:true}));
    yield GethModule.init({passphrase});
    yield put(WalletActions.setLoading({loading:false}));
}


