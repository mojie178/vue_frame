/*
 * @Title: 公共验证
 * @Descripttion: 方法名称建议以 validate 开头
 * @Author: shaojihao
 */

import {
  phoneRegx,
  carNumberRegx,
  telRegx,
  trailerNumberRegx,
  numCaseRegx,
  faxRegx,
  postcodeRegx,
  positiveIntRegx,
  idCardRegx,
  emailRegx,
  bankCodeRegx,
  moneyRegx,
  numberFloatRegx,
  numUpperCaseRegx
} from './regexp.js';

// 验证手机号
export const validatePhone = (rule, value, callback) => {
  if (value !== '' && !phoneRegx.test(value))
    callback(new Error('请输入正确的手机号'));
  else callback();
}

// 只能输入字母数字
export const validateLetterAndNum = (rule, value, callback) => {
  if (value !== '' && !numCaseRegx.test(value))
    callback(new Error('请输入字母或数字'));
  else callback();
}

// 验证车牌号
export const validateCardNum = (rule, value, callback) => {
  if (value !== '' && !carNumberRegx.test(value))
    callback(new Error('请输入正确的车牌号'));
  else callback();
}

// 验证挂车牌号
export const validateTrailerCardNumNoPre = (rule, value, callback) => {
  if (value !== '' && !trailerNumberRegx.test(value))
    callback(new Error('请输入正确的挂车车牌号'));
  else callback();
}

// 验证固话
export const validateTel = (rule, value, callback) => {
  if (value !== '' && !telRegx.test(value))
    callback(new Error('请输入正确的电话号码'));
  else callback();
}

// 验证传真
export const validateFacsimile = (rule, value, callback) => {
  if (value !== '' && !faxRegx.test(value))
    callback(new Error('请输入正确的传真号码'));
  else callback();
}

// 验证邮政编码
export const validatePostCode = (rule, value, callback) => {
  if (value !== '' && !postcodeRegx.test(value))
    callback(new Error('请输入正确的邮政编码'));
  else callback();
}

// 数字
export const validateNumber = (rule, value, callback) => {
  if (value !== '' && !moneyRegx.test(value))
    callback(new Error('请输入正确的数字'));
  else callback();
}

// 数字（小数点后两位）
export const validateNumberFixed = (rule, value, callback) => {
  if (value!=='' && value!==null && !moneyRegx.test(value))
    callback(new Error('请输入正确的数字'));
  else if (value && !numberFloatRegx.test(value))
    callback(new Error('最多输入十位且保留小数点后两位'));
  else callback();
}

// 正则大于零数
export const validatePositiveNumber = (rule, value, callback) => {
  if (value && parseFloat(value) <= 0)
    callback(new Error('请输入大于零的数字'));
  else callback();
}

// 正则大于等于零数
export const validatePositiveNumberZero=(rule, value, callback) => {
  if (value&&parseFloat(value) < 0)
    callback(new Error('请输入大于等于零的数字'));
  else callback();
}

// 正整数
export const validateDigits = (rule, value, callback) => {
  if (value && !positiveIntRegx.test(value))
    callback(new Error('请输入正确的正整数'));
  else callback();
}

// 身份证校验
export const validateIdCard = (rule, value, callback) => {
  if (value !== '' && !idCardRegx.test(value))
    callback(new Error('请输入正确的身份证号'));
  else callback();
}

// 邮箱校验
export const validateEmail = (rule, value, callback) => {
  if (value !== '' && !emailRegx.test(value))
    callback(new Error('请输入正确的邮箱'));
  else callback();
}

// 统一社会信用代码校验
export const validateSocialCreditCode = (rule, value, callback) => {
  // 18位校验及大写校验
  if ((value.length !== 18) || (numUpperCaseRegx.test(value) === false))
    callback(new Error('不是有效的统一社会信用编码！'));
  else {
    let checkcode = value.substring(17, 18);
    let Ancode; // 统一社会信用代码的每一个值
    let Ancodevalue; // 统一社会信用代码每一个值的权重 
    let total = 0;
    let weightedfactors = [1, 3, 9, 27, 19, 26, 16, 17, 20, 29, 25, 13, 8, 24, 10, 30, 28]; // 加权因子
    let str = '0123456789ABCDEFGHJKLMNPQRTUWXY';
    for (let i = 0; i < value.length - 1; i++) { // 不用I、O、S、V、Z 
      Ancode = value.substring(i, i + 1);
      Ancodevalue = str.indexOf(Ancode);
      total = total + Ancodevalue * weightedfactors[i]; // 权重与加权因子相乘之和
    }
    let logiccheckcode = 31 - total % 31;
    if (logiccheckcode === 31) logiccheckcode = 0;
    let Str = '0,1,2,3,4,5,6,7,8,9,A,B,C,D,E,F,G,H,J,K,L,M,N,P,Q,R,T,U,W,X,Y';
    logiccheckcode = Str.split(',')[logiccheckcode];
    if (logiccheckcode !== checkcode) callback(new Error('不是有效的统一社会信用编码！'));
    else callback();
  }
}

// 证银行卡号
export const validateBankCode = (rule, value, callback) => {
  if (value !== '' && !bankCodeRegx.test(value))
    callback(new Error('请输入正确的证银行卡号'));
  else callback();
}

// 地址选择到地市级别
export function validateAddress(rule, value, callback) {
  value = typeof value === 'string' ? value.split('-') : value; // 判断是数组还是字符串
  if (value.length === 0) callback(new Error('请选择地址'));
  else if (value.length === 1) callback(new Error('地址至少选择到市级'));
  else callback();
}

// 自定义验证密码 请输入6个字符以上密码以及必填
export function validatePass(rule, value, callback) {
  if (!value) callback(new Error('请输入密码'));
  else if (value.length < 6) callback(new Error('请输入6个字符以上密码'));
  else callback();
}
