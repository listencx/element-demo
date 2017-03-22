<template>
  <div id="app">
    <el-row>
      <el-col :push="1" :span="22">
        <el-menu :default-active="'overview'" mode="horizontal">
          <router-link to="/overview"><el-menu-item index="overview">工作证浏览</el-menu-item></router-link>
          <router-link to="/merge"><el-menu-item index="merge">工作证合成</el-menu-item></router-link>
          <router-link to="/search"><el-menu-item index="search">工作证查询</el-menu-item></router-link>
        </el-menu>
      </el-col>
    </el-menu>
  </el-row>
  <el-row><br><br></el-row>
  <router-view></router-view>
</div>

</template>

<script>

  export default {

  }
</script>
<style>
  .el-upload-list--picture-card .el-upload-list__item {
   width: 120px;
   height: 187px;
 }
 .el-upload--picture-card {
   width: 120px;
   height: 187px;
 }
</style>

