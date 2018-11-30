<template>
  	<div>
  		<div class="background basis-header colorF flex al-ce jc-sb">
  			<p>基础信息</p>
  			<p>
  				<template v-if='editGoods'>
					<el-button class='parameter-step' @click='edit_sub'>保存</el-button>
				</template>
				<template v-else>
					<el-button class='go-on' @click='goOn'>下一步</el-button>
				</template>
  			</p>
  		</div>
  		<el-row class="flex">
		  	<div class="marginR40 left-side">
  				<div class="content-synopsis">
  					<p class="goods-basis-header must">商品简介</p>
  					<textarea name="" placeholder="输入10-100字以内" minlength="10" maxlength="100" v-model='description' :disabled='see'></textarea>
  				</div>
				<div class="img-synopsis">
					<div class="goods-basis-header must">商品简介(第一张必传)</div>
					<div class="flex goods-box">
						<div class="goods-big-img pr marginR40">
							<i class="el-icon-close icon-empty cp" @click='img1=""'></i>
							<p><img :src="img1" alt=""></p>
							<p :class='see ? "hidden" : ""'>
								<input type="file" id='file1' name="upload" @change.prevent.stop='change($event,1)' accept="image/jpg,image/png,image/jpeg,image/bmp,image/gif,image/svg" :disabled='see'>
							</p>
							<p :class='see ? "hidden" : ""'><el-button type="primary">点击上传</el-button></p>
						</div>
						<div class="goods-img pr marginR40">
							<i class="el-icon-close icon-empty cp" @click='img2=""'></i>
							<p><img :src="img2" alt=""></p>
							<p :class='see ? "hidden" : ""'><input type="file" id='file2' name="" @change.prevent.stop='change($event,2)' accept="image/jpg,image/png,image/jpeg,image/bmp,image/gif,image/svg" :disabled='see'></p>
							<p :class='see ? "hidden" : ""'><el-button type="primary" size="mini">点击上传</el-button></p>
						</div>
						<div class="goods-img pr marginR40">
							<i class="el-icon-close icon-empty cp" @click='img3=""'></i>
							<p><img :src="img3" alt=""></p>
							<p :class='see ? "hidden" : ""'><input type="file" id='file3' name="" @change.prevent.stop='change($event,3)' accept="image/jpg,image/png,image/jpeg,image/bmp,image/gif,image/svg" :disabled='see'></p>
							<p :class='see ? "hidden" : ""'><el-button type="primary" size="mini">点击上传</el-button></p>
						</div>
						<div class="goods-img pr marginR40">
							<i class="el-icon-close icon-empty cp" @click='img4=""'></i>
							<p><img :src="img4" alt=""></p>
							<p :class='see ? "hidden" : ""'><input type="file" id='file4' name="" @change.prevent.stop='change($event,4)' accept="image/jpg,image/png,image/jpeg,image/bmp,image/gif,image/svg" :disabled='see'></p>
							<p :class='see ? "hidden" : ""'><el-button type="primary" size="mini">点击上传</el-button></p>
						</div>
						<div class="goods-img pr">
							<i class="el-icon-close icon-empty cp" @click='img5=""'></i>
							<p><img :src="img5" alt=""></p>
							<p :class='see ? "hidden" : ""'><input type="file" id='file5' name="" @change.prevent.stop='change($event,5)' accept="image/jpg,image/png,image/jpeg,image/bmp,image/gif,image/svg" :disabled='see'></p>
							<p :class='see ? "hidden" : ""'><el-button type="primary" size="mini">点击上传</el-button></p>
						</div>
					</div>
				</div>
				<div>
					<div class="goods-basis-header must">
						商品详情(上传图片最大宽度715px)
					</div>
					<div>
						<template v-if='see'>
							<div v-html='details' class="editor"></div>
						</template>
						<template v-else>
							<textarea id="editor" rows="10" cols="80" maxlength="500" v-model='details'></textarea>
						</template>
					</div>
				</div>
  			</div>
	  	    <div class="width100">
	  	    	<div class="marginTB20">
					<p class="stock" style='margin-bottom:10px'>平台关联：</p>
					<el-checkbox v-model="showInDev" @change='changePT' :disabled='see'>开发者中心</el-checkbox>
				</div>
	  			<div>
					<p class="goods-basis-header must">SKU编码：</p>
					<p><el-input v-model="suk" onkeyup="value=value.replace(/[^\w\.\/]/ig,'')" placeholder="请输入SUK编码" maxlength='20' :disabled='see || editGoods'></el-input></p>
				</div>
				<div>
					<p class="goods-basis-header must">商品名称：</p>
					<p><el-input v-model="name" placeholder="请输入2-18个字"  minlength='2' maxlength='18' :disabled='see'></el-input></p>
				</div>
				<div>
					<p class="goods-basis-header must">商品型号：</p>
					<p><el-input v-model="model" placeholder="请输入1-20个字以内" minlength='1' maxlength='20' :disabled='see'></el-input></p>
				</div>
				<div>
					<div class="goods-basis-header">关联英文的商品：</div>
					<div class="flex al-ce">
						<el-input class='marginR20' v-model="relation_suk" placeholder="请输入SKU编码" minlength='1' maxlength='20' :disabled='see'></el-input>
						<el-button type="primary" @click='add' :disabled='see'>添加</el-button>
					</div>
				<div class="marginTB20 flex jc-sb al-ce" v-show='relation_goods'>
					<div class="flex">
						<p class="relation-img marginR20"><img :src="relation_img" alt=""></p>
						<p class="relation-goods-data flex jc-sb fd-co"><span class="size12">{{relation_name}}</span><span class="size12">商品价格：${{relation_price}}</span></p>
					</div>
					<div>
						<el-button type="primary" @click='del' :disabled='see'>删除</el-button>
					</div>
				</div>
				</div>
				
				
				<!-- <div>
					<template v-if='editGoods'>
						<el-button type="primary" class='parameter-step height40' @click='edit_sub'>保存</el-button>
					</template>
					<template v-else>
						<el-button class='go-on height40' type="primary" @click='goOn'>下一步</el-button>
					</template>
				</div> -->
			</div>
		</el-row>
  	</div>
