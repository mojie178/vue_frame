<!--
 * @Title: 业务模块主体视图
 * @Descripttion: 
 * @Author: shaojihao
-->

<template>
  <el-container class="index_container">
    <!-- 模态遮罩层（只在移动端显示） -->
    <div
      class="index_modal"
      v-if="showModal"
      @click.self="handleClickModal" />
    <el-aside
      class="index_aside"
      :style="{
        width: isCollapse ? '64px' : '200px',
        flex: `0 0 ${isCollapse ? '64px' : '200px'}`,
      }">
      <div class="index_logo" style="background: rgba(64, 158, 255, 0.1)">
        <img
          v-if="isCollapse"
          src="@/images/base/logo.png"
          width="32"
          height="32"
          alt />
        <span v-else>慧联运管理系统</span>
      </div>
      <el-menu
        router
        unique-opened
        :collapse="isCollapse"
        text-color="rgba(255, 255, 255, 0.65)"
        active-text-color="#409EFF"
        background-color="#001529"
        class="index_menu"
        :default-active="$route.path">
        <template v-for="item in asideMenu">
          <el-submenu
            v-if="item.children && !item.meta.hidden"
            :key="item.meta.id"
            :index="item.meta.id + ''">
            <template slot="title">
              <img :src="require(`../../images/menu/${item.icon}.png`)" class="icon_box_show" />
              <span style="margin-left: 15px">{{ item.meta.menuName }}</span>
            </template>
            <el-menu-item-group>
              <div v-for="child in item.children" :key="child.meta.id">
                <el-menu-item
                  v-if="!child.meta.hidden && isSystem(child.meta.modelUrl)"
                  :index="`/admin/${item.path}/${child.path}`"
                  :route="`/admin/${item.path}/${child.path}`">
                  <span style="margin-left: 18px;">
                    {{child.meta.menuName}}
                  </span>
                </el-menu-item>
                <el-menu-item
                  v-if="!child.meta.hidden && !isSystem(child.meta.modelUrl)"
                  :index="`/admin/${item.path}/${child.path}`">
                  <a
                    class="route_to"
                    :href="`${child.meta.modelUrl}#/admin/${item.path}/${child.path}`">
                    <span style="margin-left: 18px;">
                      {{child.meta.menuName}}
                    </span>
                  </a>
                </el-menu-item>
              </div>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item
            v-if="!item.children && !item.meta.hidden"
            :index="`/admin/${item.path}`"
            :key="item.meta.id"
            :route="{ path: `/admin/${item.path}` }">
            <img :src="require(`../../images/menu/${item.icon}.png`)" class="icon_box_show" />
            <span slot="title" style="margin-left: 15px;">
              {{item.meta.menuName}}
            </span>
          </el-menu-item>
        </template>
      </el-menu>
    </el-aside>
    <el-container style="overflow: hidden; min-height: 100vh">
      <el-header
        :height="tabNav.length > 0 ? '112px' : '104px'"
        class="index_header">
        <div class="header_top">
          <div class="header_left">
            <i
              class="icon"
              :class="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"
              @click="handleToggleAside"
              :title="isCollapse ? '展开菜单' : '收起菜单'"
              :style="{transform: isCollapse ? 'rotate(360deg)' : 'rotate(0deg)'}" />
            <h1 class="index_title ellipsis" title="管理系统">管理系统</h1>
          </div>
          <div class="header_right">
            <span>
              {{ greetingTxt() }}，
              {{userInfo && userInfo.userInfo.realName || "管理员"}}
            </span>
            <span @click="handleLogout" class="logo_out">
              <span class="el-icon-switch-button" />
              退出
            </span>
          </div>
        </div>
        <div class="router_nav" v-if="tabNav.length > 0">
          <span
            v-for="item in tabNav"
            :key="item.meta.id"
            class="tab_nav_style"
            @click="goRoute(item)">
            <el-tag
              v-if="item.meta.id"
              effect="dark"
              :type="$route.meta.id == item.meta.id ? '' : 'info'"
              size="medium"
              closable
              @close="handleClose(item.meta.id)">
              {{ item.meta.menuName }}
            </el-tag>
          </span>
        </div>
      </el-header>
      <el-main class="index_main" style="padding: 10px 15px">
        <transition name="animate">
          <router-view v-if="asideMenu.length" />
          <div v-else>
            <span class="el-icon-loading" style="margin-right: 5px;" />
            <span style="color: #999">正在加载。。。</span>
          </div>
        </transition>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import qs from 'qs';
