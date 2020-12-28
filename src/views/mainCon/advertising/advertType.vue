<template>
  <div class="container">
    <div class="top">
      <el-input v-model="inputVal" placeholder="名称" size="medium"></el-input>
      <el-button type="primary" icon="el-icon-search" size="medium" class="search">查询</el-button>
    </div>
    <div class="main">
      <el-button type="success" icon="el-icon-plus" size="small" @click="addNew">添加</el-button>
      <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
        <el-form :model="form">
          <el-form-item label="名称：" :label-width="formLabelWidth">
            <el-input v-model="form.title" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="顺序：" :label-width="formLabelWidth">
            <el-input v-model="form.order" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="备注：" :label-width="formLabelWidth">
            <el-input v-model="form.remarks" autocomplete="off" type="textarea" :rows="4"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="confirm">{{dialogconfirm}}</el-button>
          <el-button @click="cancle">取 消</el-button>
        </div>
      </el-dialog>
    </div>
    <el-table highlight-current-row ref="multipleTable" :data="tableList" tooltip-effect="dark"
      style="width: 100%" :header-cell-style="{'text-align':'center',background:'#eef1f6',color:'#606266'}" border>
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
        inputVal: '', //名称
        isPagination: false, //可以请求数据时判断，不足一页则不显示分页
        total: 999, //总数据数，用于判断一共有多少页
        dialogFormVisible: false, //弹出框显示
        formLabelWidth: '100px', //宽度
        dialogTitle: '', //dialog标题
        dialogconfirm: '', //确定按钮显示
        compileId: '', //编辑操作的 id
        tableHeader: [{
            label: "名称",
            prop: "title",
            width: ""
          },
          {
            label: "备注",
            prop: "remarks",
            width: ""
          },
          {
            label: "顺序",
            prop: "order",
            width: "80px"
          },
        ],
        tableList: [{
            id: '1',
            title: '测一侧测一侧',
            remarks: '这是个备注哈',
            order: '123',
          },
          {
            id: '2',
            title: '测一侧测一侧',
            remarks: '这是个备注哈',
            order: '12333',
          },
          {
            id: '3',
            title: '测一侧测一侧',
            remarks: '这是个备注哈',
            order: '123333',
          }
        ],
        form: {
          id: '',
          title: '',
          order: '',
          remarks: ''
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
        this.dialogFormVisible = true;
        this.dialogTitle = '添加'
        this.dialogconfirm = '添加'
      },
      confirm() {
        if (this.dialogTitle === '添加') {
          if (this.form.title && this.form.order && this.form.remarks) {
            this.tableList.push(this.form)
            this.$message({
              type: 'success',
              message: '添加成功！'
            });
            this.dialogFormVisible = false;
            this.form = {};
            return;
          }
          this.$message({
            showClose: true,
            message: '内容不能为空！',
            type: 'error'
          });
        } else {
          //调接口完成编辑
          this.dialogFormVisible = false;
          this.form = {};
        }
      },
      cancle() {
        this.$message({
          type: 'success',
          message: '取消修改！'
        });
        this.form = {};
        this.dialogFormVisible = false;
      },
      compile(row) {
        console.log(row)
        this.compileId = row.id;
        this.dialogTitle = '编辑'
          this.dialogconfirm = '修改'
          this.dialogFormVisible = true;
          for (let i of this.tableList) {
            if (i.id === this.compileId) {
              this.form.title = i.title;
              this.form.order = i.order;
              this.form.remarks = i.remarks;
            }
          }
      }
    }
  }
</script>

<style scoped lang="scss">
  .container {
    margin: 0 15px;
  }

  .el-input--medium {
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