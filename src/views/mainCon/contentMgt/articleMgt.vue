<template>
  <div class="container">
    <div v-show="isShow" class=""></div>
    <div class="top">
      <el-select v-model="value" placeholder="栏目" class="firstSelect" size="medium">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <el-select v-model="value1" placeholder="状态" class="secondSelect" size="medium">
        <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <el-input v-model="inputVal" placeholder="名称" size="medium" class="topIpt"></el-input>
      <el-button type="primary" icon="el-icon-search" size="medium" @click="search">查询</el-button>
    </div>
    <div class="main">
      <el-button type="danger" icon="el-icon-delete" size="small" @click="deleteItem">删除</el-button>
      <el-button type="success" icon="el-icon-plus" size="small" @click="addNew">添加</el-button>
    </div>
    <el-table highlight-current-row ref="multipleTable" :data="tableList" tooltip-effect="dark" style="width: 100%"
      :header-cell-style="{'text-align':'center',background:'#eef1f6',color:'#606266'}"
      @selection-change="handleSelectionChange" border>
      <el-table-column align="center" type="selection" width="40">
      </el-table-column>
      <el-table-column label="序号" align="center" type="index" width="50">
      </el-table-column>
      <el-table-column v-for="(item,index) in tableHeader" :key="index" :label="item.label" :width="item.width"
        align="center">
        <template slot-scope="scope">
          <span v-if="scope.row[item.prop]==='已删除'" style="color:red">{{scope.row[item.prop]}}</span>
          <span v-else-if="scope.row[item.prop]==='已审核'" style="color:green">{{scope.row[item.prop]}}</span>
          <span v-else-if="item.prop==='file'&&scope.row[item.prop]!==''">
            <a href="/UploadFiles/2020/1210/927bb1a5-f0e0-4236-82b3-29c99d2d4c20.xls" target="_blank">下载</a>
          </span>
          <span v-else-if="item.prop==='pic'&&scope.row[item.prop]!==''">
            <img :src="scope.row[item.prop]" @click="largerPic(scope.row)">
          </span>
          <span v-else>{{scope.row[item.prop]}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="50px" show-overflow-tooltip>
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
    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" width="1200PX" :close-on-click-modal="false" 
               top="5vh" center>
      <el-form :model="articleForm" :rules="rules" :inline="true" ref="articleForm" size="medium">
        <el-form-item label="标题：" :label-width="formLabelWidth" prop="title">
          <el-input v-model="articleForm.title" autocomplete="off" size="medium"></el-input>
        </el-form-item>
        <el-form-item label="发布时间：" :label-width="formLabelWidth" prop="data" >
          <el-date-picker v-model="articleForm.data" type="date" placeholder="发布日期" >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="栏目：" :label-width="formLabelWidth" prop="column">
          <el-input v-model="articleForm.column" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图片上传：" :label-width="formLabelWidth" prop="pic">
          <div class="upload">
            <el-input v-model="articleForm.pic" autocomplete="off" style="width:352px"></el-input>
            <el-upload
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              :limit="1"
              :show-file-list='false'>
              <el-button size="medium" type="primary" style="margin:0">点击上传</el-button>
            </el-upload>
          </div>
        </el-form-item>
        <el-form-item label="资源类型：" :label-width="formLabelWidth" style="margin-right:80px">
          <el-radio v-model="articleForm.type" label="文字">文字</el-radio>
          <el-radio v-model="articleForm.type" label="图片">图片</el-radio>
          <el-radio v-model="articleForm.type" label="视频">视频</el-radio>
          <el-radio v-model="articleForm.type" label="音频">音频</el-radio>
          <el-radio v-model="articleForm.type" label="软件">软件</el-radio>
        </el-form-item>
        <el-form-item label="文件上传：" :label-width="formLabelWidth">
          <div class="upload">
            <el-input v-model="articleForm.file" autocomplete="off" style="width:352px"></el-input>
            <el-upload
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              :http-request="uploadFile"
              :on-success="handleSuccess"
              :limit="1"
              :show-file-list='false'>
              <el-button size="medium" type="primary" style="margin:0">点击上传</el-button>
            </el-upload>
          </div>
        </el-form-item>
        <el-form-item label="关键词：" :label-width="formLabelWidth" prop="role">
          <el-input v-model="articleForm.keyword" autocomplete="off"></el-input>
        </el-form-item>    
        <el-form-item label="顺序：" :label-width="formLabelWidth">
          <el-input v-model="articleForm.order" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="置顶：" :label-width="formLabelWidth" style="margin-right: 403px">
          <el-checkbox v-model="articleForm.top">启用</el-checkbox>
        </el-form-item>
        <el-form-item label="状态：" :label-width="formLabelWidth">
          <el-radio v-model="articleForm.state" label="未审核">未审核</el-radio>
          <el-radio v-model="articleForm.state" label="已审核">已审核</el-radio>
          <el-radio v-model="articleForm.state" label="已删除">已删除</el-radio>
        </el-form-item>
        <el-form-item label="简介：" :label-width="formLabelWidth">
          <el-input v-model="articleForm.intro" autocomplete="off" type="textarea" style="width:1010px"></el-input>
        </el-form-item>
        <el-form-item label="文章内容：" :label-width="formLabelWidth">
          <quill-editor ref="text" v-model="articleForm.content" class="myQuillEditor" :options="editorOption" />
        </el-form-item>
        <el-form-item label="文章来源：" :label-width="formLabelWidth">
          <el-input v-model="articleForm.source" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="访问量：" :label-width="formLabelWidth">
          <el-input v-model="articleForm.pv" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="作者：" :label-width="formLabelWidth">
          <el-input v-model="articleForm.author" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm('articleForm')">{{dialogConfirm}}</el-button>
        <el-button @click="resetForm('articleForm')">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'
  import 'quill/dist/quill.bubble.css'
  import { quillEditor } from 'vue-quill-editor'
  export default {
    name: "management",
    components:{
      quillEditor
    },
    data() {
      return {
        isShow: false, // 添加内容区域
        inputVal: '', //输入框内容
        options: [{   //第一个下拉框-
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
        value: '', //第一个下拉栏选中的数据
        isPagination: false, //可以请求数据时判断，不足一页则不显示分页
        total: 999, //总数据数，用于判断一共有多少页
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
        value1: '', //第二个下拉栏选中的数据
        tableHeader: [{
            label: "标题",
            prop: "title",
            width: ""
          },
          {
            label: "栏目",
            prop: "column",
            width: "80px"
          },
          {
            label: "图片",
            prop: "pic",
            width: "80px"
          },
          {
            label: "文件",
            prop: "file",
            width: "80px"
          },
          {
            label: "访问量",
            prop: "pv",
            width: "70px"
          },
          {
            label: "状态",
            prop: "state",
            width: "70px"
          },
          {
            label: "时间",
            prop: "data",
            width: "150px"
          },
        ],
        tableList: [{
            id: 1,
            title: '测一侧测一侧',
            column: '栏目哦',
            pic: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fa1.att.hudong.com%2F62%2F02%2F01300542526392139955025309984.jpg&refer=http%3A%2F%2Fa1.att.hudong.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1611834227&t=28638ac574eb425d13d5c0bf571e825e',
            file: 'sadsdasad',
            pv: 15,
            state: '已审核',
            data: '2020-12-24 06:06'
          },
          {
            id:89,
            title: '测一侧',
            column: '栏目哦',
            pic: '',
            file: '',
            pv: 15,
            state: '已删除',
            data: '2020-12-24 06:06'
          },
          {
            id: 3,
            title: '测一侧',
            column: '栏目哦',
            pic: '',
            file: '文件',
            pv: 15,
            state: '已删除',
            data: '2020-12-24 06:06'
          },
          {
            id: 4,
            title: '测一侧',
            column: '栏目哦',
            pic: '',
            file: '文件',
            pv: 15,
            state: '已删除',
            data: '2020-12-24 06:06'
          },
          {
            id: 5,
            title: '测一侧',
            column: '栏目哦',
            pic: '',
            file: '文件',
            pv: 15,
            state: '已删除',
            data: '2020-12-24 06:06'
          },
          {
            id: 6,
            title: '测一侧',
            column: '栏目哦',
            pic: '',
            file: '文件',
            pv: 15,
            state: '已删除',
            data: '2020-12-24 06:06'
          },
          {
            id: 7,
            title: '测一侧',
            column: '栏目哦',
            pic: '',
            file: '文件',
            pv: 15,
            state: '已删除',
            data: '2020-12-24 06:06'
          }
        ],
        multipleSelection: '', //选中的数据
        checkedArr: [], //选中的数据保存
        dialogFormVisible: false, //添加的弹出框
        dialogConfirm: '', //dialog确定按钮显示的字
        dialogTitle: '', //dialog标题
        formLabelWidth:'100px',
        articleForm:{},
        rules:{
          title: [{
            required: true,
            message: '标题不能为空',
            trigger: 'blur'
          }],
          column: [{
            required: true,
            message: '栏目不能为空',
            trigger: 'blur'
          }],
          pic: [{
            required: true,
            message: '请选择图片',
            trigger: 'blur'
          }],
          data:[{
            required: true,
            message: '请选择发布时间',
            trigger: 'blur'
          }]
        },
        //富文本
        editorOption: {} 

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
        this.checkedArr = [] //每次点击需清空原本数组的内容
        this.multipleSelection.map(item => { //遍历数组，把id存进自定义的数组里
          this.checkedArr.push(item.id)
        })
        // this.checkedArr = this.checkedArr.join(',')
         console.log(this.checkedArr);
      },
      //删除
      deleteItem() {
        if (this.checkedArr.length === 0) {
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
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        }
      },
      //查看大图
      largerPic(e) {
        window.open(e.pic)
      },
      uploadFile() {
        //上传文件 如果不用action，则在该方法里写请求
      },
      handleSuccess() {
        //成功上传
      },
      //添加新的
      addNew() {
        this.dialogTitle = "添加";
        this.dialogConfirm = "添加";
        this.dialogFormVisible = true;
      },
      submit () {
        console.log(this.$refs.text.value)
      },
      //dialog确定
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            //这里调接口
            console.log(this.articleForm)
            alert('submit!');
            this.articleForm = {};
            this.dialogFormVisible = false;
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      //dialog取消
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.articleForm = {};
        this.dialogFormVisible = false;
      },
      //行内的操作按钮
      compile(row) {
        console.log(row)
        this.articleForm.title = row.title;
        this.articleForm.column = row.column;
        this.articleForm.pic = row.pic;
        this.articleForm.file = row.file;
        this.articleForm.pv = row.pv;
        this.articleForm.state = row.state;
        this.articleForm.data = row.data;
        this.dialogFormVisible = true;
        this.dialogConfirm = "修改";
      }

    },

  }
</script>

<style scoped lang="scss">
  .container {
    margin: 0 15px;
  }

  .topIpt {
    width: 200px;
    height: 30px;
    margin-right: 20px;
  }

  .firstSelect {
    width: 200px;
    margin-right: 20px;
    color: #000;
  }

  .secondSelect {
    width: 100px;
    margin-right: 20px;
  }

  .main {
    display: flex;
    flex-direction: row-reverse;
    background-color: #f5fafe;

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

  img {
    width: 50px;
    height: 50px;
    cursor: pointer;
  }

  .el-input {
    width: 450px;
  }

  .upload{
    display:flex;
    justify-content: center;
  }


  .quill-editor{
    width: 1010px;
    margin:-30px 0 0 100px;
  }

</style>