import Cookies from 'js-cookie';
import * as types from '@/store/mutation-types';
import { mapState } from 'vuex';
import { PROCESS_ENV_NODE_ENV } from '@/util/const';
import { spLogOut, spLogin, spLogOutSys } from '@/api';

export default {
  name: 'index',
  data() {
    return {
      isCollapse: false, // 展开收起菜单
      showModal: false, // 移动端左侧导航展开时的背景层
      isMobile: false, // 是否为手机
      asideMenu: [] // 导航栏列表
    };
  },
  computed: {
    ...mapState({
      userInfo: state => state.userInfo,
      tabNav: state => state.tabNav
    }),
  },
  watch: {
    $route: {
      immediate: true,
      handler(val) {
        this.$store.commit(types.ADD_NVA, val); // 添加面包屑
        // 添加路径已判断按钮权限
        const uri = val.path.substr(val.path.indexOf('/admin/') + 6, val.path.length);
        this.$store.dispatch('getNode', uri);
      }
    },
    '$store.state.tabNav': {
      handler(val) {
        let nav = val.map(item => {
          return {
            fullPath: item.fullPath,
            hash: item.hash,
            path: item.path,
            name: item.name,
            params: item.params,
            query: item.query,
            meta: item.meta
          };
        });
        let navs = JSON.stringify(nav);
        Cookies.set('tabNav', navs, { expires: '', path: '', domain: '.ahggwl.com', secure: false });
      },
    }
  },
  created() {
    let navs = Cookies.getJSON('tabNav') ? Cookies.getJSON('tabNav') : [];
    navs.forEach(item => this.$store.commit(types.ADD_NVA, item));
  },
  mounted() {
    // 控制台输出logo
    this.isMobile = (document.documentElement.clientWidth || document.body.clientWidth) <= 512;
    this.asideMenu = this.$store.getters.asideMenu;
    window.addEventListener('resize', () => {
      const wid = document.documentElement.clientWidth || document.body.clientWidth;
      this.isMobile = (document.documentElement.clientWidth || document.body.clientWidth) <= 512;
      this.isCollapse = false;
      this.showModal = false;
      this.isCollapse = wid < 1000;
      // 更新页面宽度到vuex
      this.$store.commit(types.PAGE_WIDTH, wid);
    });
    const wid = document.documentElement.clientWidth || document.body.clientWidth;
    // 更新页面宽度到vuex
    this.$store.commit(types.PAGE_WIDTH, wid);
  },
  methods: {
    /**
     * @name: 判断路由是否输入本系统
     * @param {string} url
     * @return {boolean}
     */    
    isSystem(url) {
      return url == window.location.origin;
    },
    /**
     * @name: 标签导航跳转
     * @param {*} item
     */    
    goRoute(item) {
      if (this.$route.meta.id != item.meta.id && item.meta.modelUrl) {
        if (this.isSystem(item.meta.modelUrl))
          this.$router.push({ path: item.path, query: item.query });
        else {
          let query = qs.stringify(item.query, { allowDots: true });
          window.location.href = `${item.meta.modelUrl}#${item.path}?${query}`;
        }
      }
    },
    /**
     * @name: 标签导航删除
     * @param {number} id
     * @return {*}
     */    
    handleClose(id) {
      this.$store.commit(types.DEL_NVA, id);
      if (this.tabNav.length > 0) this.goRoute(this.tabNav[this.tabNav.length - 1]);
      else window.location.href = `${window.location.origin}/#/admin`;
    },
    /**
     * @name: 手机端遮罩层隐藏
     */    
    handleClickModal() {
      this.showModal = false;
      this.isCollapse = false;
    },
    /**
     * @name: 展开收起菜单
     */    
    handleToggleAside() {
      if (this.isMobile) {
        this.showModal = true;
        this.isCollapse = false;
      } else this.isCollapse = !this.isCollapse;
    },
    /**
     * @name: 退出登录
     */    
    async handleLogout() {
      if (PROCESS_ENV_NODE_ENV) {
        spLogOut().then(() => {
          spLogOutSys().then(() => {
            this.$store.commit(types.LOGOUT);
            Cookies.set('tabNav', '', { expires: '', path: '', domain: '.ahggwl.com', secure: false });
            spLogin();
          })
        });
      } else this.$router.push('/');
    },
    /**
     * @name: 问候文案
     * @return {string}
     */    
    greetingTxt() {
      const hour = new Date().getHours();
      if (hour < 6) return '凌晨好';
      else if (hour < 9) return '早上好';
      else if (hour < 12) return '上午好';
      else if (hour < 14) return '中午好';
      else if (hour < 17) return '下午好';
      else if (hour < 19) return '傍晚好';
      else if (hour < 22) return '晚上好';
      else return '夜里好';
    }
  }
};
</script>

