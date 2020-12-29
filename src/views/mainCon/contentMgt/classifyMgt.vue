<template>
  <div class="container">
    <div class="header">
      <div class="title">文章栏目管理</div>
      <div class="button">
        <el-button type="primary" icon="el-icon-plus" size="small" @click="refresh">刷新</el-button>
        <el-button type="success" icon="el-icon-plus" size="small" @click="addNew">添加</el-button>   
        <el-button type="primary" icon="el-icon-plus" size="small" @click="compile">编辑</el-button>
        <el-button type="danger" icon="el-icon-delete" size="small" @click="() => remove()">>删除</el-button>
        <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" :close-on-click-modal="false" center>
          <el-form :model="form">
            <el-form-item label="标题：" :label-width="formLabelWidth">
              <el-input v-model="form.head" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="副标题：" :label-width="formLabelWidth">
              <el-input v-model="form.subhead" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="顺序：" :label-width="formLabelWidth">
              <el-input v-model="form.num" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="confirm">确 定</el-button>
            <el-button @click="falsea">取 消</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
    <div class="mainMgt">
      <el-tree
        :data="data"
        node-key="id"
        default-expand-all 
        @node-drag-end="handleDrop"
        @node-click="handleNodeClick"
        draggable
        :allow-drag="allowDrag">
      </el-tree>
    </div>
  </div>
</template>
 
<script>
  let id = 1000; 
  export default {
    data() {
      return {
        dialogFormVisible: false,  //弹出框显示
        formLabelWidth: '120px',   //宽度
        checkData:'',   //选中的树节点
        checkNode:'',   //选中树节点node
        dialogTitle:'',   //dialog标题
        data: [{
          id: 1,
          label: '根节点',
          children: [{
            id: 3,
            label: '课程建设',
            children: [{
              id: 4,
              label: '建设建设'
            }, {
              id: 5,
              label: '建设嗷嗷'
            }]
          },{
          id: 2,
          label: '关于我们',
          children: [{
            id: 6,
            label: '关于关于'
          }, {
            id: 7,
            label: '关于嗷嗷'
          }]
        },]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        form:{
          head:'',
          subhead:'',
          num:''
        }
      };
    },
    methods: { 
      handleDrop(draggingNode, dropNode, dropType, ev) {
        let drop = dropType === 'before'?'上面':'下面';
        console.log(ev);
        this.$confirm(`您确定把"${draggingNode.label}"放到"${dropNode.label}"${drop}吗`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '移动成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消移动'
          });          
        });
  
      },
      //设置某个节点不可拖拽
      allowDrag(draggingNode) {
        return draggingNode.data.label.indexOf('三级 3-2-2') === -1;
      },
      //刷新
      refresh() {
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        setTimeout(() => {
          loading.close();
        }, 2000);
      }, 
      //添加时点击确认
      confirm() {
        if(!this.form.head){
          this.$message({
            showClose: true,
            message: '标题不能为空！',
            type: 'error'
          });
        return;
        }
        this.dialogFormVisible = false;
        if(this.dialogTitle == '编辑') {
          console.log('这是编辑')
        } else {
          console.log('这是添加')
        }
      },
      //添加时点击取消
      falsea() {
        this.dialogFormVisible = false
        this.form ={}
        console.log(this.form)
      },
      //选中某一行触发
      handleNodeClick(data,node) {
        console.log(node)
        console.log(data.$treeNodeId)
        //选中的id
        this.checkNode = node;
        this.checkData = data;
      },
      //添加
      addNew() {
        this.dialogTitle = '添加子集'
        this.dialogFormVisible = true;
      },
      //编辑
      compile() {
        if(!this.checkData.id){
          this.$message({
            showClose: true,
            message: '请选择一个节点再进行操作',
            type: 'warning'
          });
          return;
        }
        this.dialogTitle = "编辑"
        this.dialogFormVisible = true;
        console.log(this.checkData)
        this.form.head = this.checkData.label;
        this.form.num = this.checkData.$treeNodeId;
      },
      //删除
      remove() {
        if(!this.checkNode) {
           this.$message({
            showClose: true,
            message: '请选择要删除的节点',
            type: 'warning'
          });
          return;
        };
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let node = this.checkNode;
          const data = this.checkData;
          const parent = node.parent;
          const children = parent.data.children || parent.data;
          const index = children.findIndex(d => d.id === data.id);
          children.splice(index, 1)
          this.checkNode = '';
          this.checkData = '';
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
        
      },
    }
    
    
  }
</script>
 
<style scoped lang = "scss">
  .container {
    margin: 20px;
  }
  .header {
    width: 100%;
    height: 60px;
    background-color:#f5f5f5;
    display:flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    box-sizing: border-box;
    border: 1px solid rgb(190, 190, 190, 0.5);
    font-weight: bold;
  }
  .mainMgt{
    border: 1px solid rgb(190, 190, 190, 0.5);
    padding: 10px 0;
  }
</style>