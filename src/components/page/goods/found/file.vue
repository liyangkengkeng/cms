<template>
  	<div>
  		<div class="background basis-header colorF flex al-ce jc-sb">
  			<p>文档</p>
  			<p class="flex">
  				<template v-if='editGoods'>
					<el-button class='parameter-step' @click='edit_sub'>保存</el-button>
				</template>
				<template v-else>
					<el-button class='marginR40 parameter-step' @click='upper'>上一步</el-button>
					<template v-if='see'>
						<router-link to='/goodsList' class='goodsList'>返回列表首页</router-link>	
					</template>
					<template v-else>
						<el-button class='parameter-step' @click='sub'>保存</el-button>
					</template>
				</template>
  			</p>
  		</div>
		<div class="marginTB20 add">
			<el-tooltip class="item" effect="dark" content="添加" placement="top">
		      <el-button class='' @click='add' type="primary" icon="el-icon-circle-plus-outline" :disabled='see'></el-button>
		    </el-tooltip>
		</div>
		<div>
			<div v-if='arr.length<1 && see' class='center color86 marginB20'>
				暂无数据
			</div>
			<div v-for='(val,index) in arr'>
				<div class="flex al-ce marginTB20 header-box">
					<el-button class='marginR20 must' @click='add' type="primary" disabled>{{index+1}}</el-button>
					<el-input class='marginR20' v-model="val.docName" @blur='docName_blur' minlength='2' maxlength='20' placeholder="文档名称输入2-20字以内" :disabled='see'></el-input>
					<el-input class='' v-model="val.description" placeholder="请输入内容" :disabled='see'></el-input>
				</div>
				<div class="flex url-box">
					<el-input class='marginR20' v-model="val.docLink" placeholder="请输入描述" :disabled='see'></el-input>
					<el-tooltip class="item" effect="dark" content="请输入全路径" placement="top">
				      <el-button class='' @click='links(val.docLink)' type="primary" :disabled='see'>测试</el-button>
				    </el-tooltip>
					
					<el-tooltip class="item" effect="dark" content="删除" placement="top">
				      <el-button class='' @click='del(index)' icon="el-icon-remove-outline" type="primary" :disabled='see'></el-button>
				    </el-tooltip>
				</div>
			</div>
		</div>
  	</div>
</template>

<script>
	export default {
		props:{
			see:{default:false},
			editGoods:{default:false},
			sku:{default:''},goods_details:{goods_details:{
				type: Object,
				default() {
				    return {}
				}
			},},
		},
	    data(){
			return {
				arr:[]
			}
		},
		created(){
    	},
		methods: {
			upper(){//上一步
				this.$emit('upper',4)
			},
			add(){//添加文章
				var obj={
					createBy:localStorage.getItem('username'),
					description:'',
					docLink:'http://',
					docName:'',
					skuNo:this.sku
				}
				this.arr.push(obj)
			},
			links(url){//测试
				if(url){
					window.open(url)
				}else{
					this.$message({
			          message: '地址不能为空',
			          type: 'warning'
			        });
				}
			},
			del(index){
				this.arr.splice(index,1)
			},
			sub(){//保存
				var self=this
				var reg=/^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])+$/;
				for(let i=0;i<self.arr.length;i++){
					if(!reg.test(self.arr[i].docLink)){
						this.$notify({
				          title: '警告',
				          message: '地址格式不正确',
				          type: 'warning'
				        });
				        return false
					}
					if(self.arr[i].docName.length<2){
						this.$notify({
					          title: '警告',
					          message: '文档名称输入2-20字以内',
					          type: 'warning'
					    });
					    return false
					}
				}

				self.$emit('sub',self.arr)
			},
			list(id){//搜索
				var self=this
				this.ajax({
					mode:'get',
		    		url:'cms/doclink/list/'+id,
		    		data:{},
		    		success(res){
		    			self.arr=res.data.body
		    		}
				})
			},
			edit_sub(){//编辑保存
				var self=this
				var reg=/^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])+$/;
				for(let i=0;i<self.arr.length;i++){
					if(!reg.test(self.arr[i].docLink)){
						this.$notify({
				          title: '警告',
				          message: '地址格式不正确',
				          type: 'warning'
				        });
				        return false
					}
					if(self.arr[i].docName.length<2){
						this.$notify({
					          title: '警告',
					          message: '文档名称输入2-20字以内',
					          type: 'warning'
					    });
					    return false
					}
				}
				var body={
					body:self.arr
				}
				self.ajax({
		    		mode:'POST',
		    		url:'cms/doclink/saveBatch',
		    		data:body,
		    		success(res){
		    			self.$notify({
				          title: '成功',
				          message: '保存成功',
				          type: 'success'
				        });
		    		}
		    	})
			},
			docName_blur(e){
				if(e.target.value.length<2){
					this.$notify({
				          title: '警告',
				          message: '文档名称输入2-20字以内',
				          type: 'warning'
				    });
				    e.target.focus()
				    return false
				}
				var a=0
				for(let i=0;i<this.arr.length;i++){
					if(this.arr[i].docName==e.target.value){
						a++
					}
				}
				if(a>1){
					this.$notify({
				          title: '警告',
				          message: '文档名称不能重复',
				          type: 'warning'
				    });
				    e.target.focus()
				}
			}
		},
		watch:{
			goods_details(val){
				this.list(val.skuNo)
			}
		}
		
	}
</script>

<style scoped>
	.basis-header{
		padding: 10px 20px
	}

	.add{
		text-align: right;
		margin-right: 64px;
	}
	.header-box{
		padding-right: 130px;
	}
	.url-box{
		padding-left: 70px;
	}
	.goodsList{
		display: inline-block;
		line-height: 32px;
		padding:0px 15px;
		color:#303030;
		background:#fff;
		text-align: center;
		font-size: 14px;
		border-radius: 3px;
	}
	.goodsList:hover{
		color: #11A9A4;
	    border-color: #b8e5e4;
	    background-color: #e7f6f6;
	}
</style>
