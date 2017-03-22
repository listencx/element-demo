<template>
	<div>
    <el-row>
    <el-col :offset="1" :span="4">
      <el-input
      placeholder="输入关键字进行过滤"
      v-model="filterText">
    </el-input>
    <el-tree
    class="filter-tree"
    :data="dataTree"
    :props="defaultProps"
    :filter-node-method="filterNode"
    @node-click="handleNodeClick"
    ref="tree"
    v-loading="treeLoading"
    >
  </el-tree>
</el-col>
<el-col :offset="1" :span="16">
  <el-upload
  id="upload"
  action="http://100.100.20.215:8888/workCard/uploadImage/"
  list-type="picture-card"
  :file-list="fileList"
  :on-preview="handlePictureCardPreview"
  :on-remove="handleRemove">
</el-upload>
<el-dialog v-model="dialogVisible" size="tiny">
  <img width="100%" :src="dialogImageUrl" alt="">
</el-dialog><br>
<el-button @click="downSelected">下载图片</el-button>
</el-col>
</el-row>
</div>
</template>

<script>

import Promise from 'promise-polyfill'; 

// To add to window
if (!window.Promise) {
  window.Promise = Promise;
}
  export default {

   methods: { 
    handleRemove(file, fileList) {
      this.fileList=fileList;
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    filterNode(value,data){
      if(!value)return true;
      return data.label.indexOf(value) !== -1;
    },

    handleNodeClick(data){
      this.$http.get('http://100.100.20.215:8888/workCard/'+data.label+'/pictures').then(response => {
        this.fileList=eval(response.data);
      });
    },
    downSelected(){
      var list='';
      for(let i=0;i<this.fileList.length;i++){
        list+=this.fileList[i].name.split('.')[0];
        if(i<this.fileList.length-1){
          list+='&';
        }
      };
      this.$http.get('http://100.100.20.215:8888/workCard/getPicturesRar/' + list,
        ).then(response => {
          window.location.href = response.data.url;
        });
      },
    },
    mounted:function(){
      document.getElementsByClassName('el-upload--picture-card')[0].style.display='none';
      this.treeLoading = true;
      this.$http.get('http://100.100.20.215:8888/workCard/getUnitTree').then(response => {
        this.dataTree = eval(response.data.url);
        this.treeLoading = false;
      });
    },
    watch:{
      filterText(val){
        this.$refs.tree.filter(val);
      }
    },
    data() {
      return {
        treeLoading: false,
        dialogImageUrl: '',
        dialogVisible: false,
        filterText: '',
        fileList: [],
        dataTree: [],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      };
    }
  };
</script>