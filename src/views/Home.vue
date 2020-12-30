<template>
  <el-container>
    <el-header>
      <header-nav></header-nav>
    </el-header>
    <el-container>
      <el-aside :width="width">
        <left-menu @isCollapse="isCollapse"></left-menu>
      </el-aside>
      <el-main>
        <Breadcrumb></Breadcrumb>
        <div class="main">
          <router-view />
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  import leftMenu from '@/views/aside/leftMenu.vue'
  import headerNav from '@/views/header/headerNav.vue'
  import Breadcrumb from '@/views/mainCon/Breadcrumb.vue'
  export default {
    name: 'Home',
    components: {
      leftMenu,
      headerNav,
      Breadcrumb
    },
    data() {
      return {
        collapse: false,
      }
    },
    methods: {
      isCollapse(val) {
        this.collapse = val;
      }
    },
    computed: {
      width() {
        return this.collapse ? '64px' : '200px'
      }
    }
  }
</script>

<style lang="scss" scoped>
  $bgcolor: #515a6e;

  .el-header {
    background-color: $bgcolor;
  }

  .el-aside {
    background-color: $bgcolor;
     height: calc(100vh - 60px - 48px);
  }

  .el-main {
    background-color: #f5f7f9;
  }

  .main {
    width: 100%;
    height: calc(100vh - 60px - 75px);
    background-color: #fff;
    margin-top: 20px;
    overflow-y: auto;

    &:hover {
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    }
  }
</style>