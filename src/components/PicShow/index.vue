<!--
 * @Title: 图片放大展示
 * @Descripttion: 
 * @Author: shaojihao
-->

<template>
  <div ref="pic" v-if="show && src" class="pic_main">
    <div class="img_box" @mousedown.prevent="mousedown">
      <img :src="src" alt="" ref="img" />
    </div>
    <div class="dialog_footer">
      <span class="btn_pic" @click="scalePic(true)">放大</span>
      <span class="btn_pic" @click="scalePic(false)">缩小</span>
      <span class="btn_pic" @click="rotatePic">旋转</span>
      <span class="btn_pic close_btn" @click="show=false">关闭</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'picShow',
  props: {
    src: { // 图片路径
      type: String,
      default: ''
    }
  },
  data() {
    return {
      show: false, // 图片展示隐藏
      scaleNum: 1, // 放大比例
      rotateNum: 0, // 旋转角度
    }
  },
  methods: {
    /**
     * @name: 供外部父组件调用
     * @param {*}
     * @return {*}
     */    
    showDialog() {
      this.show = true;
    },
    /**
     * @name: 鼠标移动图片
     * @param {*} event
     */    
    mousedown(event) {
      let picDiv = this.$refs.pic; // 获取图片DOM元素
      let x = this.offset(picDiv).left;
      let y = this.offset(picDiv).top;
      let distanceX = event.pageX - x;
      let distanceY = event.pageY - y;
      // 图片移动
      document.onmousemove = function (ev) {
        let oevent = ev || event;
        picDiv.style.left = `${oevent.pageX - distanceX}px`;
        picDiv.style.top = `${oevent.pageY - distanceY}px`;
      }
      // 取消鼠标点击事件
      document.onmouseup = function () {
        document.onmousemove = null;
        document.onmouseup = null;
      }
    },
    /**
     * @name: 放大缩小图片
     * @param {boolean} flag
     */    
    scalePic(flag) {
      // true: 放大, false: 缩小
      if (flag) this.scaleNum += 0.2;
      else this.scaleNum -= 0.2;
      if (this.scaleNum < 0.2) this.scaleNum = 0.2; // 最小比例不能小于 0.2
      this.$refs['img'].style.transform = 'scale(' + this.scaleNum + ') rotate(' + this.rotateNum + 'deg)';
    },
    /**
     * @name: 旋转图片
     */    
    rotatePic() {
      this.rotateNum += 90;
      if (this.rotateNum > 360) this.rotateNum = 90; // 最大角度不能大于 360
      this.$refs['img'].style.transform = 'scale(' + this.scaleNum + ') rotate(' + this.rotateNum + 'deg)';
    },
    /**
     * @name: 计算偏移量
     * @param {*} curEle
     * @return {object}
     */    
    offset(curEle) {
      let totalLeft = null, totalTop = null, par = curEle.offsetParent;
      // 首先加自己本身的左偏移和上偏移
      totalLeft += curEle.offsetLeft;
      totalTop += curEle.offsetTop;
      //只要没有找到 body，我们就把父级参照物的边框和偏移也进行累加
      while (par) {
        if (navigator.userAgent.indexOf('MSIE 8.0') === -1) {
          //累加父级参照物的边框
          totalLeft += par.clientLeft;
          totalTop += par.clientTop;
        }
        //累加父级参照物本身的偏移
        totalLeft += par.offsetLeft;
        totalTop += par.offsetTop;
        par = par.offsetParent;
      }
      return {
        left: totalLeft,
        top: totalTop
      }
    }
  }
}
</script>

 <style lang="less" scoped>
.pic_main {
  position: fixed;
  width: 500px;
  border: 1px;
  top: 20%;
  right: 20%;
  border-radius: 2px;
  z-index: 999;
  .img_box {
    width: 100%;
    img { width: 100%; cursor: move; }
  }
  .dialog_footer {
    position: absolute;
    bottom: 0;
    width: 100%;
    text-align: center;
    line-height: 60px;
    .btn_pic {
      display: inline-block;
      color: #fff;
      background-color: #409eff;
      border-color: #409eff;
      line-height: 1;
      white-space: nowrap;
      cursor: pointer;
      -webkit-appearance: none;
      text-align: center;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      outline: 0;
      margin: 0 5px;
      -webkit-transition: 0.1s;
      transition: 0.1s;
      font-weight: 500;
      padding: 8px 16px;
      font-size: 12px;
      border-radius: 3px;
    }
    .close_btn {
      background: #FFF;
      border: 1px solid #DCDFE6;
      color: #606266;
    }
  }
}
</style>