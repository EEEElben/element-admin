<template>
  <div class="container">
    <div class="top">
      <el-input v-model="inputVal" placeholder="名称" size="medium"></el-input>
      <el-button type="primary" icon="el-icon-search" size="medium">查询</el-button>
    </div>
    <div class="main"> 
      <el-button type="success" icon="el-icon-plus" size="small">添加</el-button>
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
        width="120px"
        show-overflow-tooltip>
        <template slot-scope="scope">
          <i class="el-icon-edit" @click="compile(scope.row)"></i>
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
      inputVal:'',  //名称
      tableHeader: [
        {label:"名称", prop:"title", width:"300"},
        {label:"编号", prop:"num", width:"300px"},
        {label:"值", prop:"value", width:""},
      ],
      tableList: [{
        title: '测一侧测一侧',
        num: '',
        value:'ds123',
      },
      {
        title: '测一侧测一侧',
        num: '2',
        value:'ds123',
      },
      {
        title: '测一侧测一侧',
        num: '',
        value:'ds123',
      }],
      isPagination:false,  //可以请求数据时判断，不足一页则不显示分页
      total:999,  //总数据数，用于判断一共有多少页
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
</style>