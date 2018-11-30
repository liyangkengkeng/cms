<template>
  	<div>
  		<div class="background basis-header colorF flex al-ce jc-sb">
  			<P>销售信息</P>
  			<P class='flex'>
  				<template v-if='editGoods'>
					<el-button  class='parameter-step' @click='sub'>保存</el-button>
				</template>
				<template v-else>
					<el-button class='marginR40 step-btn' @click='upper'>上一步</el-button>
		  			<el-button class='step-btn' @click='addStep'>下一步</el-button>
				</template>
  			</P>
  		</div>
		<el-row type="flex" class="row-bg" justify="space-between">
		  <el-col :span="8">
		  	<div>
		  		<div>
		  			<div class="marginTB20 must">上架时间选择</div>
		  			<div class="flex jc-sb">
					  	<el-date-picker :disabled='see' v-model="upper_shelf_time" type="datetime" placeholder="选择日期时间" class='width100'> </el-date-picker>
		  			</div>
		  		</div>
		  		<div>
		  			<div class="marginTB20">下架时间选择(未选择则默认不下架)</div>
		  			<div class="flex jc-sb">
					  	<el-date-picker :disabled='see' v-model="lower_shelf_time" type="datetime" placeholder="选择日期时间" class='width100'> </el-date-picker>
		  			</div>
		  			
		  		</div>
		  		<div class="marginTB20">
		  			<div class="marginTB20 must">库存</div>
		  			
  					<p class="flex al-ce width100 marginB10">
  						<el-input :disabled='stock_limit' v-model="stock" placeholder="请填写库存数量" class='width100 marginR20' @keyup.native="key_up" @blur='key_up'></el-input>
  					</p>
  					<p class="pr marginR40"><el-checkbox v-model="stock_limit" :disabled='see'>无库存限制</el-checkbox></p>
  				</div>
		  	</div>
		  </el-col>
		  <el-col :span="14">
		  	<div>
		  		<div class="marginTB20">
		  			商品推荐
		  		</div>
		  		<div class="flex al-ce">
		  			<el-select v-model="hot" placeholder="选择推荐" class='marginR20' :disabled='see'>
				    	<el-option value='0' label='无'></el-option>
				    	<el-option value='1' label='置顶'></el-option>
				  	</el-select>
				  	<!-- <p class="size12">选择推荐后，商品显示推荐ICON 且，热门推荐不排名；推荐商品优先排列，且显示在官网首页；打折促销显示icon</p> -->
		  		</div>
		  	</div>
		  	<div class="marginTB20">
		  		<div>
		  			<div class="marginTB20 must">
		  				国内定价
		  			</div>
		  			<div class="flex jc-sb">
	  					<div class="pr width100 marginR40 flex al-ce">
	  						<el-input-number class='width100' v-model="home_cost" :min='0.1' :precision="1" :step="0.1" :controls='false' placeholder="国内原价" :disabled='see'></el-input-number>
	  						<p class="price">元<span>（原价）</span></p>
	  					</div>
	  					<div class="pr width100 flex al-ce">
	  						<el-input-number class='width100' v-model="home_price" :min='0.1' :precision="1" :step="0.1" :controls='false' placeholder="国内售价" :disabled='see'></el-input-number>
	  						<p class="price">元<span>（售价）</span></p>
	  					</div>
		  			</div>
		  		</div>
		  	</div>
		  	<div class="marginTB20">
		  		<div>
		  			<div class="marginTB20">
		  				
		  			</div>
		  			<div class="flex jc-sb al-ce">
	  					<p class="pr marginR40"><el-checkbox v-model="mall" :disabled='see'>商城外购买</el-checkbox></p>
	  					<p class="flex al-ce width100">
	  						<el-input :disabled='!mall || see' v-model="goods_url" placeholder="输入商品购买地址" class='width100 marginR20'></el-input>
	  						<el-button type="primary" :disabled='!mall' class='step-btn' @click='links'>测试</el-button>
	  					</p>
		  			</div>
		  		</div>
		  	</div>
		  	<!-- <div class="flex jc-sb step-btn-box">
		  		<template v-if='editGoods'>
					<el-button type="primary" class='parameter-step height40' @click='sub'>保存</el-button>
				</template>
				<template v-else>
					<el-button type="info" class='width100 marginR40 height40 step-btn' @click='upper'>上一步</el-button>
		  			<el-button type="primary" class='width100 step-btn height40' @click='addStep'>下一步</el-button>
				</template>
		  	</div> -->
		  </el-col>
		</el-row>
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
				upper_shelf_time:'',//上架时间
				lower_shelf_time:'',//下架时间
				recommend:'',//推荐
				home_cost:'',//国内原价
				home_price:'',//国内售价 
				// abroad_cost:'',//国外原价
				// abroad_price:'',//国外售价
				mall:'',
				goods_url:'http://',
				stock:null,//库存
				stock_limit:null,//是否限制库存
				hot:'0',//商品推荐
			}
		},
		created(){
    	},
		methods: {
			upper(){
				this.$emit('upper',1)
			},
			addStep(){
				if(this.see){
					this.$emit('addStep',3)
				}else{
					this.stock = this.stock_limit ? '' : this.stock
					var reg=/^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])+$/;
					if(this.mall){
						if(!reg.test(this.goods_url)){
							this.$notify({
					          title: '警告',
					          message: '地址格式不正确',
					          type: 'warning'
					        });
					        return false
						}	
					}
					var time1 = this.upper_shelf_time ? (new Date(this.upper_shelf_time)).valueOf() : 0
					var time3 = new Date().valueOf() 
					if(this.lower_shelf_time){
						var time2 = (new Date(this.lower_shelf_time)).valueOf() 
						if(time2<time1 || time2==time1){
							this.$notify({
					          title: '警告',
					          message: '下架时间小于上架时间，请重新选择',
					          type: 'warning'
					        });
					        return false
						}
					}
					if(time1<time3){
						this.$notify({
				          title: '警告',
				          message: '上架时间不能小于当前时间，请重新选择',
				          type: 'warning'
				        });
				        return false
					}

					if(this.home_cost<this.home_price){
						this.$notify({
				          title: '警告',
				          message: '原价不能低于售价，请重新输入',
				          type: 'warning'
				        });
				        return false
					}
					
					if( this.stock!=null && this.home_cost && this.home_price){
						this.$emit('addStep',3)
					}else{
						this.$notify({
				          title: '警告',
				          message: '请填写库存',
				          type: 'warning'
				        });
					}
				}
				
			},
			links(){
				window.open(this.goods_url)
			},
			sub(){//编辑保存
				var self=this
				var reg=/^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])+$/;
				if(self.mall){
					if(!reg.test(self.goods_url)){
						this.$notify({
				          title: '警告',
				          message: '地址格式不正确',
				          type: 'warning'
				        });
				        return false
					}	
				}
				var time1 = this.upper_shelf_time ? (new Date(this.upper_shelf_time)).valueOf() : 0
				var time3 = new Date().valueOf() 
				if(this.lower_shelf_time){
					var time2 = (new Date(this.lower_shelf_time)).valueOf()
					if(time2<time1){
						this.$notify({
				          title: '警告',
				          message: '下架时间小于上架时间，请重新选择',
				          type: 'warning'
				        });
				        return false
					}
				}
				if(time1<time3){
					this.$notify({
			          title: '警告',
			          message: '上架时间不能小于当前时间，请重新选择',
			          type: 'warning'
			        });
			        return false
				}
				if(!(this.home_price<this.home_cost)){
					this.$notify({
			          title: '警告',
			          message: '原价不能低于售价，请重新输入',
			          type: 'warning'
			        });
			        e.target.focus()
			        return false
				}
				if(this.home_cost.toString().indexOf('.')>-1){
					var arr=this.home_cost.toString().split('.')
					arr[1]=arr[1].substring(0,1)
					this.home_cost=Number(arr.join('.'))
				}
				var body={
					body:{
						goodsId:self.goods_details.goodsId,
						skuNo:self.skuNo,
						putawayDt:self.upper_shelf_time.valueOf(),//上架时间
						soldOutDt:self.lower_shelf_time.valueOf(),//下架时间
						hot:self.recommend,//推荐
						price:self.home_cost,//国内原价
						sellPrice:self.home_price,//国内售价
						targetUrl:self.goods_url,//商品跳转链接
						storage:self.stock
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
			},
			
			key_up(){
				this.stock=this.stock.replace(/[^\.\d]/g,'');
            	this.stock=this.stock.replace('.','');
			}
			// blur_price(e){
			// 	if(!(this.home_price<this.home_cost)){
			// 		this.$notify({
			//           title: '警告',
			//           message: '原价不能低于售价，请重新输入',
			//           type: 'warning'
			//         });
			//         e.target.focus()
			// 	}
			// }
		},
		watch:{
			goods_details(val){
				if(this.see || this.editGoods){
					this.upper_shelf_time=this.TIME(val.putawayDt) || ''//上架时间
					this.lower_shelf_time=this.TIME(val.soldOutDt) || ''//下架时间
					this.recommend=val.hot//推荐
					this.home_cost=val.price//国内原价
					this.home_price=val.sellPrice//国内售价
					this.goods_url=val.targetUrl//商品跳转链接
					this.stock=val.storage 
					this.stock_limit = val.storage ? false : true
				}
			},
			lower_shelf_time(val){
				if(val && !this.see){
					var time1 = this.upper_shelf_time ? (new Date(this.upper_shelf_time)).valueOf() : 0
					var time2 = this.upper_shelf_time ? (new Date(val)).valueOf() : 0
					if(time2<time1 || time2==time1){
						this.$notify({
				          title: '警告',
				          message: '下架时间小于上架时间，请重新选择',
				          type: 'warning'
				        });
					}
				}
			},
			upper_shelf_time(val){
				if(val && !this.see){
					var time1 = val ? (new Date(val)).valueOf() : 0
					var time2=new Date().valueOf()
					if(time2>time1){
						this.$notify({
				          title: '警告',
				          message: '上架时间不能小于当前时间，请重新选择',
				          type: 'warning'
				        });
					}
				}
			}
		}
	}
</script>

<style scoped>
	.basis-header{
		padding: 10px 20px
	}
	.money{
		position: absolute;
		right: 10px;
		top: 50%;
		transform: translateY(-50%);
	}
	/*.step-btn-box{
		margin-top: 40px;
	}*/
	.price{
		display: block;width: 100px;flex-shrink: 0;margin-left: 5px;
	}
	.price span{
		font-size: 12px;color: #868686
	}
</style>
