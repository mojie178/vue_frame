/*
 * @Title: 公共正则
 * @Descripttion: 方法名称建议以 Regx 结尾
 * @Author: shaojihao
 */

// 用户名(字母开头，4-12 位字母或数字的组合)
export const userNameRegx = /^[A-Za-z][A-Za-z0-9]{3,11}$/;

// 密码(字母开头，6-12 位字母或数字的组合)
export const passwordRegx = /^[0-9A-Za-z]{6,12}$/;

// 强密码(由数字和字母组成，并且要同时含有数字和字母，且长度要在 8-16 位之间)
export const powerPasswordRegx = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/;

// 手机号码
export const phoneRegx = /^1\d{10}$/;

// 固定号码
export const telRegx = /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/;

// 传真
export const faxRegx = /^(\d{3,4}-)?\d{7,8}$/;

// 邮箱
export const emailRegx = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;

// 身份证号码
export const idCardRegx = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;

// 网址
export const urlRegx = /^(http|https|ftp):\/\/[A-Za-z0-9]+\.[A-Za-z0-9]+[/=?%\-&_~`@[\]':+!]*([^<>""])*$/;

// 邮政编码
export const postcodeRegx = /^[0-9]{6}$/;

// 行政区划代码
export const divisionCodeRegx = /^[0-9]{6}$/;

// 金额
export const moneyRegx = /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/;

// 小数点后两位
export const numberFloatRegx = /^\d{1,10}(?:\.\d{1,2})?$/;

// 车牌号
export const carNumberRegx = /^[\u4e00-\u9fa5]{1}[A-Z]{1}[A-Z_0-9]{5}$/;

// 挂车车牌号
export const trailerNumberRegx = /^[A-Z]{1}[A-Z_0-9]{4}$/;

// 银行卡
export const bankCodeRegx = /^([1-9]{1})(\d{14}|\d{18})$/;

// 正整数
export const positiveIntRegx = /^[0-9]*[1-9][0-9]*$/;

// 整数
export const intNumRegx = /^[0-9]+$/;

// 小数后4位 
export const numFloatRegx = /^\d+(\.\d{1,4})?$/;

// 小写字母
export const lowerCaseRegx = /^[a-z]+$/;

// 大写字母
export const upperCaseRegx = /^[A-Z]+$/;

// 大小写字母
export const alphabetsRegx = /^[A-Za-z]+$/;

// 大写字母数字
export const numUpperCaseRegx = /^[0-9A-Z]+$/;

// 字母数字
export const numCaseRegx = /^[a-zA-Z0-9]+$/;

// 字母、数字、下划线组合
export const numCaseLetterRegx = /^[0-9a-zA-Z_]+}$/;

// 合法 uri
export const legalUriRegx = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
