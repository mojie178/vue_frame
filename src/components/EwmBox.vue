<template>
    <div class="ewmBox">
        <div class="imgBox">
            <img src="@/assets/img/ewmDown.png" />
        </div>
        <ul>
            <li>
                <img :src="`${$uploadLink}${weChatPic}`" :onerror="$defaultImg" />
                <p>微信公众号</p>
            </li>
            <li>
                <img :src="`${$uploadLink}${appPic}`" :onerror="$defaultImg" />
                <p>APP下载</p>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'ewmBox',
    props: {
        weChatPic: String,
        appPic: String
    },
    data() {
        return {}
    }
}
</script>

<style lang="less" scoped>
.ewmBox {
    position: fixed;
    bottom: 20px;
    right: 25px;
    z-index: 999;
    .imgBox {
        display: block;
        padding: 5px;
        border: 1px solid #53bf8a;
        border-radius: 50%;
        cursor: pointer;
        background: rgba(255,255,255,.9);
        img {width: 40px; height: 40px; vertical-align: middle;}
    }
    ul {
        position: absolute;
        bottom: 65px;
        right: 0;
        background: #e9ecf3;
        box-shadow: 0 0 3px #e0e0e0;
        display: none;
        li {
            text-align: center;
            padding: 5px;
            img {width: 90px; height: 90px;}
            p {color: #666; font-size: 12px;}
        }
        &:before {
            display: block;
            position: absolute;
            right: 21px;
            bottom: -5px;
            content: '';
            border-top: 5px solid #e9ecf3;
            border-left: 5px solid transparent;
            border-right: 5px solid transparent;
            border-bottom: 0;
        }
    }
    &:hover > i {transform: rotate(90deg);}
    &:hover > ul {display: block;}
}
</style>
