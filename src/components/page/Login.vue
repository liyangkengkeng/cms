<template>
    <div class="login-wrap">
        <div class="ms-title">后台管理系统</div>
        <div class="ms-login">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
                <el-form-item prop="username">
                    <el-input v-model="ruleForm.username" placeholder="username"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="password" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')"></el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        data: function(){
            return {
                ruleForm: {
                    username: '',
                    password: ''
                },
                rules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ]
                },
                role_arr:[],
            }
        },
        created(){
        },
        methods: {
            submitForm(formName) {
                var self=this
                if(self.ruleForm.username && self.ruleForm.password){
                    self.fullscreenLoading = true;
                    self.axios({
                      method: 'post',
                      url: LOGIN+'v1/oauth2/tokens/',
                      data: {
                        grant_type: 'password',
                        username: self.ruleForm.username,
                        password:self.ruleForm.password,
                        client_id:localStorage.getItem('client_id'),
                        client_secret:localStorage.getItem('client_secret')
                      }
                    })
                    .then(function (response) {
                        self.fullscreenLoading = false;
                        localStorage.token = response.data.data.access_token;
                        localStorage.userName = self.ruleForm.username;
                        localStorage.refresh_token=response.data.data.refresh_token;
                        localStorage.userId = response.data.data.user_id;
                        self.$router.push({ path: '/goodsList' })
                        self.role(response.data.data.roles)
                    })
                    .catch(function (error) {
                        self.fullscreenLoading = false;
                        if (error.response) {
                            self.$notify({
                              title: '警告',
                              message: error.response.data.message,
                              type: 'warning'
                            });
                        }
                    });
                }else{
                    if(!self.ruleForm.username){
                        self.$notify({
                          title: '警告',
                          message: '请输入邮箱或者手机号码',
                          type: 'warning'
                        });
                    }
                    if(!self.ruleForm.password){
                        self.$notify({
                          title: '警告',
                          message: '请输入密码',
                          type: 'warning'
                        });
                    }
                }
            },
            role(arr){
                var self=this
                var _arr=['shopGoodsEditInfo','shopGoodsSellInfo','shopGoodsParamInfo','shopGoodsDataInfo','shopGoodsDocInfo','shopGoodsTypeInfo']
                var loca_arr=[]
                for(let i=0;i<arr.length;i++){
                    this.axios.get(LOGIN+'v1/roles/'+arr[i]+'/',{
                        headers:{'Authorization': "Bearer " + localStorage.getItem('token')},
                    })
                    .then(function (response) {
                        // console.log(response.data.data.features)
                        // for(let i=0;i<response.data.data.features.length;i++){
                        //     for(let j=0;j<_arr.length;j++){
                        //         if(response.data.data.features[i].name==_arr[j]){
                        //             self.role_arr.push(_arr[j])
                        //         }
                        //     }
                        // }
                        // loca_arr.concat(self.role_arr)
                        loca_arr=_arr 
                        localStorage.setItem('role_arr',loca_arr.join(','))
                    })
                   .catch(function (error) {
                        if (error.response) {
                            self.$notify({
                              title: '警告',
                              message: error.response.data.message,
                              type: 'warning'
                            });
                        }
                    });
                }
                
            }
        }
    }
</script>

<style scoped>
    .login-wrap{
        position: relative;
        width:100%;
        height:100%;
    }
    .ms-title{
        position: absolute;
        top:50%;
        width:100%;
        margin-top: -230px;
        text-align: center;
        font-size:30px;
        color: #fff;

    }
    .ms-login{
        position: absolute;
        left:50%;
        top:50%;
        width:300px;
        height:160px;
        margin:-150px 0 0 -190px;
        padding:40px;
        border-radius: 5px;
        background: #fff;
    }
    .login-btn{
        text-align: center;
    }
    .login-btn button{
        width:100%;
        height:36px;
    }
</style>