<style lang="less" scoped>
.index_container {
  min-height: 100%;
  min-width: 1000px;
  position: relative;
  .index_modal {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 800;
    overflow: auto;
    margin: 0;
    background-color: rgba(0, 0, 0, 0.3);
    @media screen and (min-width: 513px) {
      display: none;
    }
  }
  .index_aside {
    position: relative;
    z-index: 900;
    height: 100vh;
    box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);
    background: #001529;
    transition: all 0.3s;
    overflow-y: auto;
    overflow-x: hidden;
    @media screen and (max-width: 512px) {
      position: absolute;
      top: 0;
      left: 0;
    }
    .index_logo {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 64px;
      color: white;
      font-size: 16px;
    }
    .index_menu {
      box-sizing: border-box;
      border-right: 0;
      height: calc(100vh - 64px);
      overflow-y: auto;
      overflow-x: hidden;
      padding-bottom: 40px;
      .icon_box_show { width: 18px; height: 18px; margin-right: 6px; }
      .route_to { color: rgba(255, 255, 255, 0.65); }
      /deep/ .el-submenu__title { height: 46px; line-height: 46px; position: relative; }
      /deep/ .el-submenu .el-menu-item {
        height: 40px;
        line-height: 40px;
        padding: 0 45px;
        min-width: 200px;
      }
      &::-webkit-scrollbar { width: 5px; height: 5px; }
      &::-webkit-scrollbar-track { background-color: rgba(255,255,255,0.5); border-radius: 3px; }
      &::-webkit-scrollbar-thumb { border-radius: 3px; height: 100px; background-color: #ccc; }
    }
  }
  .index_header {
    position: relative;
    height: 104px;
    padding: 0;
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
    .header_top {
      display: flex;
      flex: 0 0 104px;
      flex-wrap: wrap;
      justify-content: space-between;
      background: #fff;
      box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
      height: 64px;
      .header_left {
        max-width: 60%;
        display: flex;
        justify-content: center;
        align-items: center;
        line-height: 64px;
        padding-left: 20px;
        .icon {
          display: inline-block;
          font-size: 24px;
          color: #444;
          transition: all 0.4s;
          cursor: pointer;
        }
        .index_title {
          min-width: 0;
          margin-left: 20px;
          font-size: 20px;
          color: #444;
          letter-spacing: 1px;
          @media screen and (max-width: 1150px) {
            font-size: 16px;
          }
          @media screen and (max-width: 512px) {
            display: none;
          }
        }
      }
      .header_right {
        position: absolute;
        right: 0;
        padding-right: 20px;
        line-height: 64px;
        .message {
          position: relative;
          margin-right: 20px;
          color: #444;
          cursor: pointer;
          &.has:before {
            position: absolute;
            top: -3px;
            left: 11px;
            content: "";
            display: inline-block;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background-color: #f00;
          }
          i {
            position: relative;
            top: 2px;
            right: 4px;
            font-size: 18px;
          }
        }
        .logo_out {
          margin-left: 30px;
          cursor: pointer;
          span { font-size: 16px; color: #000; }
        }
        .user { cursor: pointer; user-select: none; }
      }
    }
    .router_nav {
      padding: 6px 10px;
      box-sizing: border-box;
      background: #f0f2f5;
      .tab_nav_style { margin-right: 10px; cursor: pointer; }
    }
    .breadcrumb {
      display: flex;
      align-items: center;
      width: 100%;
      height: 40px;
      padding-left: 20px;
      i { display: inline-block; margin-right: 10px; font-size: 16px; }
    }
  }
  .index_main {
    overflow: hidden;
    display: flex;
    flex-direction: column;
    background-color: #f0f2f5;
    .animate-enter-active { transition: all 0.5s; }
    .animate-leave-active { transition: all 0s; }
    .animate-enter { opacity: 0; transform: translateX(-30px); }
    .animate-leave-to { opacity: 0; transform: translateX(30px); }
  }
}
</style>