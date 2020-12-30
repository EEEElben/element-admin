<template>
  <div class="container">
    <div class="top">
      <el-select v-model="value" placeholder="全部类型" class="firstSelect" size="medium">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <el-select v-model="value1" placeholder="全部状态" class="secondSelect" size="medium">
        <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <el-date-picker size="medium" v-model="startData" type="date" placeholder="选择开始日期">
      </el-date-picker>
      <el-date-picker size="medium" v-model="endData" type="date" placeholder="选择结束日期">
      </el-date-picker>
      <el-input v-model="inputVal" placeholder="标题" size="medium"></el-input>
      <el-button type="primary" icon="el-icon-search" size="medium">查询</el-button>
    </div>
    <div class="main">
      <el-button type="primary" icon="el-icon-check" size="small" @click="dispose">批量处理</el-button>
      <el-button type="danger" icon="el-icon-delete" size="small" @click="deleteItems">批量删除</el-button>
    </div>
    <el-table @select="chooseItem" @select-all="chooseAll" highlight-current-row ref="multipleTable" :data="tableList"
      tooltip-effect="dark" style="width: 100%"
      :header-cell-style="{'text-align':'center',background:'#eef1f6',color:'#606266'}" border>>
      <el-table-column align="center" type="selection" width="40">
      </el-table-column>
      <el-table-column label="序号" align="center" type="index" width="50">
      </el-table-column>
      <el-table-column v-for="(item,index) in tableHeader" :key="index" :label="item.label" :width="item.width"
        align="center">
        <template slot-scope="scope">
          <span v-if="scope.row[item.prop]==='未处理'" style="color:red">{{scope.row[item.prop]}}</span>
          <span v-else-if="scope.row[item.prop]==='已处理'" style="color:green">{{scope.row[item.prop]}}</span>
          <span v-else>{{scope.row[item.prop]}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="80px" show-overflow-tooltip>
        <i class="el-icon-search"></i>
      </el-table-column>
    </el-table>
    <div class="footer">
      <el-pagination background hide-on-single-page :page-size="10" layout="prev, pager, next, jumper"
        @current-change="curClick" v-if="isPagination" :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  export default {
    name: "advertList",
    data() {
      return {
        //全部分类
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }],
        value: '', //分类
        //全部状态
        options1: [{
          value: '选项1',
          label: '状态'
        }, {
          value: '选项2',
          label: '未审核'
        }, {
          value: '选项3',
          label: '已审核'
        }, {
          value: '选项4',
          label: '删除'
        }],
        value1: '', //状态
        startData: '', //开始日期
        endData: '', //结束日期
        inputVal: '', //名称
        isPagination: false, //可以请求数据时判断，不足一页则不显示分页
        total: 999, //总数据数，用于判断一共有多少页
        checkedList: [], //选中要操作的内容
        tableHeader: [{
            label: "分类",
            prop: "order",
            width: "100"
          },
          {
            label: "标题",
            prop: "title",
            width: ""
          },
          {
            label: "状态",
            prop: "state",
            width: "100px"
          },
          {
            label: "日期",
            prop: "data",
            width: "140px"
          },
        ],
        tableList: [{
            id: '1',
            title: '测一侧测一侧',
            data: '2020-12-24 06:06',
            order: '异常日志',
            state: '未处理'
          },
          {
            id: '2',
            title: '测一侧测一侧2sdadas',
            data: '2020-12-24 06:06',
            order: '异常日志',
            state: '已处理'
          },
          {
            id: '3',
            title: '测一侧测一侧3',
            data: '2020-12-24 06:06',
            order: '异常日志',
            state: '启用'
          }
        ],
      }
    },
    methods: {
      //页码发生改变触发
      curClick(e) {
        console.log(e);
      },
      //选择某一项
      chooseItem(selection) {
        this.checkedList = [];
        for (let i of selection) {
          this.checkedList.push(i.id);
        }
        console.log(this.checkedList)
      },
      //全选
      chooseAll(e) {
        this.checkedList = []
        for (let i of e) {
          this.checkedList.push(i.id);
        }
        console.log(this.checkedList)
      },
      //批量处理
      dispose() {
        if (this.checkedList.length === 0) {
          this.$message({
            message: '请先选择数据！',
            type: 'warning',
            showClose: true,
            offset: 50
          })
        } else {
          this.$confirm('是否把选中数据设为已处理？', '提示', {
            cancelButtonText: '取消',
            confirmButtonText: '确定',
            type: 'warning'
          }).then(() => {
            //调动删除接口
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.$refs.multipleTable.clearSelection();
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        }
      },
      //批量删除
      deleteItems() {
        if (this.checkedList.length === 0) {
          this.$message({
            message: '请先选择数据！',
            type: 'warning',
            showClose: true,
            offset: 50
          })
        } else {
          this.$confirm('是否删除选中数据？', '提示', {
            cancelButtonText: '取消',
            confirmButtonText: '确定',
            type: 'warning'
          }).then(() => {
            //调动删除接口
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.$refs.multipleTable.clearSelection();
            this.checkedList = []
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .container {
    margin: 0 15px;
  }

  .el-input {
    width: 200px;
    height: 30px;
    margin-right: 10px;
  }

  .firstSelect,
  .secondSelect {
    width: 120px;
    margin-right: 10px;
  }

  .main {
    background-color: #f5fafe;
    display: flex;
    Justify-content: flex-end;

    .el-button {
      margin: 10px 10px 10px 0;
    }
  }

  .footer {
    margin: 20px 0;
  }

  .el-pagination {
    text-align: center;
  }
</style>