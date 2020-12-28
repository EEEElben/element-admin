<template>
  <div class="container">
    <div class="title">网站基本配置</div>
    <div style="margin: 20px;"></div>
    <el-form label-position="right" label-width="130px" :model="formLabelAlign" ref="formLabelAlign" :rules="rules">
      <el-form-item label="名称" prop='name'>
        <el-input v-model="formLabelAlign.name" style="width:95%"></el-input>
      </el-form-item>
      <el-form-item label="首页标题" prop='title'>
        <el-input v-model="formLabelAlign.title" style="width:95%"></el-input>
      </el-form-item>
      <el-form-item label="首页关键字">
        <el-input v-model="formLabelAlign.keyword" style="width:95%"></el-input>
      </el-form-item>
      <el-form-item label="首页描述">
        <el-input v-model="formLabelAlign.desc" type="textarea" style="width:95%"> </el-input>
      </el-form-item>
      <el-form-item label="首页js代码">
        <el-input v-model="formLabelAlign.js" type="textarea" style="width:95%" :rows="6"></el-input>
      </el-form-item>
      <div class="btn">
        <el-button type="primary" @click="submitForm('formLabelAlign')" >提交</el-button>
      </div>
    </el-form>
  </div>
</template>
 
<script>
  export default {
    data() {
      return {
        formLabelAlign: {
          name: '',
          title: '',
          keyword: '',
          desc: '',
          js: ' '
        },
        rules: {
          name: [
            { required: true, message: '活动名称不能为空', trigger: 'blur' }
          ],
          title: [
            { required: true, message: '标题不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
    }
  }
</script>
 
<style scoped lang = "scss">
  .container {
    margin: 20px;
    border: 1px solid #dddddd;
    .title{
      padding: 10px;
      background-color: #f5f5f5;
      font-size: 14px;
      font-weight: bold;
    }
  }
  .btn{
    display:flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
  }
</style>