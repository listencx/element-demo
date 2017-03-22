<template>
	<div>
		<el-row>
			<el-col :offset="1" :span="22" v-if="showInfo" v-loading="fileLoading" element-loading-text="拼命加载中">
				<el-upload
				id="upload"
				action="http://100.100.20.215:8888/workCard/uploadImage/"
				list-type="picture-card"
				:before-upload= "beforeAvatarUpload"
				:multiple= "showInfo"
				:file-list="fileList"
				:on-preview="handlePictureCardPreview"
				:on-success="handleSuccess"
				:on-remove="handleRemove">
				<i class="el-icon-plus"></i>
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
	export default{
		methods: {    
			handleRemove(file, fileList) {
				this.fileList=fileList;
     		},
     		handleSuccess(response,file, fileList){
     			if(response.name == '员工查找失败！'){
     				this.$message.error('请检查文件名的工号是否正确');
     			}		
     			else{
     				file.url = response.url;
     			}
     			for(let i = 0; i < fileList.length; i++){
                         if(typeof(fileList[i].response) != 'undefined'){
     				if(fileList[i].response.name != '图片地址'){
     					fileList.splice(i,1);
     				}
                    }
                    }
     			this.fileList = fileList;
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
     		handlePictureCardPreview(file) {
     			this.dialogImageUrl = file.url;
     			this.dialogVisible = true;
     		},
     		downSelected(){
     			var list='';
     			for(let i=0;i<this.fileList.length;i++){
     				list+=this.fileList[i].name.split('.')[0];
     				if(i<this.fileList.length-1){
     					list+='&';
     				}
     			};
     			this.$http.get('http://100.100.20.215:8888/workCard/getPicturesRar/' + list).then(response => {
     				window.location.href = response.data.url;
     			});
     		},
     	},
 		data() {
 			return {
 				fileLoading: false,
 				showInfo: true,
 				fileList:[],
 				dialogVisible: false,
 				dialogImageUrl: '',
 			}
 		},
          mounted() {
               this.$notify({
                    title: '提示',
                    message: '下载单个图片可点击略缩图放大后右键另存为',
                    duration: 10000
               });
          }
 	}
</script>
<style>
	.is-ready{
		display: none;
	}
</style>
