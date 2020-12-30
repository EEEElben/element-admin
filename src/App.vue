<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style>
  @import "./assets/css/base.css";

  .el-table,.el-form-item__label {
      font-size: 13px !important;
  }

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
  
  .el-scrollbar__wrap {
    height: 120% !important;
  }
</style>