/*
 * @Title: 加密解密
 * @Descripttion: 
 * @Author: shaojihao
 * @Date: 2021-01-19 19:30:42
 * @LastEditTime: 2021-01-20 15:42:30
 */
import CryptoJS from 'crypto-js';

// 前端数据进行加密解密
const key = 'hui_Lian_Yun_Encrypt';
const iv = '1576655505689';

/**
 * @name: 加密
 * @param {*} text
 * @return {string}
 */
function Encrypt(text) {
  return CryptoJS.AES.encrypt(text, CryptoJS.enc.Utf8.parse(key), {
    iv: CryptoJS.enc.Utf8.parse(iv),
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  }).toString();
}

/**
 * @name: 解密
 * @param {*} text
 * @return {string}
 */
function Decrypt(text) {
  const decrypted = CryptoJS.AES.decrypt(text, CryptoJS.enc.Utf8.parse(key), {
    iv: CryptoJS.enc.Utf8.parse(iv),
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  })
  return decrypted.toString(CryptoJS.enc.Utf8);
}

export default {
  Encrypt,
  Decrypt
}
