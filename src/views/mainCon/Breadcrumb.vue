<template>
  <div class="container">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>{{currentPart}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
  export default {
    name: "Breadcrumb",
    data() {
      return {
        currentPart: '文章管理'
      }
    },
    mounted() {
      this.$bus.$on("changeActive", (e) => {
        this.currentPart = e
      })
    }
  }
</script>