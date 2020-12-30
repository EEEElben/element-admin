<template>
  <div class="container">
    <div class="top">
      <el-select v-model="value" placeholder="全部角色" class="firstSelect" size="medium">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <el-select v-model="value1" placeholder="状态" class="secondSelect" size="medium">
        <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <el-input v-model="inputVal" placeholder="用户名、姓名" size="medium" class="headInput"></el-input>
      <el-input v-model="phoneNum" placeholder="手机号" size="medium" class="phoneNum headInput"></el-input>
      <el-button type="primary" icon="el-icon-search" size="medium">查询</el-button>
    </div>
    <div class="main">
      <el-button type="success" icon="el-icon-plus" size="small" @click="addNew">添加</el-button>
      <el-dialog title="编辑" :visible.sync="dialogFormVisible" width="50%" top="5vh" :close-on-click-modal="false"
        center>
        <el-form :model="adminForm" :rules="rules" :inline="true" ref="adminForm">
          <el-form-item label="用户名：" :label-width="formLabelWidth" prop="user">
            <el-input v-model="adminForm.user" autocomplete="off" size="medium"></el-input>
          </el-form-item>
          <el-form-item label="昵称：" :label-width="formLabelWidth" prop="nick">
            <el-input v-model="adminForm.nick" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码：" :label-width="formLabelWidth">
            <el-input v-model="adminForm.psw" autocomplete="off" type="password" placeholder="不填写则为默认密码"></el-input>
          </el-form-item>
          <el-form-item label="职务：" :label-width="formLabelWidth">
            <el-input v-model="adminForm.duty" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="姓名：" :label-width="formLabelWidth">
            <el-input v-model="adminForm.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="手机：" :label-width="formLabelWidth">
            <el-input v-model="adminForm.phone" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="角色：" :label-width="formLabelWidth" prop="role">
            <el-select v-model="adminForm.role" placeholder="--请选择--" style="width:207.5px">
              <el-option label="超管" value="shanghai"></el-option>
              <el-option label="弟弟" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="性别：" :label-width="formLabelWidth" style="margin-left:-10px">
            <el-radio v-model="adminForm.sex" label="男">男</el-radio>
            <el-radio v-model="adminForm.sex" label="女">女</el-radio>
          </el-form-item>
          <el-form-item label="QQ：" :label-width="formLabelWidth">
            <el-input v-model="adminForm.qq" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="邮箱：" :label-width="formLabelWidth">
            <el-input v-model="adminForm.email" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="身份证：" :label-width="formLabelWidth">
            <el-input v-model="adminForm.idcard" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="状态：" :label-width="formLabelWidth">
            <el-radio v-model="adminForm.state" label="未审核">未审核</el-radio>
            <el-radio v-model="adminForm.state" label="已审核">已审核</el-radio>
            <el-radio v-model="adminForm.state" label="已禁用">已禁用</el-radio>
            <el-radio v-model="adminForm.state" label="已删除">已删除</el-radio>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submitForm('adminForm')">{{dialogConfirm}}</el-button>
          <el-button @click="resetForm('adminForm')">取 消</el-button>
        </div>
      </el-dialog>
      <el-button type="danger" icon="el-icon-delete" size="small" @click="deleteItems">删除</el-button>
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
          <span v-if="scope.row[item.prop]==='已删除'" style="color:red">{{scope.row[item.prop]}}</span>
          <span v-else-if="scope.row[item.prop]==='已审核'" style="color:green">{{scope.row[item.prop]}}</span>
          <span v-else>{{scope.row[item.prop]}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="80px" show-overflow-tooltip>
        <template slot-scope="scope">
          <div class="operate">
            <i class="el-icon-edit" @click="compile(scope.row)"></i>
            <i class="el-icon-delete" @click="deleteIt(scope.row)"></i>
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
          label: '角'
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
        value: '', //角色
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
        inputVal: '', //名称
        isPagination: true, //可以请求数据时判断，不足一页则不显示分页
        total: 999, //总数据数，用于判断一共有多少页
        phoneNum: '', //手机号
        checkedList: [], //选中要操作的内容
        dialogFormVisible: false, //添加的弹出框
        dialogConfirm: '', //dialog确定按钮显示的字
        tableHeader: [{
            label: "用户名",
            prop: "user",
            width: ""
          },
          {
            label: "昵称",
            prop: "nick",
            width: "80px"
          },
          {
            label: "姓名",
            prop: "name",
            width: "80px"
          },
          {
            label: "手机",
            prop: "phone",
            width: "120px"
          },
          {
            label: "角色",
            prop: "role",
            width: "100px"
          },
          {
            label: "状态",
            prop: "state",
            width: "90px"
          },
          {
            label: "日期",
            prop: "data",
            width: "140px"
          },
        ],
        tableList: [{
            id: 1,
            user: 'dsjakld',
            nick: '芜湖',
            name: '用户一号',
            phone: '18888777788',
            role: '超级管理员',
            state: '已审核',
            data: '2020-12-24 06:06',
            psw: ''
          },
          {
            id: 2,
            user: 'dsjakld',
            nick: '芜湖',
            name: '用户一号',
            phone: '18888777788',
            role: '超级管理员',
            state: '已审核',
            data: '2020-12-24 06:06',
            psw: ''
          },
          {
            id: 3,
            user: 'dsjakld',
            nick: '芜湖',
            name: '用户一号',
            phone: '18888777788',
            role: '超级管理员',
            state: '未审核',
            data: '2020-12-24 06:06',
            psw: ''
          }
        ],
        formLabelWidth: '110px', //表单宽
        adminForm: {
          user: '',
          nick: '',
          psw: '',
          duty: '',
          name: '',
          phone: '',
          role: '',
          sex: '',
          qq: '',
          email: '',
          idcard: '',
          state: '',
        },
        rules: { //表单验证
          user: [{
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          }, ],
          nick: [{
            required: true,
            message: '请输入昵称',
            trigger: 'blur'
          }, ],
          role: [{
            required: true,
            message: '请选择角色',
            trigger: 'blur'
          }, ]
        }
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
      },
      //全选
      chooseAll(e) {
        this.checkedList = []
        for (let i of e) {
          this.checkedList.push(i.id);
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
      },
      //单行删除
      deleteIt(row) {
        console.log(row.id);
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
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        })
      },
      //确定添加
      submitForm(formName) {
        console.log(formName);
        this.$refs[formName].validate((valid) => {
          if (valid) {
            //这里调接口
            console.log(this.adminForm)
            alert('submit!');
            this.adminForm = {};
            this.dialogFormVisible = false;
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.adminForm = {};
        this.dialogFormVisible = false;
      },
      addNew() {
        this.dialogConfirm = "添加";
        this.dialogFormVisible = true;
      },
      compile(row) {
        console.log(row)
        this.adminForm.data = row.data;
        this.adminForm.name = row.name;
        this.adminForm.id = row.id;
        this.adminForm.user = row.user;
        this.adminForm.state = row.state;
        this.adminForm.role = row.role;
        this.adminForm.nick = row.nick;
        this.dialogFormVisible = true;
        this.dialogConfirm = "修改";
      }
    }
  }
</script>

<style scoped lang="scss">
  .container {
    margin: 0 15px;
  }

  .headInput {
    width: 200px;
    height: 30px;
    margin-right: 10px;
  }

  .el-select {
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

  .phoneNum {
    width: 140px;
  }

  .operate {
    display: flex;
    justify-content: space-around;
  }

  .el-input__inner {
    width: 240px;
  }

  .dialog-footer {
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>