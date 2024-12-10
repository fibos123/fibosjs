import { Api } from 'eosjs/dist/eosjs-api.js';
import * as ApiInterfaces from 'eosjs/dist/eosjs-api-interfaces.js';
import { JsonRpc } from 'eosjs/dist/eosjs-jsonrpc.js';
import numeric from 'eosjs/dist/eosjs-numeric.js';
import * as RpcInterfaces from 'eosjs/dist/eosjs-rpc-interfaces.js';
import { RpcError } from 'eosjs/dist/eosjs-rpcerror.js';
import * as Serialize from 'eosjs/dist/eosjs-serialize.js';
import { JsSignatureProvider } from 'eosjs/dist/eosjs-jssig.js';

// https://github.com/FIBOSIO/fibos.js/blob/505c0c35aaf1b62c8dd632cf252e9a1b7d1eba18/lib/patch_numeric.js
numeric.prefix = "FO";

var stringToPublicKey = numeric.stringToPublicKey;
numeric.stringToPublicKey = function (s) {
    if (typeof s !== 'string')
        throw new Error('expected string containing public key');

    if (s.substr(0, numeric.prefix.length) === numeric.prefix)
        s = "EOS" + s.substr(numeric.prefix.length);

    return stringToPublicKey(s);
};

numeric.convertLegacyPublicKey = function (s) {
    if (s.substr(0, numeric.prefix.length) === numeric.prefix)
        return numeric.publicKeyToString(numeric.stringToPublicKey(s));

    return s;
};

var publicKeyToLegacyString = numeric.publicKeyToLegacyString;
numeric.publicKeyToLegacyString = function (key) {
    if (key.type === 0 && key.data.length === 33) {
        var s = publicKeyToLegacyString(key);
        return numeric.prefix + s.substr(3);
    }
    else
        return publicKeyToLegacyString(key);
};

const Numeric = numeric;

export { Api, ApiInterfaces, JsonRpc, Numeric, RpcInterfaces, RpcError, Serialize, JsSignatureProvider };