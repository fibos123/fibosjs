import { Api, Numeric } from '../src/index.mjs';

// 测试 Numeric 模块
// https://segmentfault.com/a/1190000019658904
const legacyKey = "FO7zZJJdfTvGKpdudAcYQp1y97wP9cC9vG2McmeWzvgLWVnkVy9m";
const publicKey = Numeric.stringToPublicKey(legacyKey);

console.log("Legacy Key:", legacyKey);
console.log("Converted Public Key:", publicKey);
console.log("Back to Legacy Key:", Numeric.publicKeyToLegacyString(publicKey));

// 测试 Api 模块
console.log("Api module loaded:", Api ? "Success" : "Failed");
