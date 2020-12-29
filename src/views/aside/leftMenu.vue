<template>
  <div>
    <el-menu class="el-menu-vertical-demo" unique-opened router :collapse="isCollapse" background-color="#515a6e"
      text-color="#cbced4" :collapse-transition='false' active-text-color="#ffd04b" :default-active="activePath">
      <el-submenu v-for="(item,index) in list" :key="index" :index="index+1+''">
        <template slot="title">
          <i :class="item.icon"></i>
          <span>{{item.name}}</span>
        </template>
        <el-menu-item v-for="(subItem,subIndex) in item.subList" :key="subIndex" :index="subItem.path"
          @click="saveNavState(subItem)">{{subItem.name}}</el-menu-item>
      </el-submenu>
    </el-menu>
    <div class="collapse" :style="{'width':isCollapse?'64px':'200px'}" @click="changeCollapse">
      <i class="el-icon-arrow-left" style="color:#FFFFFF;" :class="rotate" ref='icon'></i>
    </div>
  </div>
</template>

<script>
  export default {
    name: "leftMenu",
    data() {
      return {
        isCollapse: false, //折叠
        activePath: '', //激活的链接地址
        list: [{
          name: '内容管理',
          icon: 'el-icon-notebook-2',
          subList: [{
            name: '文章管理',
            path: '/home/articleMgt'
          }, {
            name: '栏目管理',
            path: '/home/classifyMgt'
          }]
        }, {
          name: '广告管理',
          icon: 'el-icon-orange',
          subList: [{
            name: '广告列表',
            path: '/home/advertList'
          }, {
            name: '广告类型',
            path: '/home/advertType'
          }]
        }, {
          name: '系统管理',
          icon: 'el-icon-s-tools',
          subList: [{
            name: '登录日志',
            path: '/home/loginLog'
          }, {
            name: '异常日志',
            path: '/home/abnormal'
          }, {
            name: '管理员列表',
            path: '/home/adminList'
          }, {
            name: '权限管理',
            path: 'authorityMgt'
          }, {
            name: '角色管理',
            path: '/home/roleMgt'
          }, {
            name: '菜单管理',
            path: '/home/menuMgt'
          }, {
            name: '全局配置',
            path: '/home/globalMgt'
          }, {
            name: '网站基本配置',
            path: '/home/websiteMgt'
          }]
        }]
      }
    },
    created() {
      this.activePath = window.sessionStorage.getItem('activePath')
    },
    methods: {
      changeCollapse() {
        this.isCollapse = !this.isCollapse;
        this.$emit('isCollapse', this.isCollapse);
      },
      //保存激活状态
      saveNavState(subItem) {
        window.sessionStorage.setItem('activePath', subItem.path);
        this.$bus.$emit("changeActive", subItem.name)
      }
    },
    computed: {
      rotate() {
        return this.isCollapse ? 'isrotate' : ''
      }
    }
  }
</script>

<style>
  .el-menu-item {
    background-color: #363e4f !important;
  }

  .el-submenu__title:hover {
    color: #fff !important;
  }

  .el-menu-item:hover {
    color: #fff !important;
  }

  .collapse {
    position: fixed;
    bottom: 0;
    cursor: pointer;
    text-align: center;
    height: 48px;
    line-height: 48px;
    background-color: #515a6e;
  }

  .isrotate {
    transform: rotate(180deg);
  }

  .el-menu {
    border-right: none;
  }
</style>