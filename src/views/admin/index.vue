<template>
  <div >
    ​
    <div class="top">
      <admin-header></admin-header>
    </div>
    <div class="mainBox">
      <div class="leftBox">
        <admin-aside></admin-aside>
      </div>
      <div class="rightBox">
        <router-view></router-view>
      </div>
    </div>
    ​
  </div>
</template>

<script>
  import adminHeader from './components/adminHeader'
  import adminAside from './components/adminAside'
  import bus from '../../components/common/bus';
export default {
  inject:['reload'],
  data () {
    const item = {
      date: '2016-05-02',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄'
    };
    return {
      tableData: Array(20).fill(item),
      tagsList: []
    }
  },
  created () {

  },
  components:{
    adminHeader,
    adminAside
  },
  methods:{
  }
};
</script>
<style  lang="scss" scoped>
  body,html{
    margin:0;
    padding:0;
    overflow-x: hidden !important;
  }
  .top {
    width: 100%;
    height: 65px;
    position:absolute;
    top:0;
    line-height:65px;
  }
  .mainBox{
    width:100%;
    position:absolute;
    top:65px;
    bottom:0px;
    /*以上设置是重点必须的*/
  }
  .mainBox .leftBox{
    height:100%;
    width:220px;
    float:left;
    /*margin-bottom:40px;*/
    overflow: auto;
    /*以上设置是重点必须的*/
    /*border:6px solid green;*/
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    text-align:center;
    line-height:65px;
    background-color: #545c64;
  }
  .mainBox .rightBox{
    height:100%;
    margin-left:220px;
    /*以上设置是重点必须的*/
    /*border:6px solid crimson;*/
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    overflow: auto;
    text-align:left;
    padding: 30px;
    /*line-height:65px;*/
    /*background-color: #00a854;*/
  }
  /*滚动条样式*/
  .leftBox::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 1px;
    /*高宽分别对应横竖滚动条的尺寸*/
    height: 1px;
  }

  .leftBox::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 5px;
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: rgba(0, 0, 0, 0.2);
  }

  .leftBox::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 0;
    background: rgba(0, 0, 0, 0.1);
  }
 </style>
