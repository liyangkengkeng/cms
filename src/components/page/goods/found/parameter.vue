<template>
  	<div>
  		<div class="background basis-header colorF flex al-ce jc-sb">
  			<p>商品参数</p>
  			<p class="flex">
  				<template v-if='editGoods'>
					<el-button class='parameter-step' @click='sub'>保存</el-button>
				</template>
				<template v-else>
					<el-button class='marginR40 parameter-step' @click='upper'>上一步</el-button>
					<el-button class='parameter-step' @click='addStep'>下一步</el-button>
				</template>
  			</p>
  		</div>
		<el-row type="flex" class="row-bg" justify="space-between">
			<el-col :span="10" >
				<el-input class='marginT20' v-model="name" placeholder="请输入参数名" :disabled='see'></el-input>
				<el-input class='marginT20' v-model="val" placeholder="请输入参数值" :disabled='see'></el-input>
				<el-button class='marginT20' type="primary" @click="add()"  :disabled='see'>添加</el-button>

			</el-col>
			<el-col :span="12"  class='marginTB20'>
				<el-table :data="selArr" border style="width: 100%" class='parameter-list'>
					<el-table-column label="" width='35' style='overflow:hidden'>
						<template slot-scope="scope">
							<el-radio v-model="radio" @change='change' :label='scope.$index' :disabled='see'></el-radio>
						</template>
					</el-table-column>
				    <el-table-column type="index" label="#"></el-table-column>
				    <el-table-column prop="key" label="参数名"></el-table-column>
				    <el-table-column prop="val" label="参数值"> </el-table-column>
				    <el-table-column label="操作">
				    	<template slot-scope="scope">
					    	<el-tooltip class="item" effect="dark" content="删除" placement="right">
						      <el-button type="danger" icon="el-icon-delete" @click="del($event,scope.$index, scope.row)" :disabled='see'></el-button>
						    </el-tooltip>
					    </template>
				    </el-table-column>
				</el-table>
			</el-col>
		</el-row>
		<!-- <div class="flex marginTB20">
			<template v-if='editGoods'>
				<el-button type="primary" class='parameter-step height40' @click='sub'>保存</el-button>
			</template>
			<template v-else>
				<el-button type="info" class='marginR40 parameter-step height40' @click='upper'>上一步</el-button>
				<el-button type="primary" class='parameter-step height40' @click='addStep'>下一步</el-button>
			</template>
			
		</div> -->
  	</div>
</template>

<script>
	export default {
		props:{
			see:{default:false},
			editGoods:{default:false},
			skuNo:{default:''},
			goods_details:{goods_details:{
				type: Object,
				default() {
				    return {}
				}
			},},
		},
	    data(){
			return {
				name:'',
				val:'',
				selArr:[],
				radio:'',
				edit_data:0,
			}
		},
		created(){
    	},
		methods: {
			add(){//添加
				if(this.edit_data){
					var obj={}
					obj.key=this.name
					obj.val=this.val
					this.selArr.splice(this.radio,1,obj)
					this.name=''
					this.val=''
					this.edit_data=0
					this.radio=-1
				}else{
					if(this.name && this.val && (this.selArr.length<21)){
						var flag=true
						for(let i=0;i<this.selArr.length;i++){
							if(this.selArr[i].key == this.name){
								flag=false
								this.$notify({
						          title: '警告',
						          message: '参数名不能重复',
						          type: 'warning'
						        });
							}
						}
						if(flag){
							var obj={}
							obj.key=this.name
							obj.val=this.val
							this.selArr.push(obj)
							this.name=''
							this.val=''
							this.radio=-1
						}
					}else{
						if(!this.name){
							this.$message({
					          message: '参数名不能为空',
					          type: 'warning'
					        });
						}else if(!this.val){
							this.$message({
					          message: '参数值不能为空',
					          type: 'warning'
					        });
						}else if(!(this.selArr.length<21)){
							this.$message({
					          message: '参数最多20条',
					          type: 'warning'
					        });
						}
					}
				}
			},
			del(e,index,val){//删除
				var self=this
				this.$confirm('是否确认删除？', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
		            self.selArr.splice(index,1)
		        }).catch(() => {
		          this.$message({
		            type: 'info',
		            message: '已取消操作'
		          });   
		          e.target.blur()       
		        });
				
			},
			change(){
				this.name=this.selArr[this.radio].key
				this.val=this.selArr[this.radio].val
				this.edit_data=1
			},
			upper(){//上一步
				this.$emit('upper',2)
			},
			addStep(){//下一步
				if(this.see){
					this.$emit('addStep',4)
				}else{
					if(this.selArr.length<1){
						this.$notify({
				          title: '警告',
				          message: '商品参数不能为空',
				          type: 'warning'
				        });
					}else{
						this.$emit('addStep',4)
					}
				}
			},
			sub(){//编辑保存
				var self=this
				var obj={} //商品参数
				for(let i=0;i<this.selArr.length;i++){
					obj[this.selArr[i].key]=this.selArr[i].val
				}
				var body={
					body:{
						goodsId:self.goods_details.goodsId,
						skuNo:this.skuNo,
						sku:obj
					}
				}
				this.ajax({
		    		mode:'POST',
		    		url:'cms/goods/update',
		    		data:body,
		    		success(res){
		    			self.$notify({
				          title: '成功',
				          message: '保存成功',
				          type: 'success'
				        });
		    		}
		    	})
			}
		},
		watch: {
			goods_details(val){
				if(this.see || this.editGoods){
					val.sku=JSON.parse(val.sku)
					for(let i in val.sku){
						this.selArr.push({key:i,val:val.sku[i]})
					}
				}
			}
		},
	}
</script>

<style scoped>
	.basis-header{
		padding: 10px 20px
	}
	
	.parameter-list{
		max-height: 531px;
		overflow-y: auto
	}
</style>
