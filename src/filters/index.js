/*
 * @Title: 公共过滤器
 * @Descripttion: 
 * @Author: shaojihao
 */

// 格式化货币
export const filterFormatMoney = (number, places, symbol, thousand, decimal) => {
  number = number || 0;
  places = !isNaN(places = Math.abs(places)) ? places : 2;
  symbol = symbol !== undefined ? symbol : '¥';
  thousand = thousand || ',';
  decimal = decimal || '.';
  const negative = number < 0 ? '-' : '';
  const i = parseInt(number = Math.abs(+number || 0).toFixed(places), 10) + '';
  let j = '';
  j = (j = i.length) > 3 ? j % 3 : 0;
  return symbol + negative + (j ? i.substr(0, j) + thousand : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousand) + (places ? decimal + Math.abs(number - i).toFixed(places).slice(2) : '');
};

// 格式化大额数字
export const filterFormatNumber = (number, places = 0, thousand, decimal) => {
  number = number || 0;
  places = !isNaN(places = Math.abs(places)) ? places : 2;
  thousand = thousand || ',';
  decimal = decimal || '.';
  const negative = number < 0 ? '-' : '';
  const i = parseInt(number = Math.abs(+number || 0).toFixed(places), 10) + '';
  let j = '';
  j = (j = i.length) > 3 ? j % 3 : 0;
  return negative + (j ? i.substr(0, j) + thousand : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousand) + (places ? decimal + Math.abs(number - i).toFixed(places).slice(2) : '');
};

// 去除双精度.00
export const filterClearZoor = (val) => {
  if (val.includes('.')) {
    let arr = val.split('.');
    if (arr[1] === '00') return arr[0];
    else return val;
  } else return val;
};

// 是否为空滤器
export const filterNull = (val) => {
  return val ? val : '-';
}

// 空金额
export function filterMoneyNull(val) {
  return val ? val : '0.00';
}

// 空数量
export function filterNumberNull(val) {
  return val ? val : '0';
}

// 去除后台传来的时间 T
export const filterClearT = (val) => {
  return val ? val.split('T')[0] + ' ' + val.split('T')[1] : '-';
};

// 取时间年月日
export const filterClearDay = (val) => {
  return val ? val.split('T')[0] : '-';
};

// 获取字典值name
export const filterName = (type,arr) => {
  return type && arr ? (arr.filter(item => item.dictitemVal == type)[0] && arr.filter(item => item.dictitemVal == type)[0].dictitemName) : '-';
};