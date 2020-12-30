<template>
  <div class="container">
    <div class="top">
      <el-select v-model="value" placeholder="全部状态" class="firstSelect" size="medium">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <el-input v-model="inputVal" placeholder="标题" size="medium" class="topIpt"></el-input>
      <el-button type="primary" icon="el-icon-search" size="medium">查询</el-button>
    </div>
    <div class="main">
      <el-button type="success" icon="el-icon-plus" size="small" @click="addNew">添加</el-button>
      <el-button type="primary" icon="el-icon-circle-check" size="small" @click="start">启用</el-button>
      <el-button type="warning" icon="el-icon-remove" size="small" @click="forbidden ">禁用</el-button>
    </div>
    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" width="30%" :close-on-click-modal="false" center
      top="4vh">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
        <el-form-item label="名称：" :label-width="formLabelWidth" prop="title">
          <el-input v-model="ruleForm.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="菜单：" :label-width="formLabelWidth">
          <el-select v-model="value1" style="width:100%">
            <el-option
              v-for="item in options1"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="地址：" :label-width="formLabelWidth">
          <el-input v-model="ruleForm.address" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="顺序：" :label-width="formLabelWidth">
          <el-input v-model="ruleForm.order" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图标：" :label-width="formLabelWidth">
          <el-input v-model="ruleForm.icon" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注：" :label-width="formLabelWidth">
          <el-input v-model="ruleForm.remark" autocomplete="off" type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="状态：" :label-width="formLabelWidth">
          <el-checkbox v-model="ruleForm.state">启用</el-checkbox>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm('ruleForm')">{{dialogConfirm}}</el-button>
        <el-button @click="resetForm('ruleForm')">取 消</el-button>
      </div>
    </el-dialog>
    <el-table highlight-current-row ref="multipleTable" :data="tableList" tooltip-effect="dark" style="width: 100%" @select-all="chooseAll"
      :header-cell-style="{'text-align':'center',background:'#eef1f6',color:'#606266'}" border @select="chooseItem">
      <el-table-column align="center" type="selection" width="40">
      </el-table-column>
      <el-table-column label="序号" align="center" type="index" width="50">
      </el-table-column>
      <el-table-column v-for="(item,index) in tableHeader" :key="index" :label="item.label" :width="item.width"
        align="center">
        <template slot-scope="scope">
          <span v-if="scope.row[item.prop]==='禁用'" style="color:red">{{scope.row[item.prop]}}</span>
          <span v-else-if="scope.row[item.prop]==='启用'" style="color:green">{{scope.row[item.prop]}}</span>
          <span v-else>{{scope.row[item.prop]}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="80px" show-overflow-tooltip>
        <template slot-scope="scope">
          <i class="el-icon-edit" @click="compile(scope.row)"></i>
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
        value1: '状态', //状态
        startData: '', //开始日期
        endData: '', //结束日期
        inputVal: '', //名称
        isPagination: false, //可以请求数据时判断，不足一页则不显示分页
        total: 999, //总数据数，用于判断一共有多少页
        checkedList:[],  //选中的列表
        tableHeader: [{
            label: "名称",
            prop: "title",
            width: "200"
          },
          {
            label: "图标",
            prop: "icon",
            width: "200px"
          },
          {
            label: "地址",
            prop: "address",
            width: ""
          },
          {
            label: "顺序",
            prop: "order",
            width: "80px"
          },
          {
            label: "状态",
            prop: "state",
            width: "80px"
          },
        ],
        tableList: [{
          id:1,
          title: '└ 消息管理',
          icon: 'ios-navigate',
          address: '/Article/MenuIndex',
          order: '18',
          state: '禁用',
        },{
          id:2,
          title: '   └ 消息列表',
          icon: 'ios-navigate',
          address: '/Article/MenuIndex',
          order: '18',
          state: '禁用',
        }],
        dialogConfirm:'', //弹出dialog的确定按钮
        dialogFormVisible:false,  //dialog是否显示
        dialogTitle:'',  //弹出dialog的标题
        formLabelWidth:'100px',
        ruleForm:{region:'',},
        rules: { //表单验证
          title: [{
            required: true,
            message: '名称不能为空',
            trigger: 'blur'
          }]
        }
      }
    },
    methods: {
      //页码发生改变触发
      curClick(e) {
        console.log(e);
      },
      // 添加
      addNew() {
        this.dialogTitle = "添加";
        this.dialogConfirm = "添加";
        this.dialogFormVisible = true;
      },
         //确定添加/修改
      submitForm(formName) {
        console.log(formName);
        this.$refs[formName].validate((valid) => {
          if (valid) {
            //这里调接口
         
            
            console.log(this.ruleForm)
            alert('submit!');
            this.ruleForm = {};
            this.dialogFormVisible = false;
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
    
      //取消添加/修改
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.ruleForm = {};
        this.dialogFormVisible = false;
      },
      //编辑该行
      compile(row) {
        console.log(row)
        this.ruleForm.address =  row.address;
        this.ruleForm.icon = row.icon;
        this.ruleForm.id = row.id;
        this.ruleForm.order = row.order;
        this.ruleForm.state = row.state;
        this.ruleForm.title = row.title;
        this.dialogFormVisible = true;
        this.dialogConfirm = "修改";
        this.dialogTitle = "编辑"
      },
      //选择某一项
      chooseItem(selection) {
        this.checkedList = [];
        for (let i of selection) {
          this.checkedList.push(i.id);
        }
        console.log(this.checkedList);
      },
      //全选
      chooseAll(e) {
        this.checkedList = []
        for (let i of e) {
          this.checkedList.push(i.id);
        }
        console.log(this.checkedList);
      },
      //启动
      start() {
        if (this.checkedList.length === 0) {
          this.$message({
            message: '请先选择数据！',
            type: 'warning',
            showClose: true,
            offset: 50
          })
        } else {
          this.$confirm('是否启用选中数据？？', '提示', {
            cancelButtonText: '取消',
            confirmButtonText: '确定',
            type: 'warning'
          }).then(() => {
            console.log(this.checkedList)
            //调启动接口
            this.$message({
              type: 'success',
              message: '启用成功!'
            });
            this.$refs.multipleTable.clearSelection();
            this.checkedList = []
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消启用'
            });
          });
        }
      },
      //禁用
      forbidden() {
        if (this.checkedList.length === 0) {
          this.$message({
            message: '请先选择数据！',
            type: 'warning',
            showClose: true,
            offset: 50
          })
        } else {
          this.$confirm('是否禁用选中数据？？', '提示', {
            cancelButtonText: '取消',
            confirmButtonText: '确定',
            type: 'warning'
          }).then(() => {
            console.log(this.checkedList)
            //调禁用接口
            this.$message({
              type: 'success',
              message: '禁用成功!'
            });
            this.$refs.multipleTable.clearSelection();
            this.checkedList = []
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消禁用'
            });
          });
        }
      },
    }
  }
</script>

<style scoped lang="scss">
  .container {
    margin: 0 15px;
  }

  .topIpt {
    width: 200px;
    height: 30px;
    margin-right: 10px;
  }

  .firstSelect{
    width: 110px;
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