<template>
  <div class="container">
    <div class="top">
      <el-date-picker
        size="medium"
        v-model="startData"
        type="date"
        placeholder="选择开始日期">
      </el-date-picker>
      <el-date-picker
        size="medium"
        v-model="endData"
        type="date"
        placeholder="选择结束日期">
      </el-date-picker>
      <el-input v-model="inputVal" placeholder="标题" size="medium"></el-input>
      <el-button type="primary" icon="el-icon-search" size="medium">查询</el-button>
    </div>
    <div class="main"> 
      <el-button type="danger" icon="el-icon-delete" size="small">批量删除</el-button>
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
      startData:'', //开始日期
      endData:'',  //结束日期
      inputVal:'',  //名称
      isPagination:true,  //可以请求数据时判断，不足一页则不显示分页
      total:999,  //总数据数，用于判断一共有多少页
      tableHeader: [
        {label:"标题", prop:"title", width:""},
        {label:"系统", prop:"system", width:"120px"},
        {label:"浏览器", prop:"browser", width:"220px"},
        {label:"宽度", prop:"width", width:"70px"},
        {label:"高度", prop:"height", width:"70px"},
        {label:"日期", prop:"data", width:"140px"},
      ],
       tableList: [{
          title: '测一侧测一侧',
          system: 'Windows',
          browser:'Chrome 87.0.4280.88',
          width:'150',
          height:'140',
          data:'2020-12-24 06:06',
        },
        {
          title: '测一侧测一侧',
          system: 'Windows',
          browser:'Chrome 87.0.4280.88',
          width:'150',
          height:'140',
          data:'2020-12-24 06:06',
        },
        {
          title: '测一侧测一侧',
          system: 'Windows',
          browser:'Chrome 87.0.4280.88',
          width:'150',
          height:'140',
          data:'2020-12-24 06:06',
        },
        {
          title: '测一侧测一侧',
          system: 'Windows',
          browser:'Chrome 87.0.4280.88',
          width:'150',
          height:'140',
          data:'2020-12-24 06:06',
        },
        {
          title: '测一侧测一侧',
          system: 'Windows',
          browser:'Chrome 87.0.4280.88',
          width:'150',
          height:'140',
          data:'2020-12-24 06:06',
        },
        {
          title: '测一侧测一侧',
          system: 'Windows',
          browser:'Chrome 87.0.4280.88',
          width:'150',
          height:'140',
          data:'2020-12-24 06:06',
        },
        {
          title: '测一侧测一侧',
          system: 'Windows',
          browser:'Chrome 87.0.4280.88',
          width:'150',
          height:'140',
          data:'2020-12-24 06:06',
        },
        {
          title: '测一侧测一侧',
          system: 'Windows',
          browser:'Chrome 87.0.4280.88',
          width:'150',
          height:'140',
          data:'2020-12-24 06:06',
        },
        {
          title: '测一侧测一侧',
          system: 'Windows',
          browser:'Chrome 87.0.4280.88',
          width:'150',
          height:'140',
          data:'2020-12-24 06:06',
        },
        {
          title: '测一侧测一侧',
          system: 'Windows',
          browser:'Chrome 87.0.4280.88',
          width:'150',
          height:'140',
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
  .firstSelect, .secondSelect{
    width: 100px;
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