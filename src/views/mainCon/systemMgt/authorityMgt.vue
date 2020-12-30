<template>
  <div class="container">
    <div class="title">
      <el-button icon="el-icon-check" size="small" :type="btnClass" @click="save">权限保存</el-button>
    </div>
    <div class="main">
      <div class="left">
        <div class="leftTop">角色组</div>
        <div class="mainbox">
          <div class="leftmainbox">
            <div v-for="(item,index) in list" :key="index" class="item" @click="leftClick(index)"
              :class="index===curLeft?'active':''">{{item}}</div>
          </div>
        </div>
      </div>
      <div class="mid">
        <div class="leftTop">组内用户(显示前50，共有{{people}}人)</div>
        <div class="mainbox">
          <div class="leftmainbox">
            <div v-for="(item,index1) in midList" :key="index1" class="item" @click="midClick(index1)"
              :class="index1===curMid?'active':''">{{item}}</div>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="leftTop">菜单列表</div>
        <div class="mainbox">
          <div v-if="curLeft===0?true:false" style="padding:10px">超级管理员不需要设置权限</div>
          <el-tree v-else :data="data" show-checkbox node-key="id" :default-expanded-keys="openArr"
            :default-checked-keys="[5]">
          </el-tree>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "authorityMgt",
    data() {
      return {
        people: 1, //中间头部人数
        curLeft: 9, //左侧高亮
        curMid: 1000, //中间高亮
        openArr: [2, 3, 4],
        list: ['超级管理员', '区域管理员', '管理员', '用户'],
        midList: ['test', 'testtest'],
        data: [{
          id: 1,
          label: '根目录',
          children: [{
              id: 2,
              label: '内容管理',
              children: [{
                id: 5,
                label: '文章管理'
              }, {
                id: 6,
                label: '栏目管理'
              }]
            }, {
              id: 3,
              label: '广告管理',
              children: [{
                id: 7,
                label: '广告类型'
              }, {
                id: 8,
                label: '广告列表'
              }]
            },
            {
              id: 4,
              label: '系统管理',
              children: [{
                id: 9,
                label: '登录日志'
              }, {
                id: 10,
                label: '异常日志'
              }, {
                id: 11,
                label: '管理员列表'
              }, {
                id: 12,
                label: '权限管理'
              }, {
                id: 13,
                label: '角色管理'
              }, {
                id: 14,
                label: '菜单管理'
              }, {
                id: 15,
                label: '全局配置'
              }, {
                id: 16,
                label: '网站基本配置'
              }]
            }
          ]
        }], //树结构数据
      }
    },
    methods: {
      leftClick(index) {
        this.curLeft = index;
      },
      midClick(index) {
        this.curMid = index;
      },
      save() {
        if (this.curLeft) {
          //请求保存接口
          this.$message({
            message: '保存成功',
            type: 'success'
          });
        }
      }
    },
    computed: {
      btnClass() {
        return this.curLeft === 0 ? 'info' : 'primary'
      }
    }
  }
</script>

<style scoped lang="scss">
  .container {
    margin: 20px;

    .title {
      border: 1px solid #dddddd;
      padding: 10px;
      background-color: #f5fafe;
    }
  }

  .main {
    display: flex;
    justify-content: space-around;
    margin-top: 15px;
  }

  .left,
  .mid,
  .right {
    width: 30%;
  }

  .leftTop {
    color: #fff;
    font-weight: bold;
    font-size: 14px;
    padding: 10px;
    background: #515a6e;
  }

  .mainbox {
    height: 430px;
    border: 1px solid #000000;
    border-top: none;
    box-sizing: border-box;
    overflow-y: auto;

    .leftmainbox {
      height: 390px;
      margin: 15px;
      border: 1px solid #dddddd;
      font-size: 14px;
    }
  }

  .item {
    padding: 5px 10px;
    cursor: pointer;
  }

  .active {
    background: #1e90ff;
    color: #fff;
  }
</style>