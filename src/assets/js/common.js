/**
 * 公共方法
 */

// 正则表达式
export const regMobile = /^1\d{10}$/ // 手机号
export const regTel = /^[-\d]+$/ // 手机号或者固话
export const regIdentity = /(^\d{15}$)|(^\d{17}(\d|X|x)$)/ // 身份证
export const regEmail = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/ // 邮箱
export const regName = /^\w{3,20}$/ // 用户名
export const regPassword = /^[a-zA-Z0-9]{6,20}$/ // 密码
export const regYZM = /\d{4}/ // 验证码
export const regNumLetLine = /^\w+$/ // 字母数字或者下划线
export const regChinese = /^[\u4e00-\u9fa5]*$/ // 中文

// 时间戳转化正常时间
export const timeChange = (time, flag) => {
    let newTime = new Date(time)
    let year = newTime.getFullYear()
    let mouth = (newTime.getMonth() + 1) < 10 ? `0${newTime.getMonth() + 1}` : (newTime.getMonth() + 1)
    let day = newTime.getDate() < 10 ? `0${newTime.getDate()}` : newTime.getDate()
    let hour = newTime.getHours() < 10 ? `0${newTime.getHours()}` : newTime.getHours()
    let minute = newTime.getMinutes() < 10 ? `0${newTime.getMinutes()}` : newTime.getMinutes()
    let second = newTime.getSeconds() < 10 ? `0${newTime.getSeconds()}` : newTime.getSeconds()
    let week = `星期${'日一二三四五六'.charAt(newTime.getDay())}`
    switch(flag) {
        case 1:
            return `${year}-${mouth}`
        case 2:
            return `${year}-${mouth}-${day}`
        case 3:
            return `${hour}:${minute}:${second}`
        case 4:
            return `${year} 年 ${mouth} 月 ${day} 日 ${hour}:${minute}:${second} ${week}`
        default:
            return `${year}-${mouth}-${day} ${hour}:${minute}:${second}`
    }
}

// 图片上传前验证
export const isLegalImg = (vm, file, cb) => {
    let format = ['png', 'jpg', 'jpeg']
    let index = file.name.lastIndexOf('.')
    let suffix = file.name.substring(index + 1)
    if (format.indexOf(suffix) === -1) {
        vm.$alert('只能上传png/jpg/jpeg文件', {
          type: 'warning'
        })
        cb&&cb.error()
        return false
    } else if (file.size > 2 * 1024 * 1024) {
        vm.$alert(`文件需限制在2M以内, 当前文件大小${(file.size / 1024 / 1024).toFixed(2)}M`, {type: 'warning'})
        cb&&cb.error()
        return false
    } else {
        cb&&cb.success()
        return true
    }
}

// 文件上传
export const isLegalDocument = (vm, file, cb) => {
    if (file.size > 50 * 1024 * 1024) {
        vm.$alert(`文件需限制在50M以内, 当前文件大小${(file.size / 1024 / 1024).toFixed(2)}M`, {type: 'warning'})
        cb&&cb.error()
        return false
    } else {
        cb&&cb.success()
        return true
    }
}