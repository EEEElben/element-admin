<template>
  <div class="container">
    <div v-show="isShow" class=""></div>
    <div class="top">
      <el-select v-model="value" placeholder="栏目" class="firstSelect" size="medium">
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
      <el-input v-model="inputVal" placeholder="名称" size="medium"></el-input>
      <el-button type="primary" icon="el-icon-search" size="medium" @click="search">查询</el-button>
    </div>
    <div class="main"> 
      <el-button type="danger" icon="el-icon-delete" size="small" @click="deleteItem">删除</el-button>
      <el-button type="success" icon="el-icon-plus" size="small">添加</el-button>
    </div>
    <el-table 
      highlight-current-row
      ref="multipleTable"
      :data="tableList"
      tooltip-effect="dark"
      style="width: 100%"
      :header-cell-style="{'text-align':'center',background:'#eef1f6',color:'#606266'}"
      @selection-change="handleSelectionChange"
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
        width="50px"
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
 name:  "management",
 data () {
   return {
     isShow:false,  // 添加内容区域
     inputVal: '',  //输入框内容
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
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
     value: '',  //第一个下拉栏选中的数据
     isPagination:false, //可以请求数据时判断，不足一页则不显示分页
     total:999,  //总数据数，用于判断一共有多少页
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
      value1: '',  //第二个下拉栏选中的数据
      tableHeader: [
        {label:"标题", prop:"title", width:""},
        {label:"栏目", prop:"column", width:"80px"},
        {label:"图片", prop:"pic", width:"80px"},
        {label:"文件", prop:"file", width:"80px"},
        {label:"访问量", prop:"pv", width:"70px"},
        {label:"状态", prop:"state", width:"70px"},
        {label:"时间", prop:"data", width:"150px"},
      ],
      tableList: [{
          id:1,
          title: '测一侧测一侧',
          column: '栏目哦',
          pic:'',
          file:'文件',
          pv:15,
          state:'已删除',
          data: '2020-12-24 06:06'
        },
        {
          id:2,
          title: '测一侧',
          column: '栏目哦',
          pic:'',
          file:'文件',
          pv:15,
          state:'已删除',
          data: '2020-12-24 06:06'
        },
        {
          id:3,
          title: '测一侧',
          column: '栏目哦',
          pic:'',
          file:'文件',
          pv:15,
          state:'已删除',
          data: '2020-12-24 06:06'
        },
        {
          id:4,
          title: '测一侧',
          column: '栏目哦',
          pic:'',
          file:'文件',
          pv:15,
          state:'已删除',
          data: '2020-12-24 06:06'
        },
        {
          id:5,
          title: '测一侧',
          column: '栏目哦',
          pic:'',
          file:'文件',
          pv:15,
          state:'已删除',
          data: '2020-12-24 06:06'
        },
        {
          id:6,
          title: '测一侧',
          column: '栏目哦',
          pic:'',
          file:'文件',
          pv:15,
          state:'已删除',
          data: '2020-12-24 06:06'
        },
        {
          id:7,
          title: '测一侧',
          column: '栏目哦',
          pic:'',
          file:'文件',
          pv:15,
          state:'已删除',
          data: '2020-12-24 06:06'
        }],
      multipleSelection:'', //选中的数据
      batchPassArr:[]  //选中的数据保存
      
   }
 },
 methods: {
    //页码发生改变触发
    curClick(e) {
      console.log(e);
    },
    //调用查询接口
    search() {},
    //选中改变
    handleSelectionChange(val) { 

      this.multipleSelection = val;
      this.batchPassArr = [] //每次点击需清空原本数组的内容
      this.multipleSelection.map(item => { //遍历数组，把id存进自定义的数组里
        this.batchPassArr.push(item.id)
      })
      this.batchPassArr = this.batchPassArr.join(',') 
      console.log(this.batchPassArr);
    },
    //删除
    deleteItem() {
      if(this.batchPassArr.length===0) {
        this.$message({
          message: '请先选择数据！',
          type: 'warning',
          showClose:true,
          offset:50
        })
      } else {
        
        this.$confirm('是否删除选中数据？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          //调动删除接口
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
        this.$refs.multipleTable.clearSelection();
      }
      

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
    margin-right: 20px;
  }
  .firstSelect{
    width: 200px;
    margin-right: 20px;
    color: #000;
  }
  .secondSelect{
    width: 100px;
    margin-right: 20px;
  }
  .main{
    display: flex;
    flex-direction:row-reverse;
    background-color: #f5fafe;
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