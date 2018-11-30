<template>
  	<div>
  		<div class="backgroundFFF marginB20">
  			<el-row class='search flex marginB20'>
	  			<el-input class='goods-name marginR20' v-model="input" placeholder="搜索商品名称"></el-input>
			  	<el-date-picker class='marginR20' v-model="time1" type="daterange" value-format='yyyy-MM-dd' range-separator="至" start-placeholder="创建起始日期" end-placeholder="创建截止日期"></el-date-picker>
			  	<el-date-picker class='marginR20' v-model="time2" type="daterange" value-format='yyyy-MM-dd' range-separator="至" start-placeholder="上架起始日期" end-placeholder="上架截止日期"></el-date-picker>
			  	<el-date-picker class='marginR20' v-model="time3" type="daterange" value-format='yyyy-MM-dd' range-separator="至" start-placeholder="下架起始日期" end-placeholder="下架截止日期"></el-date-picker>
				<!-- <el-button type="primary">查询</el-button> -->
				<el-row class='center senior'><span class='cp' @click='senior_show=!senior_show' v-if='!senior_show'>高级搜索</span></el-row>
	  		</el-row>
	  		
	  		<el-row  class='senior-content' :style='{height:!senior_show ? "0px" : "210px"}'>
	  			<el-row class='marginB10'>
	  				<p class='marginB10 flex'>
	  					<span class="senior-header">分类：</span>
	  					<el-radio v-for="item in classify1" :key="item.label" v-model="prod_final_type" :label="item.value" class='senior-classify'>{{item.label}}</el-radio>
	  				</p>
	  				<p class='marginB10 flex'>
	  					<span class="senior-header">网络传输方式：</span>
	  					<el-radio v-for="item in classify2" :key="item.label" v-model="prod_type" :label="item.value" class='senior-classify'>{{item.label}}</el-radio>
	  				</p>
	  				<p class='marginB10 flex'>
	  					<span class="senior-header">国内移动运营商：</span>
	  					<el-radio v-for="item in classify3" :key="item.label" v-model="prod_port_number" :label="item.value" class='senior-classify'>{{item.label}}</el-radio>
	  				</p>
	  				<p class='marginB10 flex'>
	  					<span class="senior-header">蜂窝网络制式方式：</span>
	  					<!-- <el-checkbox-group v-model="prod_network_protocol">
						    <el-checkbox v-for="item in classify4" :key="item.label" :label="item.label" class='senior-classify' :value='item.value'></el-checkbox>
						</el-checkbox-group> -->
	  					<el-radio v-for="item in classify4" :key="item.label" v-model="prod_network_protocol" :label="item.value" class='senior-classify'>{{item.label}}</el-radio>
	  				</p>
	  				<p class='marginB10 flex'>
	  					<span class="senior-header">近场网络：</span>
	  					<!-- <el-checkbox-group v-model="prod_access">
						    <el-checkbox v-for="item in classify5" :key="item.label" :label="item.label" class='senior-classify' :value='item.value'></el-checkbox>
						</el-checkbox-group> -->
	  					<el-radio v-for="item in classify5" :key="item.label" v-model="prod_access" :label="item.value" class='senior-classify'>{{item.label}}</el-radio>
	  				</p>
	  				<p class='marginB10 flex'>
	  					<span class="senior-header">网络通信协议：</span>
	  					<!-- <el-checkbox-group v-model="prod_app_area">
						    <el-checkbox v-for="item in classify6" :key="item.label" :label="item.label" class='senior-classify' :value='item.value'></el-checkbox>
						</el-checkbox-group> -->
	  					<el-radio v-for="item in classify6" :key="item.label" v-model="prod_app_area" :label="item.value" class='senior-classify'>{{item.label}}</el-radio>
	  				</p>
		  		</el-row>
		  		<el-row class='center cp size14 color86'><span @click='senior_show=!senior_show'>返回</span></el-row>
	  		</el-row>
  		</div>
  		
  		
  		<div class="operation marginB20 flex jc-sb">
  			<div>
  				<el-button plain class='width120px' type="primary" @click='search'>搜索</el-button>
  				<el-button plain class='width120px' type="primary" @click='reset'>重置</el-button>
  			</div>
  			<div>
  				<el-button plain class='width120px' type="primary" @click='links("/addGoods")'>创建</el-button>
  			</div>
  		</div>
  		<el-row class='goodsList marginB20'>
  			<el-table ref="multipleTable" tooltip-effect="dark"  :data="goodsList" stripe style="width: 100%">
  				<!-- <el-table-column type="selection" width="55"></el-table-column> -->
			    <el-table-column type="index" label="#"></el-table-column>
			    <el-table-column prop="goodsName" label="名称"> </el-table-column>
			    <el-table-column prop="model" label="型号"> </el-table-column>
			    <el-table-column prop="createDt" label="创建时间"> </el-table-column>
			    <el-table-column prop="status" label="销售时间" width='200'>
			    	<template slot-scope="scope">
			    		<p class="marginB10"><span class="frame">上架</span>&emsp;{{scope.row.putawayDt}}</p>
			    		<p><span class="frame">下架</span>&emsp;{{scope.row.soldOutDt || "无"}}</p>
			    	</template>
			    </el-table-column>
			    <el-table-column prop="status" label="销售状态">
			    	<template slot-scope="scope">
			    		<span v-if='scope.row.status'>已上架</span>
			    		<span v-else>已下架</span>
			    	</template>
			    </el-table-column>
			    <el-table-column label="销售渠道">
			    	<template slot-scope="scope">
				        <el-button type="primary" disabled>国内</el-button>
				    </template>
			    </el-table-column>
			    <el-table-column label="类型"> 
					<template slot-scope="scope">
						{{scope.row.finalType1 || ''}}
					</template>
			    </el-table-column>
			    <el-table-column prop="sellPrice" label="售价"></el-table-column>
			    <el-table-column prop="storage" label="库存">
			    	<template slot-scope="scope">
			    		{{scope.row.storage || '无限制'}}
			    	</template>
			    </el-table-column>
			    <el-table-column label="操作">
			      <template slot-scope="scope">
			      	<el-row>
			      		<el-button type="text" size="small" @click='links("/editGoods",scope.row.goodsId)' :disabled='edit_power'>编辑</el-button>
			        	<el-button type="text" size="small" @click='delGoods(scope.$index, scope.row)'>删除</el-button>
			      	</el-row>
			      	<el-row>
			      		<el-button type="text" size="small" @click='links("/goodsDetails",scope.row.goodsId)'>查看</el-button>
			        	<el-button class='marginL10' type="text" size="small" @click='unCheck(scope.$index, scope.row,scope.row.status)'>
			        		<template v-if='scope.row.status'>下架</template>
			        		<template v-else>上架</template>
			        	</el-button>
			      	</el-row>	
			      </template>
			    </el-table-column>
			</el-table>
  		</el-row>
  		<div class="block goods-page">
		  <el-pagination layout="total, prev, pager, next, jumper" :total='count' @current-change="paging" :page-size="page_size"></el-pagination>
		</div>
  	</div>
