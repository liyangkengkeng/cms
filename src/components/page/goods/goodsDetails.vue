<template>
  	<div>
  		<el-steps :active="step" align-center class='marginB20'>
  			<el-step v-for='(val,index) in step_arr' :key='val.name' :title="'步骤'+(index+1)" :description="val.name" class='cp' @click.native='step_link(index)'></el-step>
		</el-steps>
		<basis ref='basis' v-show='step==0' @addStep='addStep' :see='see' :goods_details='goods_details'></basis>
		<classify ref='classify' v-show='step==1' @addStep='addStep' @upper='upper' :see='see' :goods_details='goods_details'></classify>
		<sell ref='sell' v-show='step==2' @addStep='addStep' @upper='upper' :see='see' :goods_details='goods_details'></sell>
		<parameter ref='parameter' v-show='step==3' @addStep='addStep' @upper='upper' :see='see' :goods_details='goods_details'></parameter>
		<spot ref='spot' v-show='step==4' @addStep='addStep' @upper='upper' :sku='sku' :see='see' :goods_details='goods_details'></spot>
		<file ref='file' v-show='step==5' @upper='upper' :sku='sku' :see='see' :goods_details='goods_details'></file>
  	</div>
</template>

<script>
import Basis from './found/basis'
import Classify from './found/classify'
import parameter from './found/parameter'
import sell from './found/sell'
import spot from './found/spot'
import file from './found/file'
	export default {
	    data(){
			return {
				step:0,
				sku:'',
				step_arr:[
					{name:'基础信息'},{name:'商品类型'},{name:'销售信息'},{name:'商品参数'},{name:'数据点位'},{name:'文档'},
				],
				see:true,
				id:'',//商品id
				goods_details:{}
			}
		},
		created(){
			if(this.$route.query.id){
				this.id=this.$route.query.id
				localStorage.setItem('goodsID',this.$route.query.id)
			}else{
				this.id=localStorage.getItem('goodsID')
			}
			var self=this
			this.ajax({
				mode:'get',
	    		url:'cms/goods/info/'+self.id,
	    		data:{},
	    		success(res){
	    			self.goods_details=res.data.goods
	    		}
			})
    	},
		methods: {
			step_link(index){
				this.step=index
			},
			addStep(val){
				this.step=val
			},
			upper(val){
				this.step=val
			},
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
