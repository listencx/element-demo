<template>
	<div>
		<el-row>
			<el-col :offset="1" :span="3">
				<el-input v-model="badge" placeholder="请输入工号"></el-input>
			</el-col>
			<el-col :offset="1" :span="2">
				<el-tooltip class="item" content="图片右键另存为保存图片" plcaement="bottom">
					<el-button @click="searchByBadge" icon="search">查询</el-button>
				</el-tooltip>
			</el-col>
			<el-col :offset="1" :span="8">
				<img :src="searchImg" style="width:300px;display:none" id="searchImg">
			</el-col> 
		</el-row>
	</div>
</template>

<script>
	export default{
		methods: {
			searchByBadge(){
				document.getElementById('searchImg').style.display = "none";
				if(this.badge == ''){
					this.$message({
						message: '请输入工号'
					})
				}
				if(this.badge != ''){
					this.$http.get('pictures/' + this.badge + '.jpg').then(response => {
						this.searchImg = 'pictures/' + this.badge + '.jpg';
						console.log(this.searchImg);
						document.getElementById('searchImg').style.display = "block";
						this.$message({
							message: '查询不到此人工作证'
						})
					}, response => {
						this.$message({
							message: '查询不到此人工作证'
						})
					});
				}
			},
		},
		data() {
			return {
				badge: '',
				searchImg: ''
			}
		}
	}
</script>