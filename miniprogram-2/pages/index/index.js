//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: '',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    level:'',
    exp_get:2180,
    exp_need:2500,
    exp_pass:2000,
    percent:0,
    shell:''
  },

  //点击头像
  bindViewTap: function() {
    wx.navigateTo({
      url: ''
    })
  },

//页面加载时触发。一个页面只会调用一次，可以在 onLoad 的参数中获取打开当前页面路径中的参数。
  onLoad: function (options) {
    // wx.request({
    //   url: 'http://47.102.216.186/wx/show_user_info/',
    //   header: {"Content-Type": "applciation/json"},
    //   method: "GET",
    //   data: {
    //     user_id: app.globalData.classifyid
    //   },
    //   success: function(res){
    //     // console.log(res.data)
    //     var json = JSON.parse(res.data)
    //     // console.log(json[0].fields.level)
    //     app.globalData.level = json[0].fields.level
    //     app.globalData.exp = json[0].fields.exp
    //     app.globalData.scores = json[0].fields.scores
    //     console.log(app.globalData)
    //   },
    // })
    this.setData({
      motto: app.globalData.classifyid,
      level: app.globalData.level,
      shell: app.globalData.scores,
      exp_get: app.globalData.exp
    })
    console.log(this.data.motto)
    console.log(this.data.level)
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    };
    if (this.data.level==1){
      this.setData({exp_need: 10,
      exp_pass: 0,})
    } else if (this.data.level == 2) {
      this.setData({
        exp_need: 30,
        exp_pass: 10,
      })
    } else if (this.data.level == 3) {
      this.setData({
        exp_need: 70,
        exp_pass: 30,
      })
    } else if (this.data.level == 4) {
      this.setData({
        exp_need: 150,
        exp_pass: 70,
      })
    } else if (this.data.level == 5) {
      this.setData({
        exp_need: 310,
        exp_pass: 150,
      })
    }
    this.setData({
      percent: (this.data.exp_get - this.data.exp_pass) / (this.data.exp_need - this.data.exp_pass) * 100
    })
    console.log(this.data.percent)
  },

  //获取用户信息
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  /** 去设置 */
  toSetting() {
    wx.navigateTo({
      url: '/pages/logs/logs',
    })
  },

  /** 关于 */
  toAbout() {
    wx.navigateTo({
      url: '/pages/about/about',
    })
  },
  /** 我的收藏 */
  toCollect() {
    wx.navigateTo({
      url: '/pages/collect/collect',
    })
  },

  /** 我喜欢的卡片 */
  toHistory() {
    wx.navigateTo({
      url: '/pages/history/history',
    })
  },
  toUpload() {
    wx.navigateTo({
      url: '/pages/upload/upload',
    })
  },
})
