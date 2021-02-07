/*
 * @Title: 密码加密
 * @Descripttion: 
 * @Author: shaojihao
 * @Date: 2021-01-19 11:02:47
 * @LastEditTime: 2021-01-19 19:48:18
 */

import { JSEncrypt } from 'jsencrypt';

/**
 * @name: 随机生成字符串
 * @param {number} e
 * @return {string}
 */
function randomString(e) {
  e = e || 32;
  let t = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678', a = t.length, n = '';
  for (let i = 0; i < e; i++) {
    n += t.charAt(Math.floor(Math.random() * a));
  }
  return n;
}

/**
 * @name: 密码加密
 * @param {*} password
 * @param {*} salt
 * @return {*}
 */
export function rsaPasswordEncryt(password, salt = '') {
  if (salt.length === 0) salt = randomString(7);
  let crypt = new JSEncrypt();
  crypt.setKey(
    'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCLa8aONMd2lds53QWMmtisASipbtBJkZ0hGbSy5H3TShzqgWOv/TYc3QuiwwPqL/5y9mU2htvLwlMQS2N847yeBUp8a+H38zySluKwhz401zoqj5T1KTV35iOu0XDqHIhcJGAPnQ2d7/t0/VUXGy6Dvdf5IJ3RIb9B+zh7XPjEIQIDAQAB',
  );
  const newPassword = crypt.encrypt(password + salt);
  return { password, newPassword, salt };
}

