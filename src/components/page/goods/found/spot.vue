<template>
  	<div>
  		<div class="background basis-header colorF flex al-ce jc-sb">
  			<p>数据点位</p>
  			<p class="flex">
  				<template v-if='editGoods'>
					<el-button class='parameter-step height40' @click='sub'>保存</el-button>
				</template>
				<template v-else>
					<el-button class='marginR40 parameter-step height40' @click='upper'>上一步</el-button>
					<el-button class='parameter-step height40' @click='addStep'>下一步</el-button>
				</template>
  			</p>
  		</div>
		<div class='marginTB20'>
			<el-button type="primary" slot="reference" @click='show=true'  :disabled='see'>添加</el-button>
		</div>
		<el-table :data="selArr" border style="width: 100%" class='marginTB20'>
		    <el-table-column type="index" label="#"></el-table-column>
		    <el-table-column prop="funName" label="功能点名称"></el-table-column>
		    <el-table-column prop="fieldname" label="标识符"> </el-table-column>
		    <el-table-column prop="transport.name" label="数据传输类型"> </el-table-column>
		    <el-table-column prop="type.name" label="功能点类型"></el-table-column>
		    <el-table-column label="功能点属性">
		    	<template slot-scope="scope">
		    		<div v-if='scope.row.type.val==1'>
		    			无
		    		</div>
		    		<div v-if='scope.row.type.val==2'>
		    			数值范围：{{scope.row.min}}-{{scope.row.max}},间距：{{scope.row.space}}，倍数：{{scope.row.multiple}}，单位：{{scope.row.unit}}
		    		</div>
		    		<div v-if='scope.row.type.val==3'>
		    			{{scope.row.enumerate}}
		    		</div>
		    		<div v-if='scope.row.type.val==4'>
		    			{{scope.row.fault}}
		    		</div>
		    		<div v-if='scope.row.type.val==5 || scope.row.type.val==6'>
		    			最大长度：不超过255个字节
		    		</div>
		    	</template>
		    </el-table-column>
		    <el-table-column prop="description" label="备注"></el-table-column>
		    <el-table-column label="操作">
		    	<template slot-scope="scope">
	    			<el-tooltip class="item" effect="dark" content="编辑" placement="left">
				      <el-button type="primary" icon="el-icon-edit" @click="edit(scope.$index, scope.row)" :disabled='see'></el-button>
				    </el-tooltip>
				    <el-tooltip class="item" effect="dark" content="删除" placement="right">
				      <el-button type="danger" icon="el-icon-delete" @click="del(scope.$index, scope.row)" :disabled='see'></el-button>
				    </el-tooltip>
			    </template>
		    </el-table-column>
		</el-table>

		<!-- 弹框 -->
		<el-dialog :title="editGoods  ? '编辑自定义功能' : '新增自定义功能'" :visible.sync="show" class='center' @click.stop='dialong'>
			<div class="spot_content">
				<div class="flex al-ce">
					  <p class='width150 must'>功能点名称：</p>
					  <el-input placeholder="请输入名称" v-model="form.funName" maxlength='20'> </el-input>
				  </div>
				  <div class="flex al-ce marginTB20">
					  <p class='width150 must'>标识名：</p>
					  <el-input placeholder="请输入名称" v-model="form.fieldname" maxlength='20'> </el-input>
				  </div>
				  <div class="flex marginTB20">
					  <p class='width150 must classify'>数值类型：</p>
					  <p class="flex fw-wrap">
					  	  <el-radio class='marginB10' v-for='(val,index) in data_type' v-model="form.type" :label="val" :key='val.name'>{{val.name}}</el-radio>
	  					  <el-tooltip class="item" effect="dark" popper-class='tips' content="布尔型：非真即假的二值型变量，如开关功能； 数值型：可线性调节数值型的功能，如温度调节20-40℃； 枚举值：自定义的有限集合值，如档位的高、中、低； 故障型：专门用于上报和统计故障的功能点，支持多故障，数据只上报； 字符串型：以字符串形式传输的功能点； 透传型：以二进制形式透传的功能点。" placement="right">
						      <i class="el-icon-question tips-content"></i>
						   </el-tooltip>
					  </p>
					  
				  </div>
				  <div v-show='form.type.val==2'>
					  	<div class="flex al-ce marginTB20">
						  <p class='width150 must'>数值范围：</p>
						  <el-input placeholder="请输入整数" class='data-range' v-model="form.min" maxlength='20' onkeypress="if(!this.value.match(/^[\+\-]?\d*?\.?\d*?$/))this.value=this.t_value;else this.t_value=this.value;if(this.value.match(/^(?:[\+\-]?\d+(?:\.\d+)?)?$/))this.o_value=this.value" onkeyup="if(!this.value.match(/^[\+\-]?\d*?\.?\d*?$/))this.value=this.t_value;else this.t_value=this.value;if(this.value.match(/^(?:[\+\-]?\d+(?:\.\d+)?)?$/))this.o_value=this.value" onblur="if(!this.value.match(/^(?:[\+\-]?\d+(?:\.\d+)?|\.\d*?)?$/))this.value=this.o_value;else{if(this.value.match(/^\.\d+$/))this.value=0+this.value;if(this.value.match(/^\.$/))this.value=0;this.o_value=this.value}"> </el-input>
						  <span>&emsp;&emsp;-&emsp;&emsp;</span>
						  <el-input placeholder="请输入数字" class='data-range' v-model="form.max" @blur='max_blur' maxlength='20' onkeypress="if(!this.value.match(/^[\+\-]?\d*?\.?\d*?$/))this.value=this.t_value;else this.t_value=this.value;if(this.value.match(/^(?:[\+\-]?\d+(?:\.\d+)?)?$/))this.o_value=this.value" onkeyup="if(!this.value.match(/^[\+\-]?\d*?\.?\d*?$/))this.value=this.t_value;else this.t_value=this.value;if(this.value.match(/^(?:[\+\-]?\d+(?:\.\d+)?)?$/))this.o_value=this.value" onblur="if(!this.value.match(/^(?:[\+\-]?\d+(?:\.\d+)?|\.\d*?)?$/))this.value=this.o_value;else{if(this.value.match(/^\.\d+$/))this.value=0+this.value;if(this.value.match(/^\.$/))this.value=0;this.o_value=this.value}"> </el-input>
					    </div>
					    <div class="flex al-ce marginTB20">
							<p class='width150 must'>间距：</p>
							<el-input placeholder="请输入数字" type='number' v-model="form.space" maxlength='20' onKeyPress="if((event.keyCode<48 || event.keyCode>57) && event.keyCode!=46 || /\.\d$/.test(value))event.returnValue=false" onkeyup="if((event.keyCode<48 || event.keyCode>57) && event.keyCode!=46 || /\.\d$/.test(value))event.returnValue=false" onblur="if((event.keyCode<48 || event.keyCode>57) && event.keyCode!=46 || /\.\d$/.test(value))event.returnValue=false"> </el-input>
						</div>
						<div class="flex al-ce marginTB20">
							<p class='width150 must'>倍数：</p>
							<el-input placeholder="请输入数字" type='number' v-model="form.multiple" maxlength='20' onKeyPress="if((event.keyCode<48 || event.keyCode>57) && event.keyCode!=46 || /\.\d$/.test(value))event.returnValue=false" onkeyup="if((event.keyCode<48 || event.keyCode>57) && event.keyCode!=46 || /\.\d$/.test(value))event.returnValue=false" onblur="if((event.keyCode<48 || event.keyCode>57) && event.keyCode!=46 || /\.\d$/.test(value))event.returnValue=false"></el-input>
							<el-tooltip class="item" effect="dark" popper-class='tips' content="数据将以10的指数转换进行传输，适用于小数" placement="right">
						       <i class="el-icon-question tips-content"></i>
						    </el-tooltip>
						</div>
						<div class="flex al-ce marginTB20">
							<p class='width150'>单位：</p>
							<el-input placeholder="" v-model="form.unit" maxlength='20'> </el-input>
						</div>
				  </div>
				  <div v-show='form.type.val==3' class="marginTB20 flex al-ce">
				  		<p class='width150 must'>枚举值：</p>
					  	<el-input placeholder="请输入" v-model="form.enumerate" maxlength='20'> </el-input>
				  </div>
				  <div v-show='form.type.val==4' class="marginTB20 flex">
				  		<p class='width150 must fault_data'>故障值：</p>
				  		<div>
				  			<el-input placeholder="请输入" v-model="form.fault" maxlength='30'> </el-input>
					  		<p class="fault">故障值，是按照对应的字节位来标识的，依次为bit0-bitx，多个字节位代表多个故障可同时发生，最多支持30位。</p>
				  		</div>	  	
				  </div>
				  <div v-show='form.type.val==5 || form.type.val==6' class="marginTB20 flex al-ce">
				  		<p class='width150 must'>最大长度：</p>
					  	<span>不超过255个字节</span>
				  </div>
				  <div  class="flex al-ce marginTB20">
				  		<p class='width150 must'>数据传输类型：</p>
					  	<el-radio v-for='(val,index) in transport' v-model="form.transport" :label="val" :key='val.name'>{{val.name}}</el-radio>
	  					<el-tooltip class="item" effect="dark" popper-class='tips' content="可下发可上报：指令数据可以下发给设备，设备数据可以上报给云端；只上报：数据只支持从设备上报； 只下发：数据只支持从云端下发；" placement="right">
					      <i class="el-icon-question tips-content"></i>
					   </el-tooltip>
				  </div>
				  <div class="flex al-ce">
					  <p class='width150'>备注：</p>
					  <el-input placeholder="请输入..." type="textarea" resize='none' :rows='4' v-model="form.description" maxlength='50'> </el-input>
				  </div>
			</div>
		  
			<div slot="footer" class="dialog-footer">
			    <el-button @click="show=false">取 消</el-button>
			    <el-button type="primary" @click="add">确 定</el-button>
			</div>
		</el-dialog>
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
				selArr:[
					// {fieldname:'',unit:'',min:'',max:'',description:'',edit:false},
				],
				show:false,
				form:{fieldname:'',funName:'',type:{val:'',name:''},description:'',transport:{val:'',name:''},min:'',max:'',space:'',multiple:'',unit:'',enumerate:'',fault:'',skuNo:this.sku},
				edit_data:true,//是在编辑数据
				index:-1,//编辑的数据下表
				data_type:[
					{val:1,name:'布尔型'},{val:2,name:'数值型'},{val:3,name:'枚举型'},{val:4,name:'故障型'},{val:5,name:'字符型'},{val:6,name:'RAW型'},
				],
				transport:[
					{val:'rw',name:'可下发上报'},{val:'ro',name:'只上报'},{val:'wo',name:'只下发'},
				]
			}
		},
		created(){
			this.form.skuNo=this.sku
    	},
		methods: {
			del(index,val){//删除
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
		        });
			},
			edit(index,val){//编辑
				this.edit_data=false
				this.form={...val}
				this.show=true
				this.index=index
			},
			add(){
				if(this.edit_data){
					for(let i=0;i<this.selArr.length;i++){
						if(this.selArr[i].funName==this.form.funName){
							this.$message({
					          message: '功能点名称不得重复',
					          type: 'warning'
					        });
					        return false
						}
					}
				}
				
				if(this.form.fieldname && this.form.funName && this.form.type.val && this.form.transport.val){
					if(this.form.type.val==1){
						this.tj()
					}else if(this.form.type.val==2){
						if(this.form.min && this.form.min && this.form.space && this.form.multiple){
							if(Number(this.form.min)>Number(this.form.max)){
								this.$message({
						           message: '数值范围不合法',
						           type: 'warning'
						        })
							}else{
								this.tj()
							}
						}else{
							this.$message({
					          message: '请输入必填信息',
					          type: 'warning'
					        });
						}
					}else if(this.form.type.val==3){
						if(this.form.enumerate){
							this.tj()
						}else{
							this.$message({
					          message: '请输入必填信息',
					          type: 'warning'
					        });
						}
					}else if(this.form.type.val==4){
						if(this.form.fault){
							this.tj()
						}else{
							this.$message({
					          message: '请输入必填信息',
					          type: 'warning'
					        });
						}
					}else{
						this.tj()
					}
				}else{
					this.$message({
			          message: '请输入必填信息',
			          type: 'warning'
			        });
				}
			},
			tj(){
				if(!this.edit_data){
					this.selArr.splice(this.index,1,this.form)
					this.edit_data=true
				}else{
					this.selArr.push(this.form)
				}
				this.form={fieldname:'',funName:'',type:{val:'',name:''},description:'',transport:{val:'',name:''},min:'',max:'',space:'',multiple:'',unit:'',enumerate:'',fault:'',skuNo:this.sku}
				this.show=false
			},
			upper(){//上一步
				this.$emit('upper',3)
			},
			addStep(){//下一步
				var self=this
				if(this.see){
					self.$emit('addStep',5)
				}else{
					var arr=[]
					for(let i=0;i<this.selArr.length;i++){
						arr[i]={...self.selArr[i]}
						arr[i].min=parseInt(arr[i].min)
						arr[i].max=parseInt(arr[i].max)
						arr[i].type=arr[i].type.val
						arr[i].transport=arr[i].transport.val
					}
					var body={
						body:arr
					}
					
					this.ajax({
						mode:'POST',
			    		url:'cms/deviceParam/saveBatch',
			    		data:body,
			    		success(res){
			    			self.$emit('addStep',5)
			    		}
					})
				}
			},
			sub(){//编辑保存
				var self=this
				var arr=[]
				for(let i=0;i<this.selArr.length;i++){
					arr[i]={...self.selArr[i]}
					arr[i].min=parseInt(arr[i].min)
					arr[i].max=parseInt(arr[i].max)
					arr[i].type=arr[i].type.val
					arr[i].transport=arr[i].transport.val
				}
				var body={
						body:arr
					}
				this.ajax({
					mode:'POST',
		    		url:'cms/deviceParam/saveBatch',
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
			max_blur(e){//最大值
				if(Number(this.form.min)>Number(this.form.max)){
					this.$message({
			           message: '数值范围不合法',
			           type: 'warning'
			        })
			        e.target.focus()
				}
			},
			oninput(val){
				var a = (this.form[val].match(/^\d*(\.?\d{0,2})/g)[0]) || null
				this.$set(this.form,val,a)
				// e = (e.match(/^\d*(\.?\d{0,2})/g)[0]) || null
			}
		},
		watch: {
			goods_details(val){
				if(this.see || this.editGoods){
					var self=this
					this.ajax({
						mode:'get',
			    		url:'cms/deviceParam/list/'+val.skuNo,
			    		data:{},
			    		success(res){
			    			for(let i=0;i<res.data.body.length;i++){
			    				for(let a=0;a<self.data_type.length;a++){
			    					if(self.data_type[a].val==res.data.body[i].type){
			    						res.data.body[i].type=self.data_type[a]
			    						res.data.body[i].skuNo=self.sku
			    					}
			    				}
			    				for(let b=0;b<self.transport.length;b++){
			    					if(self.transport[b].val==res.data.body[i].transport){
			    						res.data.body[i].transport=self.transport[b]
			    					}
			    				}
			    				if(typeof res.data.body[i].transport == 'string'){
			    					res.data.body[i].transport=JSON.parse(res.data.body[i].transport)
			    				}
			    			}
			    			self.selArr=res.data.body
			    		}
					})
				}
			},
			sku(val){
				this.form.skuNo=val
			},
			show(val){
				if(!val){
					this.form={fieldname:'',funName:'',type:{val:'',name:''},description:'',transport:{val:'',name:''},min:'',max:'',space:'',multiple:'',unit:'',enumerate:'',fault:'',skuNo:this.sku}
				}
			}
		},
	}
</script>

<style scoped>
	.basis-header{
		padding: 10px 20px
	}
	
	.width150{
		width: 150px;flex-shrink: 0;text-align: right;
	}
	
	.tips{
		width: 200px !important;
	}
	.tips-content{
		margin-left: 20px;
		height: 17px;
	}
	.data-range{
		width: 150px
	}
	.fault_data{
		line-height: 40px;
	}
	.fault{
		color: #868686;
		font-size: 12px
	}
	.classify{
		margin-top:-5px;
	}
</style>
