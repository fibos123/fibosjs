# @mingfunwong/fibosjs

`@mingfunwong/fibosjs` 是基于 [eosjs](https://github.com/EOSIO/eosjs) 的 FIBOS 兼容库，提供了一些改动以支持 FIBOS 的公钥格式转换，并且可以与 FIBOS 区块链交互。

## 特性

- 基于 `eosjs` 进行修改，支持 FIBOS 区块链。
- 支持 FIBOS 公钥格式转换。
- 提供了基本的 EOSIO API 功能，包括连接节点、签名交易等。

## 使用
示例 1：获取账户余额
```javascript
import { JsonRpc } from '@mingfunwong/fibosjs';

async function getBalance(accountName) {
  const rpc = new JsonRpc("https://to-rpc.fibos.io", { fetch });

  const accounts = await rpc.get_table_rows({
    json: true,
    code: "eosio.token",
    scope: accountName,
    table: "accounts",
    table_key: "",
    lower_bound: "",
    upper_bound: "",
    limit: 100,
  });

  let balance = 0;

  if (accounts.rows && accounts.rows.length) {
    accounts.rows.map((account) => {
      if (account.balance.quantity.substr(-2) === "FO" && account.balance.contract === "eosio") {
        balance = parseFloat(account.balance.quantity);
      }
    });
  }

  return balance;
}
```

示例 2：发送转账
```javascript
import { Api, JsSignatureProvider, JsonRpc } from '@mingfunwong/fibosjs';

async function transfer(transferName, privateKey, to, memo, quantity) {
  const signatureProvider = new JsSignatureProvider([privateKey]);
  const rpc = new JsonRpc("https://to-rpc.fibos.io", { fetch });
  const api = new Api({ rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() });

  const transaction = {
    actions: [
      {
        account: "eosio.token",
        name: "transfer",
        authorization: [
          {
            actor: transferName,
            permission: "active",
          },
        ],
        data: {
          from: transferName,
          to: to,
          quantity: `${quantity.toFixed(4)} FO`,
          memo: memo,
        },
      },
    ],
  };
  
  const transactConfig = {
    blocksBehind: 3,
    expireSeconds: 30,
  };

  const result = await api.transact(transaction, transactConfig);

  return result;
}
```

## 安装

```bash
npm install @mingfunwong/fibosjs
