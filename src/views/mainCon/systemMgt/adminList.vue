<template>
  <div class="container">
    <div class="top">
      <el-select v-model="value" placeholder="全部角色" class="firstSelect" size="medium">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
      </el-select>
      <el-select v-model="value1" placeholder="状态" class="secondSelect" size="medium">
        <el-option
          v-for="item in options1"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-input v-model="inputVal" placeholder="用户名、姓名" size="medium"></el-input>
      <el-input v-model="phoneNum" placeholder="手机号" size="medium" class="phoneNum"></el-input>
      <el-button type="primary" icon="el-icon-search" size="medium">查询</el-button>
    </div>
    <div class="main"> 
      <el-button type="success" icon="el-icon-plus" size="small">添加</el-button>
      <el-button type="danger" icon="el-icon-delete" size="small">删除</el-button>
    </div>
    <el-table 
      highlight-current-row
      ref="multipleTable"
      :data="tableList"
      tooltip-effect="dark"
      style="width: 100%"
      :header-cell-style="{'text-align':'center',background:'#eef1f6',color:'#606266'}"
      border>>
      <el-table-column
        align="center"
        type="selection"
        width="40">
      </el-table-column>
      <el-table-column
        label="序号"
        align="center"
        type="index"
        width="50">
      </el-table-column>
      <el-table-column v-for="(item,index) in tableHeader"
                   :key="index"
                   :label="item.label"
                   :width="item.width"  
                   align="center">
        <template slot-scope="scope">
           <span>{{scope.row[item.prop]}}</span>
          </template>        
      </el-table-column>
      <el-table-column
        align="center"
        label="操作"
        width="80px"
        show-overflow-tooltip>
        <template slot-scope="scope">
          <div class="operate">
            <i class="el-icon-edit" @click="compile(scope.row)"></i>
            <i class="el-icon-delete" @click="delete(scope.row)"></i>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="footer">
       <el-pagination
          background
          hide-on-single-page
          :page-size="10"
          layout="prev, pager, next, jumper"
          @current-change="curClick"
          v-if="isPagination"
          :total="total">
        </el-pagination>
    </div>
  </div>
</template>
 
<script>
export default {
 name:  "advertList",
 data () {
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
      value1: '',  //状态
      inputVal:'',  //名称
      isPagination:true,  //可以请求数据时判断，不足一页则不显示分页
      total:999,  //总数据数，用于判断一共有多少页
      phoneNum:'',  //手机号
      tableHeader: [
        {label:"用户名", prop:"user", width:""},
        {label:"昵称", prop:"nick", width:"80px"},
        {label:"姓名", prop:"name", width:"80px"},
        {label:"手机", prop:"phone", width:"120px"},
        {label:"角色", prop:"role", width:"100px"},
        {label:"状态", prop:"state", width:"90px"},
        {label:"日期", prop:"data", width:"140px"},
      ],
       tableList: [{
          user: 'dsjakld',
          nick: '芜湖',
          name:'用户一号',
          phone: '18888777788',
          role:'超级管理员',
          state:'已审核',
          data:'2020-12-24 06:06',
        }],
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
 
<style scoped lang = "scss">
  .container{
    margin:0 15px;
  }
  .el-input{
    width: 200px;
    height: 30px;
    margin-right: 10px;
  }
  .main{
    background-color: #f5fafe;
    display: flex;
    Justify-content:flex-end;
    .el-button{
      margin: 10px 10px 10px 0;
    }
  }
  .footer {
    margin: 20px 0;
  }
  .el-pagination {
    text-align: center; 
  }
  .phoneNum{
    width: 140px;
  }
  .operate {
    display: flex;
    justify-content: space-around;
  }
</style>