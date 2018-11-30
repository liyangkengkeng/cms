<template>
  	<div>
  		<div class="background basis-header colorF flex al-ce jc-sb">
  			<p>商品类型</p>
  			<P>
  				<template v-if='editGoods'>
					<el-button class='parameter-step ' @click='edit_sub'>保存</el-button>
				</template>
				<template v-else>
					<el-button class='marginR40 parameter-step' @click='upper'>上一步</el-button>
					<el-button class='parameter-step ' @click='addStep'>下一步</el-button>
				</template>
  			</P>
  		</div>
  		<div class="marginTB20 flex jc-sb classfiy">
  			<div>
  				<p class="goods-basis-header marginTB20 bold must">选择分类</p>
				<el-select v-model="classA" placeholder="选择一级分类" :disabled='see' @change='change'>
				    <el-option v-for='val in final_type' :value='val.lab' :key='val.lab' :label='val.lab'></el-option>
				</el-select>
				<el-select v-model="classB" placeholder="选择二级分类" :disabled='see'>
				    <el-option v-for='val in sub' :value='val' :label='val' :key='val'></el-option>
				</el-select>
  			</div>
			
			<!-- <div class="">
				<template v-if='editGoods'>
					<el-button type="primary" class='parameter-step height40' @click='edit_sub'>保存</el-button>
				</template>
				<template v-else>
					<el-button type="info" class='marginR40 parameter-step height40' @click='upper'>上一步</el-button>
					<el-button type="primary" class='parameter-step height40' @click='addStep'>下一步</el-button>
				</template>
			</div> -->
		</div>
  		<el-row type="flex" class="row-bg" justify="space-between">
  			<el-col :span="12"  v-if='classA=="DTU产品" || classA=="行业产品" || classA=="RTU-远程终端单元RTU" || classA=="模组"'>
  				<div>
  					<div class="background basis-header colorF bold">
			  			网络制式（成品和模组）
			  		</div>
					<div>
						<p class="goods-basis-header marginTB20 bold">网络传输方式（单）<el-button :disabled='see' @click='prod_network_protocol=""'>取消选则</el-button></p>
						<el-radio v-model="prod_network_protocol" label="4G"  :disabled='see'>4G</el-radio>
	  					<el-radio v-model="prod_network_protocol" label="NB"  :disabled='see'>NB</el-radio>
	  					<el-radio v-model="prod_network_protocol" label="eMTC"  :disabled='see'>eMTC</el-radio>
					</div>
					<div>
						<p class="goods-basis-header marginTB20 bold">国内移动运营商（单）<el-button :disabled='see' @click='operator=""'>取消选则</el-button></p>
						<el-radio v-model="operator" label="wt"  :disabled='see'>全网通</el-radio>
	  					<el-radio v-model="operator" label="dx"  :disabled='see'>电信</el-radio>
	  					<el-radio v-model="operator" label="lt"  :disabled='see'>联通</el-radio>
	  					<el-radio v-model="operator" label="yd"  :disabled='see'>移动</el-radio>
					</div>
					<div>
						<p class="goods-basis-header marginTB20 bold must">蜂窝网络制式方式（多选）</p>
						<el-checkbox-group v-model="honeycomb"  :disabled='see'>
						    <el-checkbox label="TD-LTE" value='TD-LTE'></el-checkbox>
						    <el-checkbox label="WCDMA" value='WCDMA'></el-checkbox>
						    <el-checkbox label="TD-SCDMA" value='TD-SCDMA'></el-checkbox>
						    <el-checkbox label="GSM" value='GSM'></el-checkbox>
						    <el-checkbox label="GPRS" value='GPRS'></el-checkbox>
						    <el-checkbox label="EDGE" value='EDGE'></el-checkbox>
						</el-checkbox-group>
					</div>
					<div>
						<p class="goods-basis-header marginTB20 bold">近场网络（多选）</p>
						<el-checkbox-group v-model="network"  :disabled='see'>
						    <el-checkbox label="蓝牙"></el-checkbox>
						    <el-checkbox label="LORA"></el-checkbox>
						    <el-checkbox label="RFID"></el-checkbox>
						</el-checkbox-group>
					</div>
					<div>
						<p class="goods-basis-header marginTB20 bold must">网络通信协议（多选）</p>
						<el-checkbox-group v-model="communication"  :disabled='see'>
						    <el-checkbox label="MQTT"></el-checkbox>
						    <el-checkbox label="HTTP"></el-checkbox>
						</el-checkbox-group>
					</div>
  				</div>
  			</el-col>
  			<el-col :span="11">
  				<div v-if='classA=="DTU产品"'>
					<p class="goods-basis-header marginTB20">
						<span class="marginR40">DTU类</span>
						<el-tooltip class="item marginR20" effect="dark" content="添加" placement="top">
					      <el-button class='' type="primary" icon="el-icon-circle-plus-outline" @click='add' :disabled='see'></el-button>
					    </el-tooltip>
					</p>
					<p v-for='(val,index) in interface' class="flex marginTB20" :key='index'>
						<span class="must"></span>
						<el-input :v-model='val.input' :placeholder="'接口'+(index+1)" class='marginR20 joggle' disabled></el-input>
						<el-select v-model="val.value" placeholder="请选择" class='marginR20 joggle_check'  :disabled='see'>
							<el-option label='串口' value='串口'></el-option>
							<el-option label='射频' value='射频'></el-option>
							<el-option label='CASI' value='CASI'></el-option>
						</el-select>
						<el-tooltip class="item" effect="dark" content="删除" placement="top">
					      <el-button type="danger" icon="el-icon-delete" :disabled='see' @click='del(index)'></el-button>
					    </el-tooltip>
					</p>
				</div>
				<div v-if='classA=="SU产品" || classA=="模组"'>
					<div class="marginTB20 bold">
			  			SU标签属性
			  		</div>
			  		<div>
						<p class="goods-basis-header marginTB20 size14">行业标签</p>
						<el-checkbox-group v-model="trade" :disabled='see'>
						    <el-checkbox label="智慧工业" class='trade'></el-checkbox>
						    <el-checkbox label="智慧农业" class='trade'></el-checkbox>
						    <el-checkbox label="智慧物流" class='trade'></el-checkbox>
						    <el-checkbox label="智慧交通" class='trade'></el-checkbox>
						    <el-checkbox label="智慧电网" class='trade'></el-checkbox>
						    <el-checkbox label="智慧环保" class='trade'></el-checkbox>
						    <el-checkbox label="智慧安防" class='trade'></el-checkbox>
						    <el-checkbox label="智慧医疗" class='trade'></el-checkbox>
						    <el-checkbox label="智慧家居" class='trade'></el-checkbox>
						</el-checkbox-group>
					</div>
					<div class="marginB20 marginT10 bold">
			  			SU功能原理
			  		</div>
			  		<div>
						<p class="goods-basis-header marginTB20 size14">空气类</p>
						<el-checkbox-group v-model="air" :disabled='see'>
						    <el-checkbox label="PM2.5"></el-checkbox>
						    <el-checkbox label="有害气体"></el-checkbox>
						</el-checkbox-group>
					</div>
					<div>
						<p class="goods-basis-header marginTB20 size14">运动类</p>
						<el-checkbox-group v-model="motion" :disabled='see'>
						    <el-checkbox label="陀螺仪"></el-checkbox>
						    <el-checkbox label="GNSS定位"></el-checkbox>
						</el-checkbox-group>
					</div>
					<div>
						<p class="goods-basis-header marginTB20 size14">农业类</p>
						<el-checkbox-group v-model="agriculture" :disabled='see'>
						    <el-checkbox label="土壤温湿度"></el-checkbox>
						</el-checkbox-group>
					</div>
					<div>
						<p class="goods-basis-header marginTB20 size14">工业类</p>
						<el-checkbox-group v-model="industry" :disabled='see'>
						    <el-checkbox label="液压"></el-checkbox>
						    <el-checkbox label="气压"></el-checkbox>
						</el-checkbox-group>
					</div>
					<div>
						<p class="goods-basis-header marginTB20 size14">其他类</p>
						<el-checkbox-group v-model="other" :disabled='see'>
						    <el-checkbox label="地磁"></el-checkbox>
						</el-checkbox-group>
					</div>
				</div>
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
			goods_details:{
				type: Object,
				default() {
				    return {}
				}
			},
		},
	    data(){
			return {
				final_type:[
					{
						lab:'行业产品'
					},
					{
						lab:'DTU产品',sub:["数据透传","管理型","可编程型"]
					},
					{
						lab:'SU产品',sub:["SU-CASI","SU-原生接口"]
					},
					{
						lab:'RTU-远程终端单元RTU'
					},
					{
						lab:'模组'
					},
					{
						lab:'外壳'
					},
					{
						lab:'线束'
					},
				],
				sub:[],
				classA:'',//一级分类
				classB:'',//二级分类
				prod_network_protocol:'',//网络传输方式
				operator:'',//国内移动运营商
				honeycomb:[],//蜂窝网络制式方式
				network:[],//近场网络
				communication:[],//网络通信协议
				trade:[],//行业标签

				air:[],//空气类
				motion:[],//运动类
				agriculture:[],//农业类
				industry:[],//工业类
				other:[],//其他类
				interface:[],//接口
			}
		},
		created(){
    	},
    	mounted() {
	    },
		methods: {
			upper(){//上一步
				this.$emit('upper',0)
			},
			addStep(){//下一步
				if(this.see){
					this.$emit('addStep',2)
				}else{
					if(this.classA){
						if(this.classA=="DTU产品"){
							for(let i=0;i<this.interface.length;i++){
								if(!this.interface[i].value){
									this.$notify({
							          title: '警告',
							          message: '接口不能类型为空',
							          type: 'warning'
							        });
							        return false
								}
							}
						}
						if(this.classA=="DTU产品" || this.classA=="行业产品" || this.classA=="RTU-远程终端单元RTU" || this.classA=="模组"){
							if(this.classA &&this.honeycomb.length>0 && this.communication.length>0){
								this.$emit('addStep',2)
							}else if(!this.classA){
								this.$notify({
						          title: '警告',
						          message: '请选择分类',
						          type: 'warning'
						        });
							}else if(this.honeycomb.length<1){
								this.$notify({
						          title: '警告',
						          message: '请选择蜂窝网络制式方式',
						          type: 'warning'
						        });
							}else if(this.communication.length<1){
								this.$notify({
						          title: '警告',
						          message: '请选择网络通信协议',
						          type: 'warning'
						        });
							}
							
						}else{
							this.$emit('addStep',2)
						}
					}else{
						this.$notify({
				          title: '警告',
				          message: '请选择分类',
				          type: 'warning'
				        });
					}
				}	
			},
			change(e){//分类级联选择
				for(let i=0;i<this.final_type.length;i++){
					if(this.final_type[i].lab==e){
						this.sub=this.final_type[i].sub || []
						this.classB=''
					}
				}
			},
			add(){
				this.interface.push({input:'接口'+(this.interface.length+1),value:''})
			},
			del(index){
				this.interface.splice(index,1)
			},
			edit_sub(){//编辑保存
				if(this.classA){
					if(this.classA=="DTU产品"){
						for(let i=0;i<this.interface.length;i++){
							if(!this.interface[i].value){
								this.$notify({
						          title: '警告',
						          message: '接口类型不能为空',
						          type: 'warning'
						        });
						        return false
							}
						}
					}
					if(this.classA=="DTU产品" || this.classA=="行业产品" || this.classA=="RTU-远程终端单元RTU" || this.classA=="模组"){						if(this.classA && this.honeycomb.length>0 && this.communication.length>0){
							// this.$emit('addStep',2)
							var self=this
							var portInfo={}
							for(let j=0;j<this.interface.length;j++){
								portInfo[this.interface[j].input]=this.interface[j].value
							}
							var classify_arr=[
								{
							        lab: "空气类",
							        sub: this.air
							    },
							    {
							        lab: "运动类",
							        sub: this.motion
							    },
							    {
							        lab: "农业类",
							        sub: this.agriculture
							    },
							    {
							        lab: "工业类",
							        sub: this.industry
							    },
							    {
							        lab: "其他类",
							        sub: this.other
							    }
							]
							var body={
								body:{
									goodsId:self.goods_details.goodsId,
									skuNo:self.skuNo,
									finalType1:self.classA,
									finalType2:self.classB,
									network:self.prod_network_protocol,//网络传输方式
									mobileOperator:self.operator, //国内移动运营商
									cellularNetwork:self.honeycomb,//蜂窝网络制式方式
									nearField:self.network,//近场网络
									networkProtocol:self.communication,//网络通信协议
									portInfo:portInfo,//接口
									suFunType1:classify_arr,//SU功能原理
									appArea:self.trade.join(','),//行业分类
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

						}else if(!this.classA){
							this.$notify({
					          title: '警告',
					          message: '请选择分类',
					          type: 'warning'
					        });
						}else if(this.honeycomb.length<1){
							this.$notify({
					          title: '警告',
					          message: '请选择蜂窝网络制式方式',
					          type: 'warning'
					        });
						}else if(this.communication.length<1){
							this.$notify({
					          title: '警告',
					          message: '请选择网络通信协议',
					          type: 'warning'
					        });
						}
						
					}else{
						this.$notify({
				          title: '警告',
				          message: '请选择分类',
				          type: 'warning'
				        });
				    }
				}else{
					this.$notify({
			          title: '警告',
			          message: '请选择分类',
			          type: 'warning'
			        });
				}
			}
		},
		watch: {
			goods_details(val){
				if(this.see || this.editGoods){
					this.interface=[]
					val.portInfo=JSON.parse(val.portInfo)
					for(let key in val.portInfo){
						this.interface.push({input:key,value:val.portInfo[key]})
					}
					this.classA=val.finalType1//一级分类
					this.classB=val.finalType2//二级分类
					this.prod_network_protocol=val.network//网络传输方式
					this.operator=val.mobileOperator//国内移动运营商
					this.honeycomb=val.cellularNetwork?JSON.parse(val.cellularNetwork):[]//蜂窝网络制式方式
					this.network=val.nearField?JSON.parse(val.nearField):[]//进场网络

					this.communication=val.networkProtocol?JSON.parse(val.networkProtocol):[]//网络通信协议
					this.trade=val.appArea ? val.appArea.split(',') : []//行业标签
					val.suFunType1 = val.suFunType1 ? JSON.parse(val.suFunType1) : []

					for(let i=0;i<val.suFunType1.length;i++){
						if(val.suFunType1[i].lab=='空气类'){
							this.air=val.suFunType1[i].sub
						}
						if(val.suFunType1[i].lab=='运动类'){
							this.motion=val.suFunType1[i].sub
						}
						if(val.suFunType1[i].lab=='农业类'){
							this.agriculture=val.suFunType1[i].sub
						}
						if(val.suFunType1[i].lab=='工业类'){
							this.industry=val.suFunType1[i].sub
						}
						if(val.suFunType1[i].lab=='其他类'){
							this.other=val.suFunType1[i].sub
						}
					}
					
				}
			}
		},
	}
</script>

<style scoped>
	.classfiy{
		align-items: flex-end;
	}
	.basis-header{
		padding: 10px 20px
	}
	.parameter-step{
		/*width:300px;*/
	}
	.item{
		margin-left: 0px;
	}
	.joggle{
		width: 120px;
	}
	.joggle_check{
		width: 200px;
	}
	.trade{
		margin:0px 20px 10px 0px;
	}
</style>
