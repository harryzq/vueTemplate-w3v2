import utils from '@/utils/common'
import api from '@/utils/api.js'
import request from '@/utils/request'
import Vue from "vue";
const pkg = require('../../package.json')
const pjName =  pkg.name
// import vm from '../main.js'
// 修改title
window.document.title = pjName
let vm =null
const analyticsId = 'UA-136757559-21'
const data={
    configData:{}
}
class GaTool{
    constructor(){
        this.data={}
    }
    // 判断菜单按钮是否打开
    menuOpen(time){
        const keys = Object.keys(time)
        const timeStatus = {}
        for (const item of keys) {
            let timeTmp = time[item]
            timeStatus[item] = new Date().valueOf()>new Date(timeTmp*1000).valueOf()
        }
        // console.log(timeStatus)
        return timeStatus
    }
    sendThis(_this){
        vm = _this
    }
    restUrl(){
        utils.resetUrl()
    }
    removeUrlParams(name){
        utils.removeUrlParams(name)
    }
     /**
     * 
     *
     * @param {*} region 
     * @param {*} config 
     */
    initGA(region,config){
        window.gtag('config', analyticsId, {
            dimension1: region,
            'page_title': pjName,
            'page_path': '/index.html'
        })
    }
    /**
     * 
     * @param {*} event required
     * @param {*} status required
     */
    addGA(event, status){
        var report = {
            'event_label': status
        }
        window.gtag('event', event, report)
    }
    errorGA(err){
        window.gtag('event', 'exception', {
            'description': err || 'ERROR',
            'fatal': false
        })
    }
    /**
     * 
     * @param {*} access_token 
     * @param {*} lang 
     */
    gaConfig(access_token,lang){
        window.dataLayer = window.dataLayer || [];
        window.gtag = function(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', analyticsId);
        this.storeParams(access_token,lang)
        this.removeUrlParams("access_token","lang")
        this.getUserProfile(access_token,lang)
    }
    /**
     * 
     * @param {*} access_token 
     * @param {*} lang 
     */
    // 用户信息存储
	storeParams (access_token,lang) {
		access_token && window.sessionStorage.setItem('AccessToken', access_token)
        lang && window.sessionStorage.setItem('Lang', lang)
    }
    /**
     * 获取uid
     * @param {*} accessToken 
     * @param {*} lang 
     */
    getUserProfile(accessToken,lang){
        vm.$wsLoading.show();
        let tokenSet = accessToken?{access_token: accessToken, lang: lang}:{lang: lang}
        request.get(api.link.profile, tokenSet)
        .then(response=>{
            if(response){
                data.userInfo = response
            }
            // this.initConfig(lang,data.uid)
        },(err)=>{
            console.log(err);
            // vm.$wsTip('NetWork Error',true,false)
        }).finally(()=>{
            this.initConfig(lang,data.uid)
        })
        return this.data
    }
    /**
     * 
     * @param {*} lang 
     * @param {*} uid 
     * 0 networkError
     * 1 unlogin
     * 2 success
     */
    // 活动配置初始化
	initConfig (lang,uid) {
        let result ={}
		request.get(api.link.config, {lang: lang})
		.then((response) => {
			if (response&&typeof response.error != 'undefined') {
				result={
                    status:0
                }
			}else {
                result={
                    status:2,
                    data:response
                }
				window.gtag('set', {
				  'user_id': uid || ''
				});
            }
			this.addGA('initConfig', 'success');
            data.configData = result.data
            this.data = data
            // GA init
            this.initGA(this.data.configData.region)
            if(data.configData.menu){
                data.configData.menu = this.menuOpen(data.configData.menu)
            }
            // console.log(data.configData.menu)
            // 所有config数据在globalConfig里
            Vue.prototype.globalConfig = data
            // 判断数据是否加载完成
            vm.isDataLoad = true
            vm.$wsLoading.hide()
		},(err) => {
            this.errorGA('initConfig', 'fail');
            vm.$wsTip('NetWork Error',true,false)
			// throw new Error(err)
	    })
	}
}
export default new GaTool()