</template>

<script>
	export default {
	    data(){
			return {
				input:'',//商品名称
				goods:'',//商品
				goodsClass:'',//商品类
				time1:'',//时间
				time2:'',//时间
				time3:'',//时间
				goodsList:[],
				selectGoods:[],
				senior_show:false,
				page_size:10,//分页，每页显示数量
				count:0,
				prod_final_type:null,//成品分类
				prod_type:null,//网络传输方式
				prod_port_number:null,//国内移动运营商
				prod_network_protocol:null,//蜂窝网络制式方式
				prod_access:null,//近场网络
				prod_app_area:null,//网络通信协议
				classify1:[
					{value:'',label:'全部'},{value:'行业产品',label:'行业产品'},{value:'DTU产品',label:'DTU产品'},{value:'SU产品',label:'SU产品'},{value:'RTU-远程终端单元RTU',label:'RTU-远程终端单元RTU'},{value:'模组',label:'模组'},{value:'外壳',label:'外壳'},{value:'线束',label:'线束'}
				],
				classify2:[
					{value:'',label:'全部'},
					{value:'4G',label:'4G'},
					{value:'NB',label:"NB"},
					{value:'eMTC',label:"eMTC"}
				],
				classify3:[
					{value:'',label:'全部'},{value:'wt',label:'全网通'},{value:'dx',label:'电信'},{value:'lt',label:'联通'},{value:'yd',label:'移动'}
				],
				classify4:[
					{value:'',label:'全部'},{value:'TD-LTE',label:'TD-LTE'},{value:'WCDMA',label:'WCDMA'},{value:'TD-SCDMA',label:'TD-SCDMA'},{value:'GSM',label:'GSM'},{value:'GPRS',label:'GPRS'},{value:'EDGE',label:'EDGE'}
				],
				classify5:[
					{value:'',label:'全部'},{value:'蓝牙',label:'蓝牙'},{value:'LORA',label:'LORA'},{value:'RFID',label:'RFID'}
				],
				classify6:[
					{value:'',label:'全部'},{value:'MQTT',label:'MQTT'},{value:'HTTP',label:'HTTP'}
				],
				edit_power:false//是否可编辑
			}
		},
		created(){
			var self=this
			if(this.$route.query.relation_suk){
				this.$alert('您创建的商品已在开发者中心关联，必须有关联的对应语言商品！', '创建关联商品', {
		          confirmButtonText: '确定',
		          callback: action => {
		          	if(self.$route.path.indexOf('en')>-1){
		          		self.$router.push({path:'/goodsList_en',query:{relation_suk:self.$route.query.relation_suk}})
		          	}else{
		          		self.$router.push({path:'/goodsList',query:{relation_suk:self.$route.query.relation_suk}})
		          	} 
		          }
		        });
			}

			var arr=localStorage.getItem('role_arr') ? localStorage.getItem('role_arr').split(',') : []
			this.edit_power = arr.length>0 ? false : true
			this.obtainList()
    	},
		methods: {
		    delGoods(index,val){//删除商品
		    	var self=this
		    	this.$confirm('此操作将删除该商品, 是否继续?', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
		          self.ajax({
			    		mode:'post',
			    		url:'cms/goods/deleteBatch',
			    		data:{
			    			body:{ids:[val.goodsId]}
			    		},
			    		success(res){
			    			self.$message({
					            type: 'success',
					            message: '删除成功!'
					        });
					        self.goodsList.splice(index,1)
			    		}
			    	})
		        }).catch(() => {
		          this.$message({
		            type: 'info',
		            message: '已取消删除'
		          });          
		        });
		    },
		    paging(val){//翻页
		    	this.obtainList(val)
		    },
		    links(val,id){//查看
		    	this.$router.push({path:val,query:{id:id}});
		    },
		    obtainList(status){//商品列表
		    	status = status || ''
		    	var self=this
		    	this.ajax({
		    		mode:'POST',
		    		url:'cms/goods/list',
		    		data:{
		    			body:{
		    				page:status,
		    				pageSize:self.page_size
		    			}
		    		},
		    		success(res){
		    			for(let i=0;i<res.data.body.rows.length;i++){
		    				res.data.body.rows[i].createDt=self.TIME(res.data.body.rows[i].createDt)
		    				res.data.body.rows[i].putawayDt=res.data.body.rows[i].putawayDt ? self.TIME(res.data.body.rows[i].putawayDt) : ''
		    				res.data.body.rows[i].soldOutDt=res.data.body.rows[i].soldOutDt ? self.TIME(res.data.body.rows[i].soldOutDt) : ''
		    			}
		    			self.goodsList=res.data.body.rows
		    			self.count=res.data.body.count
		    		}
		    	})
		    },
		    reset(){//重置搜索条件
		    	this.prod_final_type=null//成品分类
				this.prod_type=null//网络传输方式
				this.prod_port_number=null//国内移动运营商
				this.prod_network_protocol=null//蜂窝网络制式方式
				this.prod_access=null//近场网络
				this.prod_app_area=null//网络通信协议
				this.input=''
				this.time1=''//时间
				this.time2=''//时间
				this.time3=''//时间
				this.obtainList()
		    },
		    unCheck(index,val,boo){//下架
		    	var self=this
		    	var url= boo ? 'cms/goods/unCheck' : 'cms/goods/check'
		    	var data = !boo ? '您要上架该商品, 是否继续?' : '您要下架该商品, 是否继续?'
		    	this.$confirm(data, '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
		            self.ajax({
			    		mode:'post',
			    		url:url,
			    		data:{
			    			body:{ids:[val.goodsId]}
			    		},
			    		success(res){
			    			self.$notify({
					          title: '成功',
					          message: !boo ? '上架成功' : '下架成功',
					          type: 'success'
					        });
					        self.obtainList()
			    		}
			    	})
		        }).catch(() => {
		          this.$message({
		            type: 'info',
		            message: '已取消操作'
		          });          
		        });
		    	
		    	
		    },
		    search(){//搜索
		    	var self=this
		    	this.ajax({
		    		mode:'post',
		    		url:'cms/goods/list',
		    		data:{
		    			body:{
		    				keyWord:self.input || null,//查询关键字
			    			finalType1:self.prod_final_type || null,//商品分类
			    			network:self.prod_type || null,//网络传输方式
							mobileOperator:self.prod_port_number || null, //国内移动运营商
							cellularNetwork:self.prod_network_protocol || null,//蜂窝网络制式方式
							nearField:self.prod_access || null,//近场网络
							networkProtocol:self.prod_app_area || null,//网络通信协议

			    			// status:'',//状态
			    			beginDate:self.time1[0],//创建开始时间 时间格式
			    			endDate:self.time1[1],//创建结束时间 时间格式
			    			beginDate2:self.time2[0],//上架开始时间
			    			endDate2:self.time2[1],//上架结束时间
			    			beginDate3:self.time3[0],//下架开始时间
			    			endDate3:self.time3[1],//下架结束时间
			    			pageSize:10
		    			}
		    		},
		    		success(res){
		    			for(let i=0;i<res.data.body.rows.length;i++){
		    				res.data.body.rows[i].createDt=self.TIME(res.data.body.rows[i].createDt)
		    				res.data.body.rows[i].putawayDt=res.data.body.rows[i].putawayDt ? self.TIME(res.data.body.rows[i].putawayDt) : ''
		    				res.data.body.rows[i].soldOutDt=res.data.body.rows[i].soldOutDt ? self.TIME(res.data.body.rows[i].soldOutDt) : ''
		    			}
		    			self.goodsList=res.data.body.rows
		    			self.count=res.data.body.count
		    		}
		    	})
		    }
		},
		watch: {},
	}
</script>

<style scoped>
	.goods-name{
		width: 150px
	}
	.goods-page{
		text-align: right;
	}
	.senior{
		font-size: 12px;color: #868686;margin: 10px 0px;
	}
	.senior-content{
		overflow: hidden;transition: .5s
	}
	.width120px{
		width: 120px;
	}
	.frame{
		display: inline-block;
		padding: 0px 5px;
		border:1px solid #11A9A4;
		color: #11A9A4
	}
	.goods_type{
		transform: rotate(180deg);
	}
	.senior-header{
		display: inline-block;
		width: 130px;
		font-size: 14px;
		text-align: right;
		margin-right: 20px;
	}
	.senior-classify{
		min-width:80px;
	}
	.backgroundFFF{
		background:#fff;padding:20px;
	}
	
</style>
