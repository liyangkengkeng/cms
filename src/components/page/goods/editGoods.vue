<template>
  	<div>
  		<el-steps :active="step" align-center class='marginB20'>
  			<el-step v-for='(val,index) in step_arr' :key='val.name' :title="'步骤'+(index+1)" @click.native='switch_step(index)' :description="val.name" :class='editGoods ? "cp" : ""'></el-step>
		</el-steps>
		<basis ref='basis' v-show='step==arr.indexOf("基础信息")' :editGoods='editGoods' :goods_details='goods_details'></basis>
		<classify ref='classify' v-show='step==arr.indexOf("商品类型")' :editGoods='editGoods'  :goods_details='goods_details' :skuNo='sku'></classify>
		<sell ref='sell' v-show='step==arr.indexOf("销售信息")' :editGoods='editGoods'  :goods_details='goods_details' :skuNo='sku'></sell>
		<parameter ref='parameter' v-show='step==arr.indexOf("商品参数")' :editGoods='editGoods'  :goods_details='goods_details' :skuNo='sku'></parameter>
		<spot ref='spot' v-show='step==arr.indexOf("数据点位")' :editGoods='editGoods'  :sku='sku' :goods_details='goods_details'></spot>
		<file ref='file' v-show='step==arr.indexOf("文档")' :editGoods='editGoods'  :sku='sku' :goods_details='goods_details'></file>
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
				step_arr:[
					{name:'基础信息'},{name:'商品类型'},{name:'销售信息'},{name:'商品参数'},{name:'数据点位'},{name:'文档'},
				],
				arr:[],
				id:'',//商品id
				goods_details:{},
				editGoods:true,
				sku:'',
			}
		},
		created(){
			// 获取编辑权限
			this.step_arr=[]
			var arr=localStorage.getItem('role_arr').split(',') || []
			var step_arr=[{name:'基础信息',value:'shopGoodsEditInfo'},{name:'商品类型',value:'shopGoodsSellInfo'},{name:'销售信息',value:'shopGoodsParamInfo'},{name:'商品参数',value:'shopGoodsDataInfo'},{name:'数据点位',value:'shopGoodsDocInfo'},{name:'文档',value:'shopGoodsTypeInfo'}]
			for(let i=0;i<arr.length;i++){
				for(let j=0;j<step_arr.length;j++){
					if(step_arr[j].value===arr[i]){
						this.step_arr.push({name:step_arr[j].name})
						this.arr.push(step_arr[j].name)
					}
				}
			}
			// 获取商品数据
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
	    			self.sku=res.data.goods.skuNo
	    		}
			})
    	},
		methods: {
			switch_step(val){
				this.step=val
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
	.cp{
		cursor: pointer;
	}
</style>
