<template>
  <div class="container">
    <div class="top">
      <el-input v-model="inputVal" placeholder="名称" size="medium" class="topBtn"></el-input>
      <el-button type="primary" icon="el-icon-search" size="medium">查询</el-button>
    </div>
    <div class="main">
      <el-button type="success" icon="el-icon-plus" size="small" @click="addNew">添加</el-button>
    </div>
    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" width="30%" :close-on-click-modal="false" center>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
        <el-form-item label="名称：" :label-width="formLabelWidth" prop="title">
          <el-input v-model="ruleForm.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="编号：" :label-width="formLabelWidth" prop="num">
          <el-input v-model="ruleForm.num" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="值：" :label-width="formLabelWidth">
          <el-input v-model="ruleForm.value" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm('ruleForm')">{{dialogConfirm}}</el-button>
        <el-button @click="resetForm('ruleForm')">取 消</el-button>
      </div>
    </el-dialog>
    <el-table highlight-current-row ref="multipleTable" :data="tableList" tooltip-effect="dark" style="width: 100%"
      :header-cell-style="{'text-align':'center',background:'#eef1f6',color:'#606266'}" border>>
      <el-table-column align="center" type="selection" width="40">
      </el-table-column>
      <el-table-column label="序号" align="center" type="index" width="50">
      </el-table-column>
      <el-table-column v-for="(item,index) in tableHeader" :key="index" :label="item.label" :width="item.width"
        align="center">
        <template slot-scope="scope">
          <span>{{scope.row[item.prop]}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="120px" show-overflow-tooltip>
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
        inputVal: '', //名称
        tableHeader: [{
            label: "名称",
            prop: "title",
            width: "300"
          },
          {
            label: "编号",
            prop: "num",
            width: "300px"
          },
          {
            label: "值",
            prop: "value",
            width: ""
          },
        ],
        tableList: [{
            id: 1,
            title: '测一侧测一侧',
            num: '',
            value: 'ds123',
          },
          {
            id: 2,
            title: '测一侧测一侧',
            num: '2',
            value: 'ds123',
          },
          {
            id: 3,
            title: '测一侧测一侧',
            num: '',
            value: 'ds123',
          }
        ],
        isPagination: false, //可以请求数据时判断，不足一页则不显示分页
        total: 999, //总数据数，用于判断一共有多少页
        dialogTitle: '', //弹出dialog的标题
        dialogConfirm: '', //弹出dialog的确定按钮
        dialogFormVisible: false, //dialog是否显示
        ruleForm: {
          title: '',
          num: '',
          value: ''
        },
        formLabelWidth: '90px',
        rules: { //表单验证
          title: [{
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          }],
          num: [{
            required: true,
            message: '请输入编号',
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
      //添加
      addNew() {
        this.dialogTitle = "添加";
        this.dialogConfirm = "添加";
        this.dialogFormVisible = true;
        console.log(1)
      },
      //确定
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            //这里调接口改密码
            alert('submit!');
            this.dialogFormVisible = false
            this.ruleForm = {};
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      //取消
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.dialogFormVisible = false;
        this.ruleForm = {};
      },
      //编辑
      compile(e) {
        console.log(e)
        this.ruleForm.title = e.title;
        this.ruleForm.num = e.num;
        this.ruleForm.value = e.value;
        this.dialogTitle = '编辑';
        this.dialogConfirm = '修改'
        this.dialogFormVisible = true;
      }
    }
  }
</script>

<style scoped lang="scss">
  .container {
    margin: 0 15px;
  }

  .topBtn {
    width: 200px;
    height: 30px;
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