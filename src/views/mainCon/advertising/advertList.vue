<template>
  <div class="container">
    <div class="top">
      <el-select v-model="value" placeholder="类型" class="firstSelect" size="medium">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <el-select v-model="value1" placeholder="状态" class="secondSelect" size="medium">
        <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <el-input v-model="inputVal" placeholder="名称" size="medium"></el-input>
      <el-date-picker size="medium" v-model="startData" type="date" placeholder="选择开始日期"></el-date-picker>
      <el-date-picker size="medium" v-model="endData" type="date" placeholder="选择结束日期"></el-date-picker>
      <el-button type="primary" icon="el-icon-search" size="medium">查询</el-button>
    </div>
    <div class="main">
      <el-button type="success" icon="el-icon-plus" size="small">添加</el-button>
    </div>
    <el-table highlight-current-row ref="multipleTable" :data="tableList" tooltip-effect="dark" style="width: 100%"
      :header-cell-style="{'text-align':'center',background:'#eef1f6',color:'#606266'}" border>>
      <el-table-column align="center" type="selection" width="40"></el-table-column>
      <el-table-column label="序号" align="center" type="index" width="50"></el-table-column>
      <el-table-column v-for="(item,index) in tableHeader" :key="index" :label="item.label" :width="item.width"
        align="center">
        <template slot-scope="scope">
          <span>{{scope.row[item.prop]}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="80px" show-overflow-tooltip>
        <template slot-scope="scope">
          <div class="operate">
            <i class="el-icon-edit" @click="compile(scope.row)"></i>
            <i class="el-icon-delete" @click="delete(scope.row)"></i>
          </div>
        </template>
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
        value: '',
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
        total: 999, //总数据数，用于判断一共有多少页
        isPagination: false, //可以请求数据时判断，不足一页则不显示分页
        tableHeader: [{
            label: "标题",
            prop: "title",
            width: ""
          },
          {
            label: "类型",
            prop: "type",
            width: "80px"
          },
          {
            label: "图片",
            prop: "pic",
            width: "80px"
          },
          {
            label: "背景色",
            prop: "bg",
            width: "80px"
          },
          {
            label: "开始时间",
            prop: "startTime",
            width: "140px"
          },
          {
            label: "结束时间",
            prop: "endTime",
            width: "140px"
          },
          {
            label: "顺序",
            prop: "order",
            width: "50px"
          },
          {
            label: "状态",
            prop: "state",
            width: "70px"
          },
        ],
        tableList: [{
            id: '1',
            title: '测一侧测一侧',
            type: '栏目哦',
            pic: '',
            bg: '#abcdef',
            startTime: '2020-12-24 06:06',
            endTime: '2020-12-24 06:06',
            order: '1',
            state: '启用'
          }, {
            id: '2',
            title: '测一侧测一侧',
            type: '栏目哦',
            pic: '',
            bg: '#abcdef',
            startTime: '2020-12-24 06:06',
            endTime: '2020-12-24 06:06',
            order: '123',
            state: '启用'
          },
          {
            id: '3',
            title: '测一侧测一侧',
            type: '栏目哦',
            pic: '',
            bg: '#abcdef',
            startTime: '2020-12-24 06:06',
            endTime: '2020-12-24 06:06',
            order: '3',
            state: '启用'
          }
        ],
      }
    },
    methods: {
      //页码发生改变触发
      curClick(e) {
        console.log(e);
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
    width: 100px;
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

  .operate {
    display: flex;
    justify-content: space-around;
  }
</style>