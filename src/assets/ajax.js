import axios from 'axios';
import { Loading } from 'element-ui';
import { Notification } from 'element-ui';

var headers;

const validateToken = (obj) => { 
    axios({
        method: 'post',
        url: ALLURL+'v1/oauth2/tokens/',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        data:'&client_id='+localStorage.getItem('client_id')+'&client_secret='+localStorage.getItem('client_secret')+'&refresh_token='+localStorage.getItem('refresh_token')+'&grant_type=refresh_token',
    })
    .then(response => {
        localStorage.token = response.data.data.access_token;
        localStorage.refresh_token=response.data.data.refresh_token;
        localStorage.isCloudAdmin = true;
        localStorage.isSystemAdmin = false;
        var token = localStorage.getItem('token')
        obj.data=JSON.stringify(obj.data)
        
        axios({
            resource:obj.resource,
            method: obj.mode,
            url: ALLURL+obj.url,
            headers: headers,
            data: obj.data,
        })
        .then(response => {
            if(obj.success)
                obj.success(response)
            else
                return;
        })
        .catch(error => {
            if(obj.error){
                obj.error(error)
            }else{
                if(error.response){
                    Notification({
                      title: '警告',
                      message: error.response.data.message,
                      type: 'warning'
                    })
                 }else{
                    Notification({
                      title: '警告',
                      message: error,
                      type: 'warning'
                    })
                 }
            }
        });
    })
    .catch(error=>{
        Notification({
          title: '警告',
          message: error.response.data.message,
          type: 'warning'
        })
    })
};
const ajax=function(obj){
    if(obj==='' || obj===null || obj===undefined){
        return false
    }
  var token = localStorage.getItem('token')
  obj.img=obj.img || false

    var timestamp = (new Date()).valueOf();//时间戳
    var str='0123456789qazwsxedcrfvtgbyhnujmiklopQAZWSXEDCRFVTGBYHNUJMIKLOP'
    var note=''//随机字符串
    for(let i=0;i<8;i++){
      var randomNum = Math.random()*62
      if(note.length<8){
        note+=str[Math.floor(randomNum)]
      }
    }
    obj.data=obj.data||{}
    obj.data.note=note //随机字符串
    obj.data.timestamp=timestamp //时间戳
    obj.data.sign='2a3826a6cd0e2a37c44b13572e672013' //参数签名
    obj.data.body=obj.data.body || {}
    obj.data.body.lang= location.href.indexOf('en')>-1 ? 'en' : 'cn' //语言
    obj.data=JSON.stringify(obj.data)
    if(obj.mode=='get'|| obj.mode=='GET'){
      headers={
              'Authorization': "Bearer " + token
          }
    }else{
      headers={
              'Authorization': "Bearer " + token,
              'Content-Type': 'application/json'
          }
    }


  
    let loadingInstance = Loading.service({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
    });
    axios.defaults.timeout =  5000
    axios({
        method: obj.mode,
        url: ALLURL+obj.url,
        headers: headers,
        data:obj.data,
    })
    .then(response => {
        loadingInstance.close();
        if(response.data.code==2000){
            Notification({
              title: '警告',
              message: response.data.msg,
              type: 'warning'
            })
        }else if(response.data.code==4000){
            Notification({
              title: '警告',
              message: response.data.msg,
              type: 'warning'
            })
        }else if(response.data.code==4001){
          validateToken(obj)
        }
        else{
            if(obj.success){
                obj.success(response)
            } else
                return;
            }
    })
    .catch(error => {
       loadingInstance.close();
       // error=JSON.parse(error)
       console.log(ALLURL+obj.url)
       console.log(error)
       console.log(error.request)
       console.log(error.response)
       console.log(error.config)
        if(error.code==4001){
            validateToken(obj)
            return ;
        }
        if (error.response) {
            Notification({
              title: '警告',
              message: error.response.data.message,
              type: 'warning'
            })
        } else if (error.request) {
            console.log(error.request);
        }else if(error.config){
            Notification({
              title: '警告',
              message: error.config.data.message,
              type: 'warning'
            })
        } else {
            Notification({
              title: '警告',
              message: error.message,
              type: 'warning'
            })
        }
        
    });
}

export default ajax;