<template>
  <div class="container">
    <div>通用后台管理系统</div>
    <el-dropdown size="medium">
      <div class="admin">
        <i class="el-icon-user-solid" style="padding-right:5px"></i>
          超级管理员
        <i class="el-icon-arrow-down"></i>
      </div>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item><div @click="showPsw"><i class="el-icon-s-tools"></i>修改密码</div></el-dropdown-item>
        <el-dropdown-item><i class="el-icon-grape"></i>退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <el-dialog title="修改密码" :visible.sync="dialogFormVisible" width="30%" :close-on-click-modal="false" center>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
        <el-form-item label="原密码：" :label-width="formLabelWidth" prop="oldpsw">
          <el-input v-model="ruleForm.oldpsw" autocomplete="off" type="password"></el-input>
        </el-form-item>
        <el-form-item label="新密码：" :label-width="formLabelWidth" prop="pass">
          <el-input v-model="ruleForm.pass" autocomplete="off" type="password"></el-input>
        </el-form-item>
        <el-form-item label="再次输入密码：" :label-width="formLabelWidth" prop="checkPass">
          <el-input v-model="ruleForm.checkPass" autocomplete="off" type="password"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm('ruleForm')">确认修改</el-button>
        <el-button @click="resetForm('ruleForm')">取 消</el-button>     
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "headerNav",
    data() {
      var validatePass = (rule, value, callback) => {
        console.log(value.length)
        if (value === '') {
          callback(new Error('请输入密码'));
        } else if (value.length < 6 || value.length > 12) {
          callback(new Error("请输入6到12位的密码"))
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass1 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入旧密码'));
        } else {
          if (this.ruleForm.oldpsw !== '') {
            callback();
          }
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        dialogFormVisible:false, //修改密码dialog
        formLabelWidth:'120px',
        ruleForm: {
          oldpsw:'',
          pass: '',
          checkPass: '',
        },
        rules: {
          oldpsw:[
            { validator: validatePass1, trigger: 'blur' }
          ],
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ]
        }
      }
    },
    methods:{
      showPsw() {
        console.log('show')
        this.dialogFormVisible = true
      },
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
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.dialogFormVisible = false;
        this.ruleForm = {};
      }
    }
  }
</script>

<style scoped lang="scss">
  .container {
    display: flex;
    justify-content: space-between;
    line-height: 60px;
    color: #fff;

    font: {
      size: 22px;
      weight: 500;
    }
  }

  .admin {
    color: #cbced4;
    font-size: 14px;
    padding-right: 40px;
    cursor: pointer;

    &:hover {
      color: #fff;
    }
  }
</style>