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
    },
  );
  return decrypted.toString(CryptoJS.enc.Utf8);
};

// 全站部分页面增加合计组件
// 页面优化（切换tab时禁止刷新页面），转包项目页面加载较慢
// 来款清单（导出所有数据，导出列表所选数据），日发薪统计导出
// 考勤管理，发薪管理，项目中心（列表增加字段及统计）