</template>

<script>
	export default {
		props:{
			see:{default:false},
			editGoods:{default:false},
			goods_details:{
				type: Object,
				default() {
				    return {}
				}
			},
		},
	    data(){
			return {
				description:'',//商品简介
				img1:'',
				img2:'',
				img3:'',
				img4:'',
				img5:'',
				details:'',//商品详情
				suk:'',//suk码
				name:'',//商品名称
				model:'',//商品型号
				relation_suk:'',//关联商品
				stock:'',//库存
				relation_goods:false,//关联的商品
				relation_img:'',//搜索商品图片
				relation_name:'',//搜索商品名称
				relation_price:'',//搜索商品价格
				showInDev:false,
				myeditor:{},
				goodsId:''
			}
		},
		created(){
			if(this.$route.query.relation_suk){
				this.relation_suk=this.$route.query.relation_suk
				this.add()
			}
    	},
    	mounted() {
    		if(!this.see){
    			 this.myeditor= CKEDITOR.replace("editor", {
			      	height: "300px", 
			      	width: "100%", 
			      	toolbar: "Full"
			      });
			    var editor = CKEDITOR.instances.editor2;
    		}
	    },
		methods: {
			goOn(){
				if(this.see){
					this.$emit('addStep',1)
				}else{
					this.details=CKEDITOR.instances.editor.getData()
					this.relation_suk = this.relation_goods ? this.relation_suk : ''
					if(this.suk && this.name.length>1 && this.description.length>9 && this.img1 && this.description && this.details && this.model){
						this.$emit('addStep_suk',this.suk)
					}else if(this.description.length<10){
						this.$notify({
				          title: '警告',
				          message: '商品简介长度不能小于10个字节',
				          type: 'warning'
				        });
					}else if(!this.img1){
						this.$notify({
				          title: '警告',
				          message: '商品简介第一张图片必传',
				          type: 'warning'
				        });
					}else if(!this.details){
						this.$notify({
				          title: '警告',
				          message: '商品详情不能为空',
				          type: 'warning'
				        });
					}else if(!this.suk){
						this.$notify({
				          title: '警告',
				          message: '商品SKU编码不能为空',
				          type: 'warning'
				        });
					}
					else if(this.name.length<2){
						this.$notify({
				          title: '警告',
				          message: '商品名称长度不能小于2个字节',
				          type: 'warning'
				        });
					}else if(!this.model){
						this.$notify({
				          title: '警告',
				          message: '商品型号不能为空',
				          type: 'warning'
				        });
					}
				}
			},
			add(){//搜索关联商品
				var self=this
				this.ajax({
					mode:'get',
					url:'cms/goods/infoBySkuNo/'+self.relation_suk,
					data:{},
					success(res){
						if(res.data.body){
							self.relation_img=res.data.body.image1
							self.relation_name=res.data.body.goodsName
							self.relation_price=res.data.body.price
							self.goodsId=res.data.body.goodsId
							self.relation_goods=true
						}else{
							self.$notify({
					          title: '警告',
					          message: '未查询到商品',
					          type: 'warning'
					        });
					        self.relation_suk=''
						}
					}
				})
			},
			del(){//删除关联商品
				this.relation_suk=''
				this.relation_img=''
				this.relation_name=''
				this.relation_price=''
				this.relation_goods=false
				this.showInDev=false
			},
			change(e,index){
				const loading = this.$loading({
		          lock: true,
		          text: 'Loading',
		          spinner: 'el-icon-loading',
		          background: 'rgba(0, 0, 0, 0.7)'
		        });
				var self=this
			     let file = e.target.files[0]
			     let param = new FormData()  // 创建form对象
			     param.append('upload', file)  // 通过append向form对象添加数据
			     self.axios.post(ALLURL+'cms/file/uploadImage',param)
			     .then(rs=>{
			     	loading.close();
			     	if(rs.data.error){
			     		self.$notify({
				          title: '警告',
				          message:rs.data.error,
				          type: 'warning'
				        });
				    }else{
				    	self['img'+index]=rs.data.url
				    }
			        
			     }).catch(err=>{
			     	loading.close();
			        self.$notify({
			          title: '警告',
			          message: err.msg,
			          type: 'warning'
			        });
			     })
			},
			edit_sub(){//编辑保存
				var self=this
				if(this.name.length<2){
					this.$notify({
			          title: '警告',
			          message: '商品名称长度不能小于2个字节',
			          type: 'warning'
			        });
			        return false
				}
				if(this.description.length<10){
					this.$notify({
			          title: '警告',
			          message: '商品简介长度不能小于10个字节',
			          type: 'warning'
			        });
			        return false
				}
				this.details=CKEDITOR.instances.editor.getData()
				if(!this.relation_goods){
					this.showInDev=0
				}
				if(this.suk && this.name && this.img1 && this.description && this.details && this.model){
					var body={
						body:{
							goodsId:self.goods_details.goodsId,
							description:self.description,//商品简介
							image1:self.img1,
							image2:self.img2,
							image3:self.img3,
							image4:self.img4,//商品图片
							image5:self.img5,
							details:self.details,//商品详情
							skuNo:self.suk,//suk码
							goodsName:self.name,//商品名称
							model:self.model,//商品型号
							bindSkuNo:self.relation_suk,//关联商品
							showInDev:self.showInDev
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
					        if(self.relation_suk && self.showInDev){
					        	var obj={
						    			body:{
						    				bindSkuNo:self.suk,
						    				skuNo:self.relation_suk,
						    				goodsId:self.goodsId
						    			}
						    		}
						    		console.log(obj)
					    		self.ajax({//被关联的商品关联此商品
						    		mode:'POST',
						    		url:'cms/goods/update',
						    		data:obj,
						    		success(resres){
						    		}
						    	})
					    	}
			    		}
			    	})
				}else if(this.description.length<10){
					this.$notify({
			          title: '警告',
			          message: '商品简介长度不能小于10个字节',
			          type: 'warning'
			        });
				}else if(!this.img1){
					this.$notify({
			          title: '警告',
			          message: '商品简介第一张图片必传',
			          type: 'warning'
			        });
				}else if(!this.details){
					this.$notify({
			          title: '警告',
			          message: '商品详情不能为空',
			          type: 'warning'
			        });
				}else if(!this.suk){
					this.$notify({
			          title: '警告',
			          message: '商品SKU编码不能为空',
			          type: 'warning'
			        });
				}
				else if(this.name.length<2){
					this.$notify({
			          title: '警告',
			          message: '商品名称长度不能小于2个字节',
			          type: 'warning'
			        });
				}else if(!this.model){
					this.$notify({
			          title: '警告',
			          message: '商品型号不能为空',
			          type: 'warning'
			        });
				}
			},
			uplaodImage(){
				// CKEDITOR.instances["editor"].on('instanceReady', function(e) {
				//     this.on("change", function(e) {
				//     });
				// });
			},
			changePT(e){
				if(e){
					if(this.editGoods){
						if(!this.relation_goods){
							this.$message({
					          showClose: true,
					          message: '关联开发者中心必须有对应语言的商品',
					          type: 'warning'
					        });
					        this.showInDev=false
						}
					}else{
						this.$message({
				          showClose: true,
				          message: '关联开发者中心必须有对应语言的商品',
				          type: 'warning'
				        });
					}
				}
			}
		},
		watch: {
			goods_details(val){
				var self=this
				if(this.see || this.editGoods){
					this.showInDev=val.showInDev ? true : false
					this.description=val.description//商品简介
					this.img1=val.image1
					this.img2=val.image2
					this.img3=val.image3
					this.img4=val.image4
					this.img5=val.image5
					// this.details= val.details//商品详情
					this.suk=val.skuNo//suk码
					this.name=val.goodsName//商品名称
					this.model=val.model//商品型号
					this.relation_suk=val.bindSkuNo//关联商品
					this.stock=val.storage//库
					if(this.see)
						self.details= val.details//商品详情
					else{
						setTimeout(function(){
							self.myeditor.setData(val.details)
							self.details= val.details//商品详情
						},500)
					}
					if(this.relation_suk){
						this.add()
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
	.content-synopsis textarea{
		width: 100%;height: 200px;
		resize:none;
		padding:10px;box-sizing: border-box;
	}
	.goods-big-img{
		width: 200px;height: 200px;border:1px solid #d9d9d9;
	}
	.goods-big-img img{
		width:200px;height: 200px;
	}
	.goods-big-img input,.goods-big-img button{
		width: 100px;
		height: 40px;
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		bottom: 10px;
	}
	.goods-big-img input{
		z-index: 10;opacity: 0
	}
	.left-side{
		min-width: 800px;
		/*flex-shrink: 0*/
	}

	.goods-img{
		width: 100px;height: 100px;border:1px solid #d9d9d9;
	}
	.goods-img img{
		width: 100px; height:100px;
	}
	.goods-img input,.goods-img button{
		width: 70px;
		height: 20px;
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		bottom: 10px;
		padding: 0px;
	}
	.goods-img input{
		z-index: 10;opacity: 0
	}
	.goods-box{
		align-items: flex-end;
	}
	.goods-basis-header{
		margin:20px 0px;
	}

	
	.relation-img{
		width: 40px;height: 40px;border:1px solid #d9d9d9;
	}
	.relation-img img{
		width: 100%;height: 100%;
	}
	.stock{
		flex-shrink: 0
	}

	.icon-empty{
		width: 20px;height: 20px;
		position: absolute;
		top: 5px;right: 0px;
		color: #303030;
		z-index: 100
	}
	.editor{
		max-width: 715px;
	}
	
</style>
