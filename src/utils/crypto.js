import CryptoJS from 'crypto-js';
//DES加密

export const encryptByDES = function encryptByDES(message, key = 'WDNRTXBRCBFXJBFZ') {
  let keyHex = CryptoJS.enc.Utf8.parse(key);
  let encrypted = CryptoJS.DES.encrypt(message, keyHex, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  });
  return encrypted.ciphertext.toString();
};

//DES解密
export const decryptByDES = function decryptByDES(ciphertext, key) {
  let keyHex = CryptoJS.enc.Utf8.parse(key);
  let decrypted = CryptoJS.DES.decrypt(
    {
      ciphertext: CryptoJS.enc.Hex.parse(ciphertext),
    },
    keyHex,
    {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    }
  );
  return decrypted.toString(CryptoJS.enc.Utf8);
};
