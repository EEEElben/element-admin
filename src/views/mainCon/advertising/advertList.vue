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
      <el-input v-model="inputVal" placeholder="名称" size="medium" class="topIpt"></el-input>
      <el-date-picker size="medium" v-model="startData" type="date" placeholder="选择开始日期"></el-date-picker>
      <el-date-picker size="medium" v-model="endData" type="date" placeholder="选择结束日期"></el-date-picker>
      <el-button type="primary" icon="el-icon-search" size="medium">查询</el-button>
    </div>
    <div class="main">
      <el-button type="success" icon="el-icon-plus" size="small" @click="addNew">添加</el-button>
    </div>
    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" width="800px" :close-on-click-modal="false"
      center>
      <el-form :model="advertForm" :rules="rules" ref="advertForm" size="medium">
        <div class="form-group">
          <div>
            <el-form-item label="名称：" :label-width="formLabelWidth" prop="title">
              <el-input v-model="advertForm.title" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="类型：" :label-width="formLabelWidth" prop="type">
              <el-select v-model="advertForm.type" placeholder="--请选择--" style="width:250px">
                <el-option v-for="item in typeOptions" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="背景色：" :label-width="formLabelWidth" prop="bg">
              <div class="bgcolor">
                <el-input v-model="advertForm.bg" autocomplete="off" style="width:154px;margin-right:60px"></el-input>
                <el-color-picker v-model="advertForm.bg"></el-color-picker>
              </div>
            </el-form-item>
            <el-form-item label="开始时间：" :label-width="formLabelWidth" prop="startTime">
              <el-date-picker size="medium" v-model="advertForm.startTime" type="date" placeholder="开始时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="顺序：" :label-width="formLabelWidth">
              <el-input v-model="advertForm.order" autocomplete="off"></el-input>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="图片：" :label-width="formLabelWidth">
              <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                <img v-if="advertForm.pic" :src="advertForm.pic" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
              png图片请转成jpg或压缩后再上传
            </el-form-item>
            <el-form-item label="链接地址：" :label-width="formLabelWidth">
              <el-input v-model="advertForm.link" autocomplete="off" placeholder="http://或https://"></el-input>
            </el-form-item>
            <el-form-item label="结束时间：" :label-width="formLabelWidth" prop="endTime">
              <el-date-picker size="medium" v-model="advertForm.endTime" type="date" placeholder="结束时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="状态：" :label-width="formLabelWidth">
              <el-radio v-model="advertForm.state" label="1">男</el-radio>
              <el-radio v-model="advertForm.state" label="2">女</el-radio>
            </el-form-item>
          </div>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm('advertForm')">{{dialogConfirm}}</el-button>
        <el-button @click="resetForm('advertForm')">取 消</el-button>
      </div>
    </el-dialog>
    <el-table highlight-current-row ref="multipleTable" :data="tableList" tooltip-effect="dark" style="width: 100%"
      :header-cell-style="{'text-align':'center',background:'#eef1f6',color:'#606266'}" border>>
      <el-table-column align="center" type="selection" width="40"></el-table-column>
      <el-table-column label="序号" align="center" type="index" width="50"></el-table-column>
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
        value: '', //可以设置默认选择
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
        typeOptions: [{
          value: '选项1',
          label: '首页'
        }, {
          value: '选项2',
          label: '引导页'
        }, {
          value: '选项3',
          label: '排行榜'
        }, {
          value: '选项4',
          label: '个人中心'
        }],
        dialogTitle: '', //弹出dialog的标题
        dialogConfirm: '', //弹出dialog的确定按钮
        dialogFormVisible: false, //dialog是否显示.
        formLabelWidth: '90px',
        advertForm: {},
        rules: {
          title: [{
            required: true,
            message: '名称不能为空',
            trigger: 'blur'
          }],
          type: [{
            required: true,
            message: '类型不能为空',
            trigger: 'blur'
          }],
          bg: [{
            required: true,
            message: '背景色不能为空',
            trigger: 'blur'
          }],
          startTime: [{
            required: true,
            message: '开始时间不能为空',
            trigger: 'blur'
          }],
          endTime: [{
            required: true,
            message: '结束时间不能为空',
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
      //删除
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
        });
      },
      //添加
      addNew() {
        this.dialogTitle = "添加";
        this.dialogConfirm = "添加";
        this.dialogFormVisible = true;
      },
      //确定
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            //这里调接口改密码
            console.log(this.advertForm)
            alert('submit!');
            this.dialogFormVisible = false
            this.advertForm = {};
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
        this.advertForm = {};
      },
      //上传图片
      handleAvatarSuccess(res, file) {
        this.advertForm.pic = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      //操作->  编辑
      compile(row) {
        console.log(row)
        this.advertForm.title = row.title;
        this.advertForm.type = row.type;
        this.advertForm.pic = row.pic;
        this.advertForm.bg = row.bg;
        this.advertForm.startTime = row.startTime;
        this.advertForm.endTime = row.endTime;
        this.advertForm.order = row.order;
        this.advertForm.state = row.state;
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

  .topIpt {
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

  .el-input {
    width: 250px;
  }

  .bgcolor {
    display: flex;
  }

  .avatar-uploader .el-upload {
    border: 1px border red;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 58px;
    height: 58px;
    line-height: 58px;
    text-align: center;
  }

  .avatar {
    width: 58px;
    height: 58px;
    display: block;
  }

  .form-group {
    display: flex;
  }
</style>