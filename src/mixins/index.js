/*
 * @Title: 公共 mixins
 * @Descripttion: 
 * @Author: shaojihao
 * @Date: 2021-01-19 11:02:47
 * @LastEditTime: 2021-01-21 17:27:41
 */

import { DEFAULT_PAGE_SIZE, LOADING_TEXT } from '@/util/const';
import Layout from '@/components/Layout/index';

// 列表搜索表头
export const baseMixin = {
  components: {
    Layout: Layout
  },
  data() {
    return {
      searchTitle: '收起搜索区',
      isSearchUp: true
    }
  },
  mounted() {
    if (this.$refs.searchBox) {
      this.$refs.searchBox.style.height = '51px';
      this.$refs.searchBox.style.overflow = 'hidden';
    }
  },
  methods: {
    /**
     * @name: 搜索区域展示隐藏
     */    
    takeOut() {
      this.$refs.searchBox.style.height = this.isSearchUp ? '51px' : 'auto';
      this.searchTitle = this.isSearchUp ? '打开搜索区' : '收起搜索区';
      this.isSearchUp = !this.isSearchUp;
    }
  }
};

// 日期选择默认当前月在右侧
export const timeDefaultShowMixin = {
  data() {
    return {
      timeDefaultShow: '' // 在 el-date-picker 中加 :default-value="timeDefaultShow" 即可
    }
  },
  created() {
    // 设置当前月份显示在日期选择器右侧
    this.timeDefaultShow = new Date();
    this.timeDefaultShow.setMonth(new Date().getMonth() - 1);
  }
}

// 表格
export const tableMixin = {
  data() {
    return {
      LOADING_TEXT,
      loading: false,
      tableData: [],
      total: 0,
      pageNum: 1,
      pageSize: DEFAULT_PAGE_SIZE,
      pageSizes: [5, 10, 15, 20, 30, 40, 50, 100, 300, 500],
      tabKey: new Date().getTime()
    }
  },
  beforeRouteEnter(to, from, next) { // 从详情页返回，读取存储
    next(vm => {
      if (from.query.id) vm.handleShowFormInline();
      else {
        const sessionName = vm.$route.path;
        sessionStorage.removeItem(sessionName);
      }
    });
  },
  beforeRouteLeave(to, from, next) { // 离开列表页，存数据
    if (to.query.id) this.handleSaveFormInline();
    else {
      const sessionName = this.$route.path;
      sessionStorage.removeItem(sessionName);
    }
    next();
  },
  methods: {
    /**
     * @name: 存储查询条件
     * @param {*}
     * @return {*}
     */    
    handleSaveFormInline() {
      const sessionName = this.$route.path; // 以当前页面路由作为标识符
      sessionStorage.setItem(sessionName, JSON.stringify({
        formInline: this.formInline, // 筛选条件集合
        pageNum: this.pageNum, // 当前页面
        pageSize: this.pageSize // 每页数据展示个数
      }));
    },
    /**
     * @name: 回显查询条件
     * @param {*}
     * @return {*}
     */    
    handleShowFormInline() {
      const sessionName = this.$route.path; // 获取同路由标识符存储数据
      const formInlineSession = sessionStorage.getItem(sessionName);
      if (formInlineSession) {
        const sessionJosn = JSON.parse(formInlineSession);
        this.formInline = sessionJosn.formInline;
        this.pageNum = sessionJosn.pageNum;
        this.pageSize = sessionJosn.pageSize;
      }
    },
    /**
     * @name: 列表页权限回显
     * @param {*} vm
     * @param {*} callback
     */    
    handlePermission(vm, callback) {
      // 为接口写的兼容，拉接口前处理数据
      this.$nextTick(() => callback && callback());
    },
    /**
     * @name: 顶部筛选查询
     */    
    handleQuery() {
      this.pageNum = 1;
      this.pageSize = this.DEFAULT_PAGE_SIZE;
      this.fetchTableData();
    },
    /**
     * @name: 处理表格接口数据
     * @param {*} resp
     */    
    handleResponse(resp) {
      if (resp.code === 1) {
        this.tableData = resp.data.records;
        this.total = resp.data.total;
      } else this.tableData = [];
      this.$nextTick(() => this.tabKey = new Date().getTime());
    },
    /**
     * @name: 每页条数变化
     * @param {*} val
     */    
    handleSizeChange(val) {
      this.pageNum = 1;
      this.pageSize = val;
      this.fetchTableData();
    },
    /**
     * @name: 当前页码变化
     * @param {*} val
     */    
    handleCurrentChange(val) {
      this.pageNum = val;
      this.fetchTableData();
    },
    /**
     * @name: 表头排序方法
     * @param {*} val
     */    
    sortChange(val) {
      if (val.order != null && val.order !== '') {
        this.formInline.orderProp = val.prop;
        this.formInline.order = val.order === 'ascending' ? 'asc' : 'desc';
      } else {
        delete this.formInline.orderProp;
        delete this.formInline.order;
      }
      this.pageNum = 1;
      this.fetchTableData();
    }
  }
};