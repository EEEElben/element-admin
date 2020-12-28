<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style>
  @import "./assets/css/base.css";

  .el-table th.gutter {
    display: table-cell !important;
  }

  .el-table colgroup.gutter {
    display: table-cell !important;
  }

  .el-checkbox__inner {
    margin-left: 5px !important;
  }

  .el-table .cell {
    overflow: visible !important;
  }

  i:hover {
    cursor: pointer;
  }
</style>