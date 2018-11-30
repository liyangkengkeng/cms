<template>
  	<div>
  		<el-steps :active="step" align-center class='marginB20'>
		  <el-step v-for='(val,index) in step_arr' :key='val.name' :title="'步骤'+(index+1)" :description="val.name"></el-step>
		</el-steps>
		<basis ref='basis' v-show='step==0' @addStep_suk='addStep_suk'></basis>
		<classify ref='classify' v-show='step==1' @addStep='addStep' @upper='upper'></classify>
		<sell ref='sell' v-show='step==2' @addStep='addStep' @upper='upper'></sell>
		<parameter ref='parameter' v-show='step==3' @addStep='addStep' @upper='upper'></parameter>
		<spot ref='spot' v-show='step==4' @addStep='addStep' @upper='upper' :sku='sku'></spot>
		<file ref='file' v-show='step==5' @upper='upper' @sub='sub' :sku='sku'></file>
  	</div>
</template>

<script>
import Basis from './basis'
import Classify from './classify'
import parameter from './parameter'
import sell from './sell'
import spot from './spot'
import file from './file'
	export default {
	    data(){
			return {
				step:0,
				sku:'',
				step_arr:[
					{name:'基础信息'},{name:'商品类型'},{name:'销售信息'},{name:'商品参数'},{name:'数据点位'},{name:'文档'},
				]
			}
		},
		created(){
    	},
		methods: {
			addStep_suk(val){
				this.step=1
				this.sku=val
			},
			addStep(val){
				this.step=val
			},
			upper(val){
				this.step=val
			},
			sub(arr){
				var obj={} //商品参数
				for(let i=0;i<this.$refs.parameter.selArr.length;i++){
					obj[this.$refs.parameter.selArr[i].key]=this.$refs.parameter.selArr[i].val
				}
				var portInfo={}
				for(let j=0;j<this.$refs.classify.interface.length;j++){
					portInfo[this.$refs.classify.interface[j].input]=this.$refs.classify.interface[j].value
				}
				var classify_arr=[
					{
				        lab: "空气类",
				        sub: this.$refs.classify.air
				    },
				    {
				        lab: "运动类",
				        sub: this.$refs.classify.motion
				    },
				    {
				        lab: "农业类",
				        sub: this.$refs.classify.agriculture
				    },
				    {
				        lab: "工业类",
				        sub: this.$refs.classify.industry
				    },
				    {
				        lab: "其他类",
				        sub: this.$refs.classify.other
				    }
				]
				var goodsId=this.$refs.basis.goodsId//关联商品id
				var obj={
					//基础信息
					description:this.$refs.basis.description,//商品简介
					image1:this.$refs.basis.img1,
					image2:this.$refs.basis.img2,
					image3:this.$refs.basis.img3,
					image4:this.$refs.basis.img4,//商品图片
					image5:this.$refs.basis.img5,

					details:this.$refs.basis.details,//商品详情
					skuNo:this.$refs.basis.suk,//suk码
					goodsName:this.$refs.basis.name,//商品名称
					model:this.$refs.basis.model,//商品型号
					bindSkuNo:this.$refs.basis.relation_suk,//关联商品
					showInDev:this.$refs.basis.showInDev ? 1 : 0, //是否在开发者中心显示
					

					// 商品类型
					network:this.$refs.classify.prod_network_protocol,//网络传输方式
					mobileOperator:this.$refs.classify.operator, //国内移动运营商
					cellularNetwork:this.$refs.classify.honeycomb,//蜂窝网络制式方式
					nearField:this.$refs.classify.network,//近场网络
					networkProtocol:this.$refs.classify.communication,//网络通信协议
					portInfo:portInfo,//接口
					suFunType1:classify_arr,//SU功能原理
					appArea:this.$refs.classify.trade.join(','),//行业分类
					finalType1:this.$refs.classify.classA,
					finalType2:this.$refs.classify.classB,




					//销售信息
					putawayDt:this.$refs.sell.upper_shelf_time.valueOf(),//上架时间
					soldOutDt:this.$refs.sell.lower_shelf_time.valueOf(),//下架时间
					hot:this.$refs.sell.hot,//推荐
					price:this.$refs.sell.home_cost,//国内原价
					sellPrice:this.$refs.sell.home_price,//国内售价
					targetUrl:this.$refs.sell.goods_url,//商品跳转链接
					storage:this.$refs.sell.stock ? parseFloat(this.$refs.sell.stock) : 0 ,//库存

					//商品参数
					// sku:obj

					//数据点位

					//文档
					
				}


				if(!obj.bindSkuNo){
					obj.showInDev=0
				}

				var self=this
				var body={
					body:obj
				}
				this.$confirm('保存后将返回商品列表页, 是否继续?', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
					self.ajax({
			    		mode:'POST',
			    		url:'cms/doclink/saveBatch',
			    		data:{
			    			body:{arr}
			    		},
			    		success(res){
			    			self.ajax({
					    		mode:'POST',
					    		url:'cms/goods/save',
					    		data:body,
					    		success(ress){
					    			self.$notify({
							          title: '成功',
							          message: '商品创建成功',
							          type: 'success'
							        })
								    if(obj.bindSkuNo && obj.showInDev){
							    		self.ajax({//被关联的商品关联此商品
								    		mode:'POST',
								    		url:'cms/goods/update',
								    		data:{
								    			body:{
								    				bindSkuNo:obj.skuNo,
								    				skuNo:obj.bindSkuNo,
								    				goodsId:goodsId
								    			}
								    		},
								    		success(resres){
								    			console.log(resres)
								    		}
								    	})
							    	}

							    	if(self.$route.path.indexOf('en')>-1)
								        self.$router.push('/goodsList_en');
							        else
								        self.$router.push('/goodsList');
					    		}
					    	})
			    		}
			    	})
		        }).catch(() => {
		          this.$message({
		            type: 'info',
		            message: '已取消'
		          });          
		        });
				
			}
		},
		watch: {
		},
		components:{
			Basis,parameter,sell,spot,file,Classify
		}
	}
</script>

<style scoped>
</style>
