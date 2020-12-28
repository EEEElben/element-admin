<template>
  <div class="container">
    <div>通用后台管理系统</div>
    <el-dropdown size="medium">
      <div class="admin">
        <i class="el-icon-user-solid" style="padding-right:5px"></i>
          超级管理员
        <i class="el-icon-arrow-down"></i>
      </div>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item><i class="el-icon-s-tools"></i>修改密码</el-dropdown-item>
        <el-dropdown-item><i class="el-icon-grape"></i>退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
  export default {
    name: "headerNav",
    data() {
      return {}
    }
  }
</script>

<style scoped lang="scss">
  .container {
    display: flex;
    justify-content: space-between;
    line-height: 60px;
    color: #fff;

    font: {
      size: 22px;
      weight: 500;
    }
  }

  .admin {
    color: #cbced4;
    font-size: 14px;
    padding-right: 40px;
    cursor: pointer;

    &:hover {
      color: #fff;
    }
  }
